export interface GameStatsProps {
  title: string;
  img: string;
  newWords: number;
  accuracy: number;
  streak: number;
}

export interface StatsModel {
  learnedWords: number;
  optional: {
    [data: string]: {
      newWords: number;
      learnedWords: number;
      accuracy: number;
      totalNewWords: number;

      audioChallenge: {
        newWords: number;
        accuracy: number;
        bestStreak: number;
      }

      sprint: {
        newWords: number;
        accuracy: number;
        bestStreak: number;
      }
    }
  }
}