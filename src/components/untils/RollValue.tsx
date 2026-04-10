/**
 * Generates a random integer between 0 (inclusive) and 100 (exclusive).
 * @returns {number} A random integer between 0 and 99.
 */
export const getRollValue = (): number => {
  return Math.floor(Math.random() * 100);
};
