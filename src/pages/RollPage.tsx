import { useState } from 'react';
import '../components/Components.css';
import { MultiControl } from '../components/MultiControl.tsx';
import { LatestResults } from '../components/LatestResults.tsx';
import { Scoreboard } from '../components/Scoreboard.tsx';
import { HistorySidebar } from '../components/HistorySidebar.tsx';
import type { RollHistoryItem, RollResult } from '../types.ts';

import { createRollBatch } from '../components/utils/RollActions.ts';

type RollerVariation = 'simple' | 'standard' | 'focus';

type RollerConfig = {
  label: string;
  probabilities: number[];
  results: RollResult[];
  labels: string[];
};

const rollerConfigurations: Record<RollerVariation, RollerConfig> = {
  simple: {
    label: 'Simple (Two sliders)',
    probabilities: [50, 50],
    results: ['Good Roll', 'Bad Roll'],
    labels: ['Good Roll', 'Bad Roll'],
  },
  standard: {
    label: 'Standard (Three sliders)',
    probabilities: [33.3, 33.3, 33.4],
    results: ['Good Roll', 'Bad Roll', 'Neutral Roll'],
    labels: ['⭐⭐⭐', '⭐⭐', '⭐'],
  },
  focus: {
    label: 'Standard with Focus (Four sliders)',
    probabilities: [25, 25, 25, 25],
    results: ['Good Roll', 'Bad Roll', 'Neutral Roll', 'default'],
    labels: ['⭐⭐⭐⭐', '⭐⭐⭐', '⭐⭐', '⭐'],
  },
};


export const RollPage = () => {
  const [variation, setVariation] = useState<RollerVariation>('simple');
  const [probabilities, setProbabilities] = useState<number[]>(rollerConfigurations.simple.probabilities);
  const [history, setHistory] = useState<RollHistoryItem[]>([])
  const [latestRolls, setLatestRolls] = useState<string[]>([])
  const activeConfiguration = rollerConfigurations[variation];
  
  // Perform rolls under a fixed number of times
  const onClickRoll = (times: number) => {
    const { rolls: newRolls, historyItems: newHistoryItems } = createRollBatch({
      times,
      probabilities,
      results: activeConfiguration.results,
      getValue: (result) => activeConfiguration.labels[activeConfiguration.results.indexOf(result)] ?? result,
      getRate: () => probabilities.reduce((total, value) => total + value, 0),
    });
    // Update the latest rolls and history
    setLatestRolls(newRolls);
    setHistory(prevHistory => [...newHistoryItems, ...prevHistory]);
  };

  const handleVariationChange = (nextVariation: RollerVariation) => {
    setVariation(nextVariation);
    setProbabilities([...rollerConfigurations[nextVariation].probabilities]);
    setHistory([]);
    setLatestRolls([]);
  };
  

  // Clear the history and reset everything
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
          <Scoreboard history={history} results={activeConfiguration.results} />
        </div>

        <div className="roller-variation">
          <label htmlFor="roller-variation">Roller variation</label>
          <select
            id="roller-variation"
            value={variation}
            onChange={(event) => handleVariationChange(event.target.value as RollerVariation)}
          >
            {Object.entries(rollerConfigurations).map(([value, configuration]) => (
              <option key={value} value={value}>{configuration.label}</option>
            ))}
          </select>
        </div>

        <MultiControl
          probabilities={probabilities}
          setProbabilities={setProbabilities}
          performRoll={onClickRoll}
          labels={activeConfiguration.labels}
        />

        <LatestResults latestRolls={latestRolls} />
      </main>

      <HistorySidebar history={history} clearHistory={clearHistory} />
    </div>
  );
};
