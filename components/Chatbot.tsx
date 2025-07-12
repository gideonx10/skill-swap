'use client';

import React, { useState } from 'react';

interface Message {
  sender: 'user' | 'bot';
  text: string;
}

const Chatbot: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
  if (!input.trim()) return;
  const userMessage: Message = { sender: "user", text: input };
  setMessages((msgs) => [...msgs, userMessage]);
  setInput("");
  setLoading(true);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userMessage.text }),
      });
      const data = await res.json();
      setMessages((msgs) => [
        ...msgs,
        { sender: 'bot', text: data.reply || data.error || 'No response.' },
      ]);
    } catch {
      setMessages((msgs) => [
        ...msgs,
        { sender: 'bot', text: 'Error contacting chatbot.' },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !loading) sendMessage();
  };

  return (
    <div style={{ maxWidth: 400, margin: '0 auto', border: '1px solid #eee', padding: 16, borderRadius: 8 }}>
      <h3>Skill Swap Chatbot</h3>
      <div style={{ minHeight: 200, marginBottom: 12, overflowY: 'auto' }}>
        {messages.map((msg, i) => (
          <div key={i} style={{ textAlign: msg.sender === 'user' ? 'right' : 'left' }}>
            <b>{msg.sender === 'user' ? 'You' : 'Bot'}:</b> {msg.text}
          </div>
        ))}
        {loading && <div><i>Bot is typing…</i></div>}
      </div>
      <input
        type="text"
        value={input}
        onChange={e => setInput(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Type your message…"
        style={{ width: '80%', padding: 8 }}
        disabled={loading}
      />
      <button onClick={sendMessage} disabled={loading || !input.trim()} style={{ marginLeft: 8 }}>
        Send
      </button>
    </div>
  );
};

export default Chatbot;