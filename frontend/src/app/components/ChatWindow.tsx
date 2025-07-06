'use client';

import { Button } from '@/components/ui/button';
import { useState } from 'react';

export default function ChatWindow() {
  const [messages, setMessages] = useState([
    { sender: 'ai', text: 'Hey there! How are you feeling today?' },
  ]);
  const [input, setInput] = useState('');

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = { sender: 'user', text: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');

    // Send to mock API
    const res = await fetch('/api/chat', {
      method: 'POST',
      body: JSON.stringify({ message: input }),
      headers: { 'Content-Type': 'application/json' },
    });

    const data = await res.json();
    setMessages((prev) => [...prev, { sender: 'ai', text: data.reply }]);
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <div className="h-[60vh] overflow-y-auto border rounded p-4 bg-white shadow-sm">
        {messages.map((msg, idx) => (
          <div key={idx} className={`mb-2 ${msg.sender === 'user' ? 'text-right' : 'text-left'}`}>
            <span
              className={`inline-block px-3 py-2 rounded ${
                msg.sender === 'user' ? 'bg-blue-100' : 'bg-gray-100'
              }`}
            >
              {msg.text}
            </span>
          </div>
        ))}
      </div>

      <div className="mt-4 flex items-center gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="flex-1 p-2 border rounded"
          placeholder="Type your message..."
        />
        <Button onClick={handleSend}>Send</Button>
      </div>
    </div>
  );
}
