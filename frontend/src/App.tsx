import React, { useState } from 'react';
import HomePage from './pages/HomePage';
import ChatPage from './pages/ChatPage';
import TimelinePage from './pages/TimelinePage';
import './index.css';

type View = 'home' | 'chat' | 'timeline';

const App: React.FC = () => {
  const [view, setView] = useState<View>('home');
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <header className="border-b bg-white shadow-sm">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
          <h1 className="text-xl font-semibold">Election Assistant</h1>
          <nav className="flex gap-3">
            <button className="rounded bg-sky-600 px-4 py-2 text-white" onClick={() => setView('home')}>
              Home
            </button>
            <button className="rounded bg-sky-600 px-4 py-2 text-white" onClick={() => setView('chat')}>
              Chat
            </button>
            <button className="rounded bg-sky-600 px-4 py-2 text-white" onClick={() => setView('timeline')}>
              Timeline
            </button>
          </nav>
        </div>
      </header>
      <main className="mx-auto max-w-6xl p-4">
        {view === 'home' && <HomePage />}
        {view === 'chat' && <ChatPage />}
        {view === 'timeline' && <TimelinePage />}
      </main>
    </div>
  );
};

export default App;
