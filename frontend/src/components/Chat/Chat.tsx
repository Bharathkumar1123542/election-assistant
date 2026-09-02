import React, { useState } from 'react';

interface ChatProps {
  onSendMessage: (message: string) => void;
  messages: { text: string; isUser: boolean }[];
}

const Chat: React.FC<ChatProps> = ({ onSendMessage, messages }) => {
  const [input, setInput] = useState('');

  const handleSend = () => {
    if (input.trim()) {
      onSendMessage(input);
      setInput('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSend();
    }
  };

  return (
    <div role="region" aria-label="Election Assistant Chat" className="flex flex-col h-full">
      <div
        role="log"
        aria-live="polite"
        aria-atomic="false"
        className="flex-1 overflow-y-auto p-4"
        tabIndex={0}
      >
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`mb-2 p-2 rounded ${msg.isUser ? 'bg-blue-100' : 'bg-gray-100'}`}
            aria-label={msg.isUser ? 'Your message' : 'Assistant response'}
          >
            {msg.text}
          </div>
        ))}
      </div>
      <div className="p-4 border-t">
        <label htmlFor="chat-input" className="sr-only">Type your message</label>
        <input
          id="chat-input"
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Ask about elections..."
          className="w-full p-2 border rounded"
          aria-describedby="chat-help"
        />
        <p id="chat-help" className="sr-only">Press Enter to send your message</p>
        <button
          onClick={handleSend}
          className="mt-2 w-full bg-blue-500 text-white p-2 rounded"
          aria-label="Send message"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default Chat;