// // src/app/page.tsx
// "use client";

// import { useState, useRef, useEffect } from "react";
// import axios from "axios";

// type Message = {
//   role: "user" | "assistant";
//   content: string;
// };

// export default function Home() {
//   const [messages, setMessages] = useState<Message[]>([]);
//   const [value, setValue] = useState("");
//   const messagesEndRef = useRef<HTMLDivElement>(null);

//   const handleSubmit = async () => {
//     if (!value.trim()) return;

//     const newMessages = [...messages, { role: "user", content: value }];
//     setMessages(newMessages);
//     setValue("");

//     try {
//       const { data } = await axios.post("/chat", { messages: newMessages });
//       const botMessage = { role: "assistant" as const, content: data.text };
//       setMessages([...newMessages, botMessage]);
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   // Auto-scroll to bottom when new messages come
//   useEffect(() => {
//     messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
//   }, [messages]);

//   return (
//     <div className="flex flex-col h-screen bg-gray-100 max-w-3xl mx-auto shadow-lg">
//       {/* Header */}
//       <header className="bg-purple-600 text-white p-4 text-lg font-semibold shadow">
//         Book Specialist Chatbot
//       </header>

//       {/* Messages area */}
//       <main className="flex-1 overflow-y-auto p-4 space-y-3">
//         {messages.map((msg, i) => (
//           <div
//             key={i}
//             className={`max-w-lg p-3 rounded-2xl shadow text-sm ${
//               msg.role === "user"
//                 ? "ml-auto bg-purple-500 text-white"
//                 : "mr-auto bg-white border"
//             }`}
//           >
//             {msg.content}
//           </div>
//         ))}
//         <div ref={messagesEndRef} />
//       </main>

//       {/* Input area */}
//       <footer className="p-4 border-t bg-white flex gap-2">
//         <input
//           className="flex-1 border rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
//           value={value}
//           onChange={(e) => setValue(e.target.value)}
//           onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
//           placeholder="Type your message..."
//         />
//         <button
//           onClick={handleSubmit}
//           className="bg-purple-500 text-white px-4 py-2 rounded-xl hover:bg-purple-700 transition"
//         >
//           Send
//         </button>
//       </footer>
//     </div>
//   );
// }
import Header from "./components/Header";
import Footer from "./components/Footer";
import BookList from "./components/BookList";
import ChatWidget from "./components/ChatWidget";

export default function HomePage() {
  return (
    <div>
      <Header />
      <BookList />
      <ChatWidget />
      <Footer />
    </div>
  );
}
