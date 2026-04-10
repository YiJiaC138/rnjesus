/*
Counts how many rolls it will take to reach a target probability.

*/

export interface CountControlsProps {
  probability: number;
  setProbability: (value: number) => void;
  performRoll: () => number;
}

export function CountControls({ probability, setProbability, performRoll }: CountControlsProps) {
  return (
    <div className="count-controls">
      <input type="number" min="0" max="100" value={probability} onChange={(e) => setProbability(Number(e.target.value))} />
        <div className="action-buttons">
          <button onClick={() => performRoll()}>Roll</button>
        </div>
    </div>
  );
}
