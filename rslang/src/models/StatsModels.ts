export interface GameStatsProps {
  title: string;
  img: string;
  newWords: number;
  accuracy: number;
  streak: number;
}

export interface StatsModel {
  learnedWords: number;  //счетчик изученных слов за всё время
  optional: {
    [data: string]: {
      newWords: number;  // количество новых слов (всех) за день
      learnedWords: number;  //количество изученных слов (всех) за день
      accuracy: number;  // процент правильных ответов (всех) за день (cумма значения объединенных массивов  /2)
      totalLearnedWords: number;  //количество изученных слов за весь период обучения на текущий день
                                  //обновляется после learnedWords, записывается то же самое значение
      audioChallenge: {
        newWords: number;  // количество новых слов (от этой игры) за день
        accuracy: number[];  // процент правильных ответов (от этой игры) за день (сумма значений/количество игр)
        bestStreak: number;  // самая длинная серия правильных ответов (от этой игры) за день
      }

      sprint: {
        newWords: number;  // количество новых слов (от этой игры) за день
        accuracy: number[];  // процент правильных ответов (от этой игры) за день
        bestStreak: number;  // самая длинная серия правильных ответов (от этой игры) за день
      } 
    }
  }
}

export interface StatsUpdateObject {
  newWords: number;
  learnedWords: number;
  accuracy: number
}


export interface DailyStatsData {
  newWords: number;
  learnedWords: number;
  totalAccuracy: number;
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


export interface FullStatsData {
  [data: string]: {
    newWords: number;
    totalLearnedWords: number;
  }
}