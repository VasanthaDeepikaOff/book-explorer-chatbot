// app/components/ChatWidget.tsx

"use client";

import { useState } from "react";
import { MessageCircle, X } from "lucide-react";
import ChatBox from "./ChatBox";

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 bg-blue-600 text-white p-4 rounded-full shadow-lg hover:bg-blue-700 transition"
      >
        {isOpen ? <X size={24} /> : <MessageCircle size={24} />}
      </button>

      {/* Chat Box */}
      {isOpen && (
        <div className="fixed bottom-20 right-6 w-[400px] h-[600px] bg-white border rounded-lg shadow-xl overflow-hidden">
          <ChatBox />
        </div>
      )}
    </>
  );
}
