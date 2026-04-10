import { useState } from 'react';
import { CountControls } from '../components/CountControls.tsx';
import { getRollValue } from '../components/untils/RollValue.tsx';
import { Scorecounter } from '../components/Scorecounter.tsx';

export const ToolOne = () => {
  const [probability, setProbability] = useState<number>(50);
  const [counter, setCounter] = useState<number>(0);

  const performRoll = () => {
    setCounter(0);
    while (true) {
      if (probability <= 0 || probability >= 100) return counter;
      const rollValue = getRollValue();
      if (rollValue < probability) return counter;
      setCounter(prevCounter => prevCounter + 1);
    }
  };

  return (
    <div className="main-content">
      <h1>Tool One</h1>
      <p>Predict how many rolls it will take to get a good roll.</p>
      <div>
        <Scorecounter score={counter} />
        <p>Rolls to get a good roll</p>
      </div>
      <CountControls probability={probability} setProbability={setProbability} performRoll={performRoll} />
    </div>
  );
};