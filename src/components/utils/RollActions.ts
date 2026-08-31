import type { RollHistoryItem, RollResult } from '../../types.ts';
import { getRollResult, performRoll } from './RollValue.ts';

type RollBatchOptions = {
  times: number;
  probabilities: number[];
  results: RollResult[];
  getValue: (result: RollResult) => string;
  getRate: (result: RollResult) => number;
};

/** Creates roll results and their matching history entries for page state updates. */
export const createRollBatch = ({
  times,
  probabilities,
  results,
  getValue,
  getRate,
}: RollBatchOptions): { rolls: string[]; historyItems: RollHistoryItem[] } => {
  const rolls = performRoll(times, probabilities, results);

  return {
    rolls,
    historyItems: rolls.map((result) => ({
      id: crypto.randomUUID(),
      result,
      value: getValue(result),
      rate: getRate(result),
    })),
  };
};

/** Returns the number of attempts required to get a good roll, or null for an invalid rate. */
export const rollUntilGood = (probability: number): number | null => {
  if (probability <= 0 || probability >= 100) return null;

  let count = 1;
  while (getRollResult([probability, 100 - probability], ['Good Roll', 'Bad Roll']) !== 'Good Roll') {
    count++;
  }

  return count;
};

/** Classifies a counter-roll result for history display. */
export const classifyRollResult = (count: number): RollResult =>
  count > 300 ? 'Bad Roll' : count > 200 ? 'Neutral Roll' : count > 100 ? 'default' : 'Good Roll';
