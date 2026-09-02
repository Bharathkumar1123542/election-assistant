import React from 'react';
import Chat from '../components/Chat/Chat';
import useChat from '../hooks/useChat';

const ChatPage: React.FC = () => {
  const { messages, sendMessage, isLoading } = useChat();

  return (
    <section className="grid gap-4 lg:grid-cols-[1.2fr_0.8fr]">
      <div className="rounded border bg-white p-5 shadow-sm">
        <div className="mb-4 flex items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-semibold">Chat with Election Assistant</h2>
            <p className="text-sm text-slate-600">Ask for registration deadlines, polling locations, vote-by-mail steps, and more.</p>
          </div>
          {isLoading && <span className="rounded-full bg-slate-100 px-3 py-1 text-sm text-slate-700">Waiting for response…</span>}
        </div>
        <Chat onSendMessage={sendMessage} messages={messages} />
      </div>
      <aside className="rounded border bg-white p-5 shadow-sm">
        <h3 className="text-xl font-semibold mb-3">Tip</h3>
        <p className="text-slate-600">Try asking: “How do I register to vote in my state?” or “When is the next election deadline?”</p>
      </aside>
    </section>
  );
};

export default ChatPage;
