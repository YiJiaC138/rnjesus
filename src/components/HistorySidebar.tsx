import type { RollHistoryItem, RollResult} from '../types';

/*
HistorySidebar component for the Roller page.
Displays the history of rolls and allows the user to clear the history.
*/

export interface HistorySidebarProps {
  history: RollHistoryItem[];
  clearHistory: () => void;
}

export function HistorySidebar({ history, clearHistory }: HistorySidebarProps) {
  return (
    <aside className="history-sidebar">
      <div className="history-header">
        <h2>History</h2>
        <button onClick={clearHistory} className="clear-button">Clear</button>
      </div>
      <div className="history-list">
        {history.length === 0 ? (
          <p className="empty-history">No rolls yet.</p>
        ) : (
          history.map((item ) => (
            <div key={item.id} style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div className=
            {
              // Classify the roll result based on the roll result type.

              `history-item ${
                item.result === 'Good Roll' ? 'good-roll' : 
                item.result === 'Bad Roll' ? 'bad-roll' : 
                item.result === 'Neutral Roll' ? 'neutral-roll' : 
                'default-roll'}`} style={{ flex: 1 }}>
                  {item.value}
                  </div>
            <div style={{ minWidth: '48px', textAlign: 'right', fontWeight: 'bold' }}>
              <span style={{ color: '#10b981' }}>{item.rate}</span>%
            </div>
            </div>
       
          ))
        )}
      </div>
    </aside>
  );
}
