import { useState } from 'react';
import { CountControls } from '../components/CountControls.tsx';
import { getRollValue } from '../components/untils/RollValue.tsx';
import type { RollHistoryItem, RollResult } from '../types.ts';
import { HistorySidebar } from '../components/HistorySidebar.tsx';

export const RollCount = () => {
  const [probability, setProbability] = useState<number>(3);
  const [counter, setCounter] = useState<number>(0);
  const [historyCount, setHistoryCount] = useState<RollHistoryItem[]>([]);

  const performRoll = () => {
  
    let count = 1;
    while (true) {
      if (probability <= 0 || probability >= 100) return;
      const rollValue = getRollValue();
      if (rollValue < probability) break;
      count++;
    }
  
    setCounter(count);
    setHistoryCount(prevHistoryCount => [...prevHistoryCount, {
      id: crypto.randomUUID(),
      result: getRollResult(count),
      value: count.toString(),
      rate: probability,
    }]);
  };
  // Classify the roll result based on the count.
  const getRollResult = (count: number): RollResult => {
    return count > 300 ? 'Bad Roll' : count > 200 ? 'Neutral Roll' : count > 100 ? 'default' : 'Good Roll';
  }

  return (
    <div className="app-container">
    <main className="main-content">
      <h1>Roll Counter</h1>
      <p>Predict how many rolls it will take to get a good roll.</p>
      <div className="scorecounter">
      <div className="scorecounter-value">
        <span className="scorecounter-value-text">{counter}</span>
        <span>Rolls to get a good roll</span>
      </div>
        
      </div>
      <CountControls probability={probability} setProbability={setProbability} performRoll={performRoll} />
    </main>
    <HistorySidebar history={historyCount} clearHistory={() => setHistoryCount([])} />
    </div>
  );
};