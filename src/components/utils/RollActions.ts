import type { RollHistoryItem, RollResult } from '../../types.ts';
import { getRollResult, performRoll } from './RollValue.ts';

type RollBatchOptions = {
  times: number;
  probabilities: number[];
  results: RollResult[];
  transformResult?: (result: RollResult) => RollResult;
  getValue: (result: RollResult) => string;
  getRate: (result: RollResult) => number;
};

/** Creates roll results and their matching history entries for page state updates. */
export const createRollBatch = ({
  times,
  probabilities,
  results,
  transformResult,
  getValue,
  getRate,
}: RollBatchOptions): { rolls: string[]; historyItems: RollHistoryItem[] } => {
  const rolls = performRoll(times, probabilities, results).map(
    (result) => transformResult ? transformResult(result) : result,
  );

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

/** Turns a Good Roll into an equal-chance Good Roll or Bad Roll outcome. */
export const resolveGoodRollCoinFlip = (result: RollResult): RollResult => {
  if (result !== 'Good Roll') return result;

  return Math.random() < 0.5 ? 'Good Roll' : 'Bad Roll';
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
