// app/components/ChatBox.tsx
"use client";

import { useState, useEffect } from "react";

interface Message {
  role: "user" | "assistant";
  content: string;
}

export default function ChatBox() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  // Greet user when chat box first opens
  useEffect(() => {
    if (messages.length === 0) {
      setMessages([
        {
          role: "assistant",
          content: "👋 Hi there! I'm your book assistant. What kind of book are you looking for today?",
        },
      ]);
    }
  }, [messages.length]);

  const sendMessage = async () => {
    if (!input.trim()) return;

    // const newMessages = [...messages, { role: "user", content: input }];
    // setMessages(newMessages);
    const newMessages = [...messages, { role: "user", content: input } as Message];
    setMessages(newMessages);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: newMessages }),
      });

      const data = await res.json();

      // Format assistant message into bullet points if it's a long paragraph
      const formattedAnswer =
        data.answer.includes(". ")
          ? "• " + data.answer.split(". ").join("\n• ")
          : data.answer;

      // setMessages([...newMessages, { role: "assistant", content: formattedAnswer }]);
      setMessages([...newMessages, { role: "assistant", content: formattedAnswer } as Message]);
    } catch (err) {
      setMessages([
        ...newMessages,
        { role: "assistant", content: "⚠️ Sorry, something went wrong." },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-full">
      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-3 space-y-2">
        {messages.map((m, i) => (
          <div
            key={i}
            className={`p-2 rounded-lg max-w-[75%] whitespace-pre-line ${
              m.role === "user"
                ? "bg-blue-100 ml-auto"
                : "bg-gray-100 mr-auto"
            }`}
          >
            {m.content}
          </div>
        ))}

        {/* Typing Indicator */}
        {loading && (
          <div className="bg-gray-100 mr-auto p-2 rounded-lg max-w-[75%] text-sm text-gray-500 italic">
            typing<span className="animate-pulse">...</span>
          </div>
        )}
      </div>

      {/* Input */}
      <div className="border-t p-2 flex">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask about books..."
          className="flex-1 border rounded-lg px-3 py-2 text-sm focus:outline-none"
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
        />
        <button
          onClick={sendMessage}
          className="ml-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
          disabled={loading}
        >
          {loading ? "..." : "Send"}
        </button>
      </div>
    </div>
  );
}
