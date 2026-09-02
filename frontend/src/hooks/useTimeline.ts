import { useMemo } from 'react';
import { TimelineStep } from '../types/election';

const useTimeline = (steps: TimelineStep[]) => {
  const sortedSteps = useMemo(
    () => [...steps].sort((a, b) => a.date.localeCompare(b.date)),
    [steps]
  );

  return { sortedSteps };
};

export default useTimeline;
