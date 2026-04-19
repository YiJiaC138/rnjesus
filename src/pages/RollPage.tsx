import { useState } from 'react';
import '../components/Components.css';
import { Controls } from '../components/Controls.tsx';
import { LatestResults } from '../components/LatestResults.tsx';
import { Scoreboard } from '../components/Scoreboard.tsx';
import { HistorySidebar } from '../components/HistorySidebar.tsx';
import type {RollHistoryItem } from '../types.ts';

import {performRoll } from '../components/untils/RollValue.tsx';



export const RollPage = () => {
  const [probability, setProbability] = useState<number>(3)
  const [history, setHistory] = useState<RollHistoryItem[]>([])
  const [latestRolls, setLatestRolls] = useState<string[]>([])
  
  // Perform rolls under a fixed number of times
  const onClickRoll = (times: number) => {
    const newRolls: string[] = [];
    const newHistoryItems: RollHistoryItem[] = [];

    const rolls = performRoll(times, [probability, 100 - probability], ['Good Roll', 'Bad Roll']);
    rolls.map((roll) => {
      newRolls.push(roll);
      newHistoryItems.push({
        id: crypto.randomUUID(),
        result: roll,
        value: roll,
        rate: probability,
      });
    });
    // Update the latest rolls and history
    setLatestRolls(newRolls);
    setHistory(prevHistory => [...newHistoryItems, ...prevHistory]);
  };

  

  // Clear the history and reset everything
  const clearHistory = () => {
    setHistory([]);
    setLatestRolls([]);
  };

  return (
    <div className="app-container">
      <main className="main-content">
        <div className="header-container">
          <div>
            <h1>RNJesus</h1>
            <p>Will you get a good roll?</p>
          </div>
          <Scoreboard history={history} />
        </div>
        
        <Controls 
          probability={probability} 
          setProbability={setProbability} 
          performRoll={onClickRoll} 
        />

        <LatestResults latestRolls={latestRolls} />
      </main>

      <HistorySidebar history={history} clearHistory={clearHistory} />
    </div>
  );
};
