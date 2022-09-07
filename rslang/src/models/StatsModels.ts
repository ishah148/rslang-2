export interface GameStatsProps {
  title: string;
  img: string;
  newWords: number;
  accuracy: number;
  streak: number;
}

export interface StatsModel {
  learnedWords: number | null;  //счетчик изученных слов за всё время //!2 сюда добавляется значение из optional.learnedWords
  optional: {
    [date: string]: {
      newWords: number | null;  // количество новых слов (всех) за день
      learnedWords: number | null;  //количество изученных слов (всех) за день  //!1 сюда добавляется значение из statsUpdateObject
      accuracy: number | null;  // процент правильных ответов (всех) за день (cумма значения объединенных массивов  /2)
      totalLearnedWords: number | null;  //количество изученных слов за весь период обучения на текущий день
                                  //обновляется после learnedWords, записывается то же самое значение
                                  //!3 сюда приравнивается значение из п.2 learnedWords
      audioChallenge: {
        newWords: number | null;  // количество новых слов (от audioChallenge) за день
        accuracy: number[];  // процент правильных ответов (от audioChallenge) за день (сумма значений/количество игр)
        bestStreak: number | null;  // самая длинная серия правильных ответов (от audioChallenge) за день
      }

      sprint: {
        newWords: number | null;  // количество новых слов (от sprint) за день
        accuracy: number[];  // процент правильных ответов (от sprint) за день
        bestStreak: number | null;  // самая длинная серия правильных ответов (от sprint) за день
      } 
    }
  }
}

export interface ServerStatsModel {
  id?: string;
  learnedWords: number | null;
  optional: {
    [date: string]: {
      newWords: number | null;
      learnedWords: number | null;
      accuracy: number | null;
      totalLearnedWords: number | null;

      audioChallenge: {
        newWords: number | null;
        accuracy: number[];
        bestStreak: number | null;
      }

      sprint: {
        newWords: number | null;
        accuracy: number[];
        bestStreak: number | null;
      } 
    }
  }
}

export interface StatsForSpecificDate {
    newWords: number | null;
    learnedWords: number | null;
    accuracy: number | null;
    totalLearnedWords: number | null;

    audioChallenge: {
      newWords: number | null;
      accuracy: number[];
      bestStreak: number | null;
    }

    sprint: {
      newWords: number | null;
      accuracy: number[];
      bestStreak: number | null;
    } 
}

export interface StatsUpdateObject {
  newLearnedWords: number;
}


export interface DailyStatsData {
  newWords: number | null;
  learnedWords: number | null;
  totalAccuracy: number | null;
  audioChallenge: {
    newWords: number | null;
    accuracy: number | null;
    bestStreak: number | null;
  }
  sprint: {
    newWords: number | null;
    accuracy: number | null;
    bestStreak: number | null;
  }
}


export interface FullStatsData {
  [date: string]: {
    newWords: number | null;
    totalLearnedWords: number | null;
  }
}