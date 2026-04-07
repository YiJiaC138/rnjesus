import { ProbabilitySlider } from './ProbabilitySlider';

/*
Component to control the number of rolls to perform based on input probability.

Props:
- probability: number - the probability of a good roll
- setProbability: (value: number) => void - function to set the probability
- performRoll: (times: number) => void - function to perform rolls
*/

export interface ControlsProps {
  probability: number;
  setProbability: (value: number) => void;
  performRoll: (times: number) => void;
}

export function Controls({ probability, setProbability, performRoll }: ControlsProps) {
  return (
    <div className="controls">
      <div className="probability-display">
        <span className="good-text">Good Roll: {probability}%</span>
        <span className="bad-text">Bad Roll: {100 - probability}%</span>
      </div>
      {/* We use a slider here to set the probability */}
      <ProbabilitySlider probability={probability} setProbability={setProbability} />

      <div className="action-buttons">
        <button onClick={() => performRoll(1)}>Roll 1x</button>
        <button onClick={() => performRoll(10)}>Roll 10x</button>
      </div>
    </div>
  );
}
