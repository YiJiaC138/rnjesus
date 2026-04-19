import type { RollResult } from "../../types";

/**
 * Perform a roll based on probabilities and get a result
 * @param probabilities - The probabilities of each result
 * @param RollsResults - The possible results of the roll we
 * @returns The result of the roll
 */
function getRollResult(probabilities:number[], RollsResults:RollResult[]): RollResult {
  const rollValue = getRollValue();
  let cumulative = 0;
  for (let i = 0; i < probabilities.length; i++) {
    cumulative += probabilities[i];
    if (rollValue < cumulative) {
      return RollsResults[i];
    }
  }
  // If nothing matches due to imprecise totals, return the last result as fallback
  return RollsResults[RollsResults.length - 1];

}
/**
 * Uses GetRollResult a set number of times
 * @param times - The number of times to perform the roll
 * @param probabilities - The probabilities of each result
 * @param RollsResults - The possible results of the roll we
 * @returns The results of the rolls
 */
function performRoll(times:number, probabilities:number[], RollsResults:RollResult[]): RollResult[] {
  const rolls: RollResult[] = [];
  for (let i = 0; i < times; i++) {
    rolls.push(getRollResult(probabilities, RollsResults));
  }
  return rolls;
}

/**
 * Generates a random integer between 0 (inclusive) and 100 (exclusive).
 * @returns {number} A random integer between 0 and 99.
 */
const getRollValue = (): number => {
  return Math.floor(Math.random() * 100);
};
export { getRollValue, getRollResult, performRoll };