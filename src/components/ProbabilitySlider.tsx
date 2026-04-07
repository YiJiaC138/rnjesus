import type { ChangeEvent } from 'react';

/*
Slider to set the probability of a good roll.
This will set only for good and bad rolls. So its binomial.
*/

interface ProbabilitySliderProps {
  probability: number;
  setProbability: (value: number) => void;
}

export function ProbabilitySlider({ probability, setProbability }: ProbabilitySliderProps) {
  return (
    <input 
      type="range" 
      min="0" 
      max="100" 
      value={probability} 
      onChange={(e: ChangeEvent<HTMLInputElement>) => setProbability(Number(e.target.value))}
      className="slider"
    />
  );
}
