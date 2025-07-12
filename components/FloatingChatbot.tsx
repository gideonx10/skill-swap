'use client';

import React, { useState, useRef, useEffect } from 'react';

interface Message {
  sender: 'user' | 'bot';
  text: string;
}

const INITIAL_BOT_MESSAGE = `Hi! 👋 I’m SkillBot, your friendly assistant on SkillSwap. I can help you:
- Create or edit your profile
- Understand how to swap skills
- View and manage your requests
- Stay safe while collaborating

Ask me anything to get started! 🚀
`;

const FloatingChatbot: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  // Show initial message when chat is opened for the first time
  useEffect(() => {
    if (open && messages.length === 0) {
      setMessages([{ sender: 'bot', text: INITIAL_BOT_MESSAGE }]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  // Scroll to bottom when new messages arrive
  useEffect(() => {
    if (open && messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, open]);

  const sendMessage = async () => {
    if (!input.trim()) return;
    const userMessage: Message = { sender: 'user', text: input };
    setMessages((msgs) => [...msgs, userMessage]);
    setInput('');
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
    <>
      {/* Floating Button */}
      <button
        aria-label="Open chat"
        className="floating-chatbot-btn"
        onClick={() => setOpen(true)}
        style={{
          position: 'fixed',
          bottom: 24,
          right: 24,
          zIndex: 1000,
          width: 56,
          height: 56,
          borderRadius: '50%',
          background: 'linear-gradient(135deg, #6366f1, #06b6d4)',
          boxShadow: '0 4px 16px rgba(0,0,0,0.15)',
          border: 'none',
          display: open ? 'none' : 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          fontSize: 24,
          cursor: 'pointer'
        }}
      >
        <span aria-hidden>💬</span>
      </button>

      {/* Chat Window */}
      {open && (
        <div
          className="floating-chatbot-window"
          style={{
            position: 'fixed',
            bottom: 24,
            right: 24,
            width: '92vw',
            maxWidth: 370,
            height: '60vh',
            maxHeight: 480,
            background: 'var(--chat-bg, #fff)',
            borderRadius: 18,
            boxShadow: '0 8px 32px rgba(0,0,0,0.25)',
            display: 'flex',
            flexDirection: 'column',
            zIndex: 1001,
            overflow: 'hidden',
            transition: 'all 0.2s',
          }}
        >
          {/* Header */}
          <div
            style={{
              background: 'linear-gradient(135deg, #6366f1, #06b6d4)',
              color: '#fff',
              padding: '12px 16px',
              fontSize: 18,
              fontWeight: 600,
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}
          >
            SkillBot
            <button
              aria-label="Close chat"
              onClick={() => setOpen(false)}
              style={{
                background: 'none',
                border: 'none',
                color: '#fff',
                fontSize: 22,
                cursor: 'pointer'
              }}
            >
              ×
            </button>
          </div>

          {/* Chat Messages */}
          <div
            style={{
              flex: 1,
              padding: 12,
              overflowY: 'auto',
              background: 'var(--chat-bg, #fff)'
            }}
          >
            {messages.map((msg, i) => (
              <div
                key={i}
                style={{
                  textAlign: msg.sender === 'user' ? 'right' : 'left',
                  margin: '8px 0'
                }}
              >
                <span
                  style={{
                    display: 'inline-block',
                    background: msg.sender === 'user'
                      ? 'linear-gradient(135deg, #6366f1, #06b6d4)'
                      : '#f3f4f6',
                    color: msg.sender === 'user' ? '#fff' : '#222',
                    padding: '8px 14px',
                    borderRadius: 16,
                    maxWidth: '80%',
                    wordBreak: 'break-word',
                    fontSize: 15,
                  }}
                >
                  {msg.text}
                </span>
              </div>
            ))}
            {loading && (
              <div style={{ textAlign: 'right', margin: '8px 0' }}>
                <span
                  style={{
                    display: 'inline-block',
                    background: '#f3f4f6',
                    color: '#222',
                    padding: '8px 14px',
                    borderRadius: 16,
                    fontSize: 15
                  }}
                >
                  <i>Bot is typing…</i>
                </span>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div
            style={{
              padding: 10,
              background: '#f1f5f9',
              display: 'flex',
              gap: 6
            }}
          >
            <input
              type="text"
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Type your message…"
              style={{
                flex: 1,
                padding: 9,
                borderRadius: 12,
                border: '1px solid #ddd',
                outline: 'none',
                fontSize: 16,
                color:'black'
              }}
              disabled={loading}
              autoFocus
            />
            <button
              onClick={sendMessage}
              disabled={loading || !input.trim()}
              style={{
                background: 'linear-gradient(135deg, #6366f1, #06b6d4)',
                color: '#fff',
                border: 'none',
                borderRadius: 12,
                padding: '0 18px',
                fontSize: 16,
                fontWeight: 500,
                cursor: loading ? 'not-allowed' : 'pointer',
                transition: 'background 0.2s'
              }}
            >
              Send
            </button>
          </div>
        </div>
      )}

      {/* Mobile Responsive Styles (optional) */}
      <style>{`
        @media (max-width: 640px) {
          .floating-chatbot-window {
            right: 2vw !important;
            bottom: 2vw !important;
            width: 96vw !important;
            max-width: 99vw !important;
            height: 55vh !important;
            max-height: 80vh !important;
            border-radius: 14px !important;
          }
          .floating-chatbot-btn {
            right: 2vw !important;
            bottom: 2vw !important;
          }
        }
        @media (max-width: 400px) {
          .floating-chatbot-window {
            height: 60vh !important;
          }
        }
        html[data-theme='dark'] .floating-chatbot-window,
        body[data-theme='dark'] .floating-chatbot-window {
          --chat-bg: #222;
        }
      `}</style>
    </>
  );
};

export default FloatingChatbot;