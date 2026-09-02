import React from 'react';

interface TimelineStep {
  title: string;
  description: string;
  date: string;
  completed: boolean;
}

interface TimelineProps {
  steps: TimelineStep[];
}

const Timeline: React.FC<TimelineProps> = ({ steps }) => {
  return (
    <div role="region" aria-label="Election Timeline" className="p-4">
      <h2 className="text-xl font-bold mb-4">Election Steps</h2>
      <ol className="list-decimal list-inside space-y-4">
        {steps.map((step, index) => (
          <li
            key={index}
            className={`p-4 border rounded ${step.completed ? 'bg-green-100' : 'bg-gray-100'}`}
            aria-current={index === 0 ? 'step' : undefined}
          >
            <h3 className="font-semibold">{step.title}</h3>
            <p>{step.description}</p>
            <time dateTime={step.date} className="text-sm text-gray-600">
              {step.date}
            </time>
            {step.completed && <span aria-label="Completed" className="text-green-600">✓</span>}
          </li>
        ))}
      </ol>
    </div>
  );
};

export default Timeline;