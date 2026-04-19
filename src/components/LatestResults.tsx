
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
          <div key={index} className=
          {
            // Classify the roll result based on the roll result type.

            `roll-card ${
              roll === 'Good Roll' ? 'good-roll' : 
              roll === 'Bad Roll' ? 'bad-roll' : 
              roll === 'Neutral Roll' ? 'neutral-roll' : 
              'default-roll'}`}>
            {roll}
          </div>
        ))}
      </div>
    </div>
  );
}
