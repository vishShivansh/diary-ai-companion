'use client';

import { Button } from '@/components/ui/button';
import { useEffect, useRef, useState } from 'react';

export default function ChatWindow() {
  const [messages, setMessages] = useState([
    { sender: 'ai', text: 'Hey there! How are you feeling today?' },
  ]);
  const [input, setInput] = useState('');
  const chatEndRef = useRef<HTMLDivElement | null>(null);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = { sender: 'user', text: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');

    const res = await fetch('/api/chat', {
      method: 'POST',
      body: JSON.stringify({ message: input }),
      headers: { 'Content-Type': 'application/json' },
    });

    const data = await res.json();
    setMessages((prev) => [...prev, { sender: 'ai', text: data.reply }]);
  };

  // Scroll to bottom when message updates
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className="max-w-3xl mx-auto h-screen flex flex-col bg-gray-50">
      <div className="flex-1 overflow-y-auto px-4 py-6 bg-white shadow-md rounded-md border">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`flex mb-3 ${
              msg.sender === 'user' ? 'justify-end' : 'justify-start'
            }`}
          >
            <div
              className={`max-w-[70%] px-4 py-2 rounded-2xl shadow-sm text-sm ${
                msg.sender === 'user'
                  ? 'bg-blue-600 text-white rounded-br-none'
                  : 'bg-gray-200 text-gray-800 rounded-bl-none'
              }`}
            >
              {msg.text}
            </div>
          </div>
        ))}
        <div ref={chatEndRef} />
      </div>

      <div className="p-4 bg-white border-t flex items-center gap-3 sticky bottom-0 z-10">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          placeholder="Type your message..."
          className="flex-1 p-3 border rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <Button
          onClick={handleSend}
          className="bg-blue-600 hover:bg-blue-700 text-white rounded-xl px-5 py-2"
        >
          Send
        </Button>
      </div>
    </div>
  );
}



// 'use client';

// import { Button } from '@/components/ui/button';
// import { useState, useEffect, useRef } from 'react';

// export default function ChatWindow() {
//   const [messages, setMessages] = useState([
//     { sender: 'ai', text: 'Hey there! How are you feeling today?', timestamp: new Date() },
//   ]);
//   const [input, setInput] = useState('');
//   const [isTyping, setIsTyping] = useState(false);
//   const chatEndRef = useRef<HTMLDivElement | null>(null);

//   const handleSend = async () => {
//     if (!input.trim()) return;

//     const userMessage = { sender: 'user', text: input, timestamp: new Date() };
//     setMessages((prev) => [...prev, userMessage]);
//     setInput('');
//     setIsTyping(true);

//     const res = await fetch('/api/chat', {
//       method: 'POST',
//       body: JSON.stringify({ message: input }),
//       headers: { 'Content-Type': 'application/json' },
//     });

//     const data = await res.json();
//     const aiMessage = { sender: 'ai', text: data.reply, timestamp: new Date() };

//     setMessages((prev) => [...prev, aiMessage]);
//     setIsTyping(false);
//   };

//   useEffect(() => {
//     chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
//   }, [messages, isTyping]);

//   const formatTime = (date: Date) =>
//     new Date(date).toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' });

//   return (
//     <div className="max-w-3xl mx-auto h-screen flex flex-col bg-gray-50">
//       <div className="flex-1 overflow-y-auto px-4 py-6 bg-white shadow-md rounded-md border">
//         {messages.map((msg, idx) => (
//           <div
//             key={idx}
//             className={`flex mb-4 ${
//               msg.sender === 'user' ? 'justify-end' : 'justify-start'
//             }`}
//           >
//             <div className="flex items-end gap-2">
//               {msg.sender === 'ai' && (
//                 <span className="text-2xl">🤖</span>
//               )}

//               <div
//                 className={`max-w-[70%] px-4 py-2 rounded-2xl shadow-sm text-sm ${
//                   msg.sender === 'user'
//                     ? 'bg-blue-600 text-white rounded-br-none'
//                     : 'bg-gray-200 text-gray-800 rounded-bl-none'
//                 }`}
//               >
//                 <div>{msg.text}</div>
//                 <div className="text-[10px] opacity-70 mt-1 text-right">
//                   {formatTime(msg.timestamp)}
//                 </div>
//               </div>

//               {msg.sender === 'user' && (
//                 <span className="text-2xl">🧑‍💻</span>
//               )}
//             </div>
//           </div>
//         ))}

//         {isTyping && (
//           <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
//             <span className="text-2xl">🤖</span>
//             <span className="italic animate-pulse">AI is typing...</span>
//           </div>
//         )}

//         <div ref={chatEndRef} />
//       </div>

//       <div className="p-4 bg-white border-t flex items-center gap-3 sticky bottom-0 z-10">
//         <input
//           type="text"
//           value={input}
//           onChange={(e) => setInput(e.target.value)}
//           onKeyDown={(e) => e.key === 'Enter' && handleSend()}
//           placeholder="Type your message..."
//           className="flex-1 p-3 border rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
//         />
//         <Button
//           onClick={handleSend}
//           className="bg-blue-600 hover:bg-blue-700 text-white rounded-xl px-5 py-2"
//         >
//           Send
//         </Button>
//       </div>
//     </div>
//   );
// }
