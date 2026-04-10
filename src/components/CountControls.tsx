/*
Counts how many rolls it will take to reach a target probability.

*/

import { useState } from "react";
import { Scorecounter } from "./Scorecounter";
import { ProbabilitySlider } from "./Sliders/ProbabilitySlider";

export interface CountControlsProps {
  probability: number;
  setProbability: (value: number) => void;
  performRoll: () => number;
}

export function CountControls({ probability, setProbability, performRoll }: CountControlsProps) {
  
  return (
    
    <div className="controls">
      
      <div className="probability-display">
        <span className="good-text">Good Roll: {probability.toFixed(1)}%</span>
        <span className="bad-text">Bad Roll: {(100 - probability).toFixed(1)}%</span>
        
      </div>
      <ProbabilitySlider probability={probability} setProbability={setProbability} />
        <div className="action-buttons">
          <button onClick={() => performRoll()}>Roll</button>
        </div>
    </div>
    
  );
}
