export interface UserWord {
  difficulty: string;  // easy OR hard
  optional: {
    isLearned: boolean;
    sucсessAttemptsInARow: number; // 1-2-3 для easy и 1-2-3-4-5 для hard
    isNew: boolean;
    meetingCounter: number;
  }
}

export interface ServerUserWord {
  id: string;
  difficulty: string;
  optional: {
    isLearned: boolean;
    sucсessAttemptsInARow: number; // 1-2-3 для easy и 1-2-3-4-5 для hard
    isNew: boolean;
    meetingCounter: number;
  };
  wordId: string;
}

export interface GameData {
  wordsID: string[]; 
  newWords: number | null;
  accuracy: number | null;
  bestStreak: number | null;
  corectness: {
    [wordID: string] : boolean
  }
}