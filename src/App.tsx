import { useState } from 'react'
import './App.css'
import { Controls } from './components/Controls'
import { LatestResults } from './components/LatestResults'
import { HistorySidebar } from './components/HistorySidebar'
import { Scoreboard } from './components/Scoreboard'
import type { RollResult, RollHistoryItem } from './types'

function App() {
  const [probability, setProbability] = useState<number>(50)
  const [history, setHistory] = useState<RollHistoryItem[]>([])
  const [latestRolls, setLatestRolls] = useState<RollResult[]>([])

  const performRoll = (times: number) => {
    const newRolls: RollResult[] = [];
    const newHistoryItems: RollHistoryItem[] = [];

    for (let i = 0; i < times; i++) {
      const rollValue = Math.floor(Math.random() * 100);
      const result: RollResult = rollValue < probability ? 'Good Roll' : 'Bad Roll';
      newRolls.push(result);
      newHistoryItems.push({
        id: crypto.randomUUID(),
        result,
      });
    }

    setLatestRolls(newRolls);
    setHistory(prevHistory => [...newHistoryItems, ...prevHistory]);
  };

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
          performRoll={performRoll} 
        />

        <LatestResults latestRolls={latestRolls} />
      </main>

      <HistorySidebar history={history} clearHistory={clearHistory} />
    </div>
  )
}

export default App
