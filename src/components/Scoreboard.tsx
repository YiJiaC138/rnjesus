import type { RollHistoryItem, RollResult } from '../types';

/*
Scoreboard for the Roller page.
Takes account for number of rolls for each result type and displays the percentage.
*/

export interface ScoreboardProps {
  history: RollHistoryItem[];
  results?: RollResult[];
}

export function Scoreboard({ history, results = ['Good Roll', 'Bad Roll'] }: ScoreboardProps) {
  const totalRolls = history.length;
  // returns css class
  const getStatClass = (result: RollResult) => {
    switch (result) {
      case 'Good Roll': return 'good-stat';
      case 'Bad Roll': return 'bad-stat';
      case 'Neutral Roll': return 'neutral-stat';
      case 'default': return 'default-stat';
      default: return 'default-stat';
    }
  };

  const getRatioBarClass = (result: RollResult) => {
    switch (result) {
      case 'Good Roll': return 'ratio-bar-good';
      case 'Bad Roll': return 'ratio-bar-bad';
      case 'Neutral Roll': return 'ratio-bar-neutral';
      case 'default': return 'ratio-bar-default';
      default: return 'ratio-bar-default';
    }
  };

  const getLabel = (result: RollResult) => {
    return result === 'default' ? 'Default Rolls' : `${result}s`;
  };

  const stats = results.map(result => {
    const count = history.filter(item => item.result === result).length;
    const percentage = totalRolls > 0 ? Math.round((count / totalRolls) * 100) : 0;
    return { result, count, percentage };
  });

  return (
    <div className="scoreboard">
      <div className="scoreboard-stats">
        {stats.map(({ result, count, percentage }) => (
          <div key={result} className={`stat-box ${getStatClass(result)}`}>
            <span className="stat-label">{getLabel(result)}</span>
            <span className="stat-value">{count}</span>
            <span className="stat-percentage">{totalRolls > 0 ? `${percentage}%` : '-'}</span>
          </div>
        ))}
        <div className="stat-box total-stat">
          <span className="stat-label">Total Rolls</span>
          <span className="stat-value">{totalRolls}</span>
          <span className="stat-percentage">All</span>
        </div>
      </div>
      
      {totalRolls > 0 && (
        <div className="ratio-bar-container">
          {stats.map(({ result, percentage }) => (
            <div 
              key={result} 
              className={getRatioBarClass(result)} 
              style={{ width: `${percentage}%` }}
            ></div>
          ))}
        </div>
      )}
    </div>
  );
}
