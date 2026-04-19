import { MultiControl } from '../components/MultiControl.tsx';
import { useState } from 'react';
import { getRollValue } from '../components/untils/RollValue.tsx';
import type { RollHistoryItem, RollResult } from '../types.ts';

export const ToolTwo = () => {
  const [probabilities, setProbabilities] = useState<number[]>([33.3, 33.3, 33.4]);

  const performRoll = (times: number) => {
    const newRolls: string[] = [];
    const newHistoryItems: RollHistoryItem[] = [];
  }  

  return (
  <div className="main-content">
    <h1>Tool Two</h1>
    <p>This is a placeholder for Tool Two.</p>
    <MultiControl 
      probabilities={probabilities} 
    setProbabilities={setProbabilities} 
    performRoll={() => {}}
    labels={["Option A", "Option B", "Option C"]}
  />
  </div>
);
}
