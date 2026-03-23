export type RollResult = 'Good Roll' | 'Bad Roll';

export interface RollHistoryItem {
  id: string;
  result: RollResult;
}
