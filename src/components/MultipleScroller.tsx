import { useState } from 'react';

interface MultipleScrollerProps {
  probabilities: number[];
  setProbabilities: (probabilities: number[]) => void;
  labels?: string[];
}

export function MultipleScroller({ probabilities, setProbabilities, labels }: MultipleScrollerProps) {
  const [lockedIndices, setLockedIndices] = useState<Set<number>>(new Set());
  // Toggle locks in a set of indices
  const toggleLock = (index: number) => {
    const newLocked = new Set(lockedIndices);
    if (newLocked.has(index)) {
      newLocked.delete(index);
    } else {
      newLocked.add(index);
    }
    setLockedIndices(newLocked);
  };

  const handleSliderChange = (index: number, newValue: number) => {
    if (lockedIndices.has(index)) return;

    const otherIndices = probabilities
      .map((_, i) => i)
      .filter(i => i !== index && !lockedIndices.has(i));

    if (otherIndices.length === 0) return;

    const oldValue = probabilities[index];
    let diff = newValue - oldValue;

    // Calculate how much we can actually change based on other sliders' limits (0 and 100)
    const otherSum = otherIndices.reduce((sum, i) => sum + probabilities[i], 0);
    const otherSpace = (otherIndices.length * 100) - otherSum;

    if (diff > 0 && diff > otherSum) diff = otherSum;
    // If the difference is negative and greater than the other space, set the difference to the other space
    if (diff < 0 && Math.abs(diff) > otherSpace) diff = -otherSpace;

    // Calculate the actual new value
    const actualNewValue = Math.round((oldValue + diff) * 10) / 10;
    const newProbabilities = [...probabilities];
    newProbabilities[index] = actualNewValue;

    if (otherIndices.length > 0) {
      let remainingDiff = diff;
      
      if (diff > 0) {
        // Decreasing others
        otherIndices.forEach((idx, i) => {
          const proportion = otherSum > 0 ? probabilities[idx] / otherSum : 1 / otherIndices.length;
          const share = i === otherIndices.length - 1 ? remainingDiff : Math.round((diff * proportion) * 10) / 10;
          const adjustment = Math.min(probabilities[idx], share);
          newProbabilities[idx] = Math.round((probabilities[idx] - adjustment) * 10) / 10;
          remainingDiff -= adjustment;
        });
      } else {
        // Increasing others
        otherIndices.forEach((idx, i) => {
          const space = 100 - probabilities[idx];
          const proportion = otherSpace > 0 ? space / otherSpace : 1 / otherIndices.length;
          const share = i === otherIndices.length - 1 ? remainingDiff : Math.round((diff * proportion) * 10) / 10;
          const adjustment = Math.max(-space, share);
          newProbabilities[idx] = Math.round((probabilities[idx] - adjustment) * 10) / 10;
          remainingDiff -= adjustment;
        });
      }

      // Final adjustment for rounding to ensure exactly 100%
      const currentTotal = newProbabilities.reduce((a, b) => a + b, 0);
      const correction = Math.round((100 - currentTotal) * 10) / 10;
      if (correction !== 0) {
        for (const idx of otherIndices) {
          const newVal = Math.round((newProbabilities[idx] + correction) * 10) / 10;
          if (newVal >= 0 && newVal <= 100) {
            newProbabilities[idx] = newVal;
            break;
          }
        }
      }
    }

    setProbabilities(newProbabilities);
  };

  return (
    <div className="controls">
      {probabilities.map((prob, index) => (
        <div key={index} className="slider-group">
          <div className="probability-display">
            <span>{labels?.[index] || `Option ${index + 1}`}: {prob}%</span>
          </div>
          <div className="slider-container">
            <input
              type="range"
              min="0"
              max="100"
              step="0.1"
              value={prob}
              disabled={lockedIndices.has(index)}
              onChange={(e) => handleSliderChange(index, parseFloat(e.target.value))}
              className={`slider ${lockedIndices.has(index) ? 'slider-locked' : ''}`}
            />
            <label className="lock-label">
              <input
                type="checkbox"
                checked={lockedIndices.has(index)}
                onChange={() => toggleLock(index)}
              />
              Lock
            </label>
          </div>
        </div>
      ))}
    </div>
  );
  
}
