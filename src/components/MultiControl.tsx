/*
Control for multiple probabilities.
*/

import { MultipleScroller } from "./Sliders/MultipleSlider";


export interface MultiControlProps {
  probabilities: number[];
  setProbabilities: (probabilities: number[]) => void;
  performRoll: (times: number) => void;
  labels?: string[];
}

export function MultiControl({ probabilities, setProbabilities, performRoll, labels }: MultiControlProps) {
  
  return (
    
    <div className="controls">
    <MultipleScroller 
    probabilities={probabilities} 
    setProbabilities={setProbabilities} 
    labels={labels}
  />
  <div className="action-buttons">
    <button onClick={() => performRoll(1)}>Roll 1x</button>
    <button onClick={() => performRoll(10)}>Roll 10x</button>
  </div>
  </div>
    
  );
}
