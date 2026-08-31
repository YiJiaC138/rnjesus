import type { RollResult } from '../../types.ts';

/** Returns a random roll value from 0 to 100, rounded to two decimal places. */
export const getRollValue = (): number => Math.round(Math.random() * 10000) / 100;

/** Selects one result using the supplied probability distribution. */
export const getRollResult = (
  probabilities: number[],
  rollResults: RollResult[],
): RollResult => {
  const rollValue = getRollValue();
  let cumulative = 0;

  for (let index = 0; index < probabilities.length; index++) {
    cumulative += probabilities[index];
    if (rollValue < cumulative) {
      return rollResults[index];
    }
  }

  return rollResults[rollResults.length - 1];
};

/** Performs a fixed number of rolls with the supplied distribution. */
export const performRoll = (
  times: number,
  probabilities: number[],
  rollResults: RollResult[],
): RollResult[] => Array.from({ length: times }, () => getRollResult(probabilities, rollResults));
