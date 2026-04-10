
/*
LatestResults component for the Roller page.
Displays the latest rolls and allows the user to clear the latest rolls.
*/

export interface LatestResultsProps {
  latestRolls: string[];
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
