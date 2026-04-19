import { MultiControl } from '../components/MultiControl.tsx';
import { useState } from 'react';
import { performRoll } from '../components/untils/RollValue.tsx';
import type { RollHistoryItem, RollResult } from '../types.ts';
import { LatestResults } from '../components/LatestResults.tsx';
import { HistorySidebar } from '../components/HistorySidebar.tsx';


export const ToolTwo = () => {
  const [probabilities, setProbabilities] = useState<number[]>([33.3, 33.3, 33.4]);
  const [latestRolls, setLatestRolls] = useState<string[]>([]);
  const [history, setHistory] = useState<RollHistoryItem[]>([]);
  const labels = ["Option A", "Option B", "Option C"];
  const possibleResults: RollResult[] = ["Good Roll", "Bad Roll", "Neutral Roll"];
  const onclickRoll = (times: number) => {
    const newRolls: string[] = [];
    const newHistoryItems: RollHistoryItem[] = [];
    console.log(probabilities);
    const rolls = performRoll(times, probabilities, possibleResults);
    rolls.map((roll) => {
      newRolls.push(roll);
      newHistoryItems.push({
        id: crypto.randomUUID(),
        result: roll,
        value:labels[possibleResults.indexOf(roll)],
        rate: probabilities.reduce((acc, curr) => acc + curr, 0),
      });
    });
    setLatestRolls(newRolls);
    setHistory(prevHistory => [...newHistoryItems, ...prevHistory]);
  }  
  
  const clearHistory = () => {
    setHistory([]);
    setLatestRolls([]);
  };
  
  return (
  <div className="app-container">
  <main className="main-content">
    <h1>Beta</h1>
    <p>This is a placeholder for customised settings.</p>
    <MultiControl 
      probabilities={probabilities} 
    setProbabilities={setProbabilities} 
    performRoll={onclickRoll}
    labels={labels}
  />
  
  <LatestResults latestRolls={latestRolls} />
  </main>
  <HistorySidebar history={history} clearHistory={clearHistory} />
  
  </div>
);
}
