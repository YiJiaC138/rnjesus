import { MultiControl } from '../components/MultiControl.tsx';
import { useEffect, useState } from 'react';
import { performRoll } from '../components/untils/RollValue.tsx';
import type { RollHistoryItem, RollResult } from '../types.ts';
import { LatestResults } from '../components/LatestResults.tsx';
import { HistorySidebar } from '../components/HistorySidebar.tsx';
import { Scoreboard } from '../components/Scoreboard.tsx';
import { SliderInput } from '../components/SliderInput.tsx';


export const ToolTwo = () => {
  const [useOmega, setUseOmega] = useState(false);
  const [probabilities, setProbabilities] = useState<number[]>([33.3, 33.3, 33.4]);
  const [latestRolls, setLatestRolls] = useState<string[]>([]);
  const [history, setHistory] = useState<RollHistoryItem[]>([]);
  
  const labels = useOmega ? ["⭐⭐⭐⭐","⭐⭐⭐", "⭐⭐", "⭐"] : ["⭐⭐⭐", "⭐⭐", "⭐"];
  // Ω ⭐
  const possibleResults: RollResult[] = useOmega ? ["Good Roll", "Bad Roll", "Neutral Roll","default"] : ["Good Roll", "Bad Roll", "Neutral Roll"];
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
  const handleToggle=(e: React.ChangeEvent<HTMLInputElement>)=>{
    const checked = e.target.checked;

    if (checked){
      setProbabilities([25, 25, 25, 25]);
    } else {
      setProbabilities([33.3, 33.3, 33.4]);
    }  
    setUseOmega(checked)
  }
  return (
  <div className="app-container">
  <main className="main-content">
    <div className="header-container">
      <div>
        <h1>Beta</h1>
        <p>This is a placeholder for customised settings.</p>
      </div>
      <Scoreboard history={history} results={possibleResults} />
    </div>
    <div><input
                type="checkbox"
                checked={useOmega}
                onChange={(e)=> handleToggle(e)}
              />
              Enable Focus
    </div>
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
