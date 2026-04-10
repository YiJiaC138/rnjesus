/*
Types for the History of Rolls.
Uses classification for rolls. How to classify is determined by each page.
*/
export type RollResult = 'Good Roll' | 'Bad Roll' | 'Neutral Roll' | 'default';
export interface RollHistoryItem {
  id: string;
  result: RollResult;
  value: string;
  rate: number;
}
