export interface UserWord {
  difficulty: 'easy' | 'hard' | null;  // easy OR hard
  optional: {
    isLearned: boolean | null;
    progressBar: number | null; // 1-2-3 для easy и 1-2-3-4-5 для hard
    progressBarSize: number | null;
    isNew: boolean | null;
    meetingCounter: number | null;
  }
}

export interface ServerUserWord {
  id: string;
  difficulty: 'easy' | 'hard' | null;
  optional: {
    isLearned: boolean;
    progressBar: number; // 1-2-3 для easy и 1-2-3-4-5 для hard
    progressBarSize: number; 
    isNew: boolean;
    meetingCounter: number;
  };
  wordId: string;
}

export interface UpdateDifficultWordsResponse {
  id: string;
  status: 'easy' | 'hard' | null;
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