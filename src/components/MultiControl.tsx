/*
Control for multiple probabilities.
*/

import { MultipleScroller } from "./Sliders/MultipleSlider";


export interface MultiControlProps {
  probabilities: number[];
  setProbabilities: (probabilities: number[]) => void;
  performRoll: () => void;
  labels?: string[];
}

export function MultiControl({ probabilities, setProbabilities, performRoll, labels }: MultiControlProps) {
  
  return (
    
    
    <MultipleScroller 
    probabilities={probabilities} 
    setProbabilities={setProbabilities} 
    labels={labels}
  />
    
  );
}
