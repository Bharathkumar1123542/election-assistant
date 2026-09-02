import React from 'react';

const HomePage: React.FC = () => (
  <section>
    <h2 className="text-3xl font-bold mb-4">Welcome to Election Assistant</h2>
    <p className="mb-4 text-slate-700">
      This app helps you understand election workflows, deadlines, and next steps.
      Use the chat to ask questions and the timeline page to see the process visually.
    </p>
    <div className="grid gap-4 md:grid-cols-2">
      <article className="rounded border bg-white p-5 shadow-sm">
        <h3 className="text-xl font-semibold mb-2">Interactive Guide</h3>
        <p className="text-slate-600">Ask election questions in natural language and get step-by-step answers.</p>
      </article>
      <article className="rounded border bg-white p-5 shadow-sm">
        <h3 className="text-xl font-semibold mb-2">Personalized Timeline</h3>
        <p className="text-slate-600">View important deadlines and task progress based on your election journey.</p>
      </article>
    </div>
  </section>
);

export default HomePage;
