import React, { useEffect, useState } from 'react';
import Timeline from '../components/Timeline/Timeline';
import apiClient from '../services/apiClient';
import { TimelineStep } from '../types/election';

const TimelinePage: React.FC = () => {
  const [steps, setSteps] = useState<TimelineStep[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTimeline = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await apiClient.get('/timeline');
        setSteps(response.data.steps ?? []);
      } catch (err) {
        setError('Unable to load the election timeline. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchTimeline();
  }, []);

  return (
    <section className="rounded border bg-white p-5 shadow-sm">
      <div className="mb-4 flex items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-semibold">Election Timeline</h2>
          <p className="text-sm text-slate-600">Stay on track with the key registration and voting deadlines.</p>
        </div>
      </div>

      {loading && <p className="text-slate-600">Loading timeline...</p>}
      {error && <p role="alert" className="text-red-600">{error}</p>}
      {!loading && !error && <Timeline steps={steps} />}
    </section>
  );
};

export default TimelinePage;
