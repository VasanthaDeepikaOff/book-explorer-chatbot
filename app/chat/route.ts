
// // src/app/chat/route.ts
// import OpenAI from "openai";

// const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

// export async function POST(req: Request) {
//   try {
//     const { messages } = await req.json();

//     // Add system role at the top (personality/behavior)
//     const systemPrompt = {
//       role: "system",
//       content: `
//     You are a helpful assistant that specializes in books.

//     Rules:
//     - If the user asks about books (authors, genres, summaries, recommendations, facts), answer normally.
//     - If the user says something casual (like "okay", "hi", "thanks", greetings, small talk), respond politely and encourage them to ask a book-related question.
//     - If the user asks about unrelated topics (e.g., math, politics, sports, coding), say:
//       "I can only answer questions about books. Please ask me something related to books."
//     Never break this rule.
//     `,
//     };



//     const res = await openai.chat.completions.create({
//       model: "gpt-3.5-turbo",
//       messages: [systemPrompt, ...messages],
//       max_tokens: 300,
//     });

//     const text = res.choices?.[0]?.message?.content ?? "";

//     return new Response(JSON.stringify({ text }), {
//       status: 200,
//       headers: { "Content-Type": "application/json" },
//     });
//   } catch (error) {
//     console.error("OpenAI error:", error);
//     return new Response(JSON.stringify({ error: "Request failed" }), { status: 500 });
//   }
// }


import { NextResponse } from "next/server";
import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY, // make sure it's set
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const messages = body.messages || [];

    const completion = await client.chat.completions.create({
      model: "gpt-4o-mini", // or gpt-3.5-turbo if you prefer
      messages: [
        {
          role: "system",
          content: `
You are a helpful assistant that only answers questions about books.
- If the user asks about books (authors, genres, summaries, recommendations, facts), answer normally.
- If the user says something casual (like "okay", "hi", "thanks"), respond politely and guide them back to book topics.
- If the user asks about unrelated topics, say:
  "I can only answer questions about books. Please ask me something related to books."
`,
        },
        ...messages,
      ],
    });

    const answer = completion.choices[0].message?.content || "⚠️ No response";

    return NextResponse.json({ answer });
  } catch (error) {
    console.error("Chat API error:", error);
    return NextResponse.json(
      { error: "Something went wrong. Check server logs." },
      { status: 500 }
    );
  }
}
