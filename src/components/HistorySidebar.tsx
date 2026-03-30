import type { RollHistoryItem } from '../types';

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
          history.map((item) => (
            <div key={item.id} style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div className={`history-item ${item.result === 'Good Roll' ? 'good-roll' : 'bad-roll'}`} style={{ flex: 1 }}>
                {item.result}
              </div>
              <div style={{ minWidth: '48px', textAlign: 'right', fontWeight: 'bold' }}>
                <span style={{ color: '#10b981' }}>{item.rate}</span> - <span style={{ color: 'red' }}>{100 - item.rate}</span> %
              </div>
            </div>
          ))
        )}
      </div>
    </aside>
  );
}
