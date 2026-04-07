import type { RollHistoryItem } from '../types';

/*
Scoreboard for the Roller page.
Takes account for number of good and bad rolls and displays the percentage of good and bad rolls.
*/

export interface ScoreboardProps {
  history: RollHistoryItem[];
}

export function Scoreboard({ history }: ScoreboardProps) {
  const totalRolls = history.length;
  const goodRolls = history.filter(item => item.result === 'Good Roll').length;
  const badRolls = totalRolls - goodRolls;
  
  const goodPercentage = totalRolls > 0 ? Math.round((goodRolls / totalRolls) * 100) : 0;
  const badPercentage = totalRolls > 0 ? 100 - goodPercentage : 0;

  return (
    <div className="scoreboard">
      <div className="scoreboard-stats">
        <div className="stat-box good-stat">
          <span className="stat-label">Good Rolls</span>
          <span className="stat-value">{goodRolls}</span>
          <span className="stat-percentage">{totalRolls > 0 ? `${goodPercentage}%` : '-'}</span>
        </div>
        <div className="stat-box bad-stat">
          <span className="stat-label">Bad Rolls</span>
          <span className="stat-value">{badRolls}</span>
          <span className="stat-percentage">{totalRolls > 0 ? `${badPercentage}%` : '-'}</span>
        </div>
        <div className="stat-box total-stat">
          <span className="stat-label">Total Rolls</span>
          <span className="stat-value">{totalRolls}</span>
          <span className="stat-percentage">All</span>
        </div>
      </div>
      
      {totalRolls > 0 && (
        <div className="ratio-bar-container">
          <div className="ratio-bar-good" style={{ width: `${goodPercentage}%` }}></div>
          <div className="ratio-bar-bad" style={{ width: `${badPercentage}%` }}></div>
        </div>
      )}
    </div>
  );
}
