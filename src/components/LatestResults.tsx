import type { RollResult } from '../types';

export interface LatestResultsProps {
  latestRolls: RollResult[];
}

export function LatestResults({ latestRolls }: LatestResultsProps) {
  if (latestRolls.length === 0) return null;

  return (
    <div className="latest-results">
      <h2>Latest Rolls</h2>
      <div className="rolls-grid">
        {latestRolls.map((roll, index) => (
          <div key={index} className={`roll-card ${roll === 'Good Roll' ? 'good-roll' : 'bad-roll'}`}>
            {roll}
          </div>
        ))}
      </div>
    </div>
  );
}
