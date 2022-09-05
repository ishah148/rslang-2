import { GameData, ServerUserWord, UserWord } from "../models/UserWordsModels";
import { UserWordsApi } from "./api/UserWords_api";

export class GamesService {
  static async updateGameData(gameData: GameData, gameName: string): Promise<void> {
    // gameName либо "audioChallenge" либо "sprint"
    // переделать с "20 запросов в цикле" на "получить массив пользовательских слов и локально перебирать"
    // StatsApi.updateUserStats(gameData);
    // StatsService.updateUserStats(gameData)

    try {
      if (gameName === 'sprint') {
        gameData.newWords = await GamesService.calcNewWords(gameData.wordsID);
      }

      console.log('GAMEDATA', gameData);

      const response = await UserWordsApi.getUserWords();

      if (response.status !== 200) {
        throw new Error(`updateGameData response.status is --- ${response.status}`)
      }

      const userWordsArray: ServerUserWord[] = response.body;

      for (const ID of gameData.wordsID) {
        const userWord: ServerUserWord | undefined = userWordsArray.find((userWord) => ID === userWord.wordId)
        const newUserWord: UserWord = {
          difficulty: null,
          optional: {
            isLearned: null,
            progressBar: null,
            progressBarSize: null,
            isNew: null,
            meetingCounter: null,
          },
        }
        if (!userWord) {
          // вынести в UserWords_Service (метод updateUserWord)
          newUserWord.difficulty = 'easy';
          newUserWord.optional.isLearned = false;
          newUserWord.optional.progressBar = gameData.corectness[ID] ? 1 : 0;
          newUserWord.optional.progressBarSize = 3;
          newUserWord.optional.isNew = true;
          newUserWord.optional.meetingCounter = 1;
          await UserWordsApi.createUserWord(ID, newUserWord);
          console.log('!userWord ---- ', newUserWord);
        } else {
          // вынести в UserWords_Service (метод createNewUserWord)
          newUserWord.optional.meetingCounter = userWord.optional.meetingCounter++;
          if(!gameData.corectness[ID]) {
            newUserWord.optional.progressBar = 0;
          } else {
            if(userWord.optional.progressBar + 1 >  userWord.optional.progressBarSize) {
              newUserWord.optional.progressBar = userWord.optional.progressBarSize;
            } else {
              newUserWord.optional.progressBar = userWord.optional.progressBar + 1;
            }

            if(newUserWord.optional.progressBar === userWord.optional.progressBarSize) {
              newUserWord.optional.isLearned = true;
            } else {
              newUserWord.optional.isLearned = false;
            }
          }

          if (userWord.optional.isLearned === false && newUserWord.optional.isLearned === false) {
            newUserWord.optional.progressBarSize = userWord.optional.progressBarSize;
            newUserWord.optional.progressBar = userWord.optional.progressBar + 1; // необязательно ?
            newUserWord.difficulty = userWord.difficulty;
            newUserWord.optional.isNew = ((newUserWord.optional.meetingCounter as number) <= 3) && (newUserWord.optional.meetingCounter !== 0);
            console.log('isLearned == false && isLearned == false ---- ', newUserWord);

          } else if (userWord.optional.isLearned == true && newUserWord.optional.isLearned == true) {
            newUserWord.optional.progressBarSize = userWord.optional.progressBarSize;
            newUserWord.optional.progressBar = userWord.optional.progressBar; // необязательно ?
            newUserWord.difficulty = userWord.difficulty;
            newUserWord.optional.isNew = ((newUserWord.optional.meetingCounter as number) <= 3) && (newUserWord.optional.meetingCounter !== 0);
            console.log('isLearned == true && isLearned == true ---- ', newUserWord);

          } else if (userWord.difficulty == 'easy' && newUserWord.optional.isLearned == true) {
            newUserWord.difficulty = 'easy';
            newUserWord.optional.progressBar = 3; // необязательно ?
            newUserWord.optional.progressBarSize = 3;
            newUserWord.optional.isNew = false;
            console.log('userWord.difficulty == easy && newUserWord.isLearned == true ---- ', newUserWord);

          } else if (userWord.difficulty == 'hard' && newUserWord.optional.isLearned == true) {
            newUserWord.difficulty = 'easy';
            newUserWord.optional.progressBar = 5; // необязательно ?
            newUserWord.optional.progressBarSize = 5;
            newUserWord.optional.isNew = false;
            console.log('userWord.difficulty == hard && newUserWord.isLearned == true ---- ', newUserWord);

          } else if (userWord.optional.progressBarSize == 3 && newUserWord.optional.isLearned == false) {
            newUserWord.optional.progressBarSize = 3;
            newUserWord.optional.progressBar = 0; // необязательно ?
            newUserWord.difficulty = 'easy';
            newUserWord.optional.isNew = ((newUserWord.optional.meetingCounter as number) <= 3) && (newUserWord.optional.meetingCounter !== 0);
            console.log('userWord.progressBarSize == 3 && newUserWord.isLearned == false ---- ', newUserWord);

          } else if (userWord.optional.progressBarSize == 5 && newUserWord.optional.isLearned == false) {
            newUserWord.optional.progressBarSize = 5;
            newUserWord.optional.progressBar = 0; // необязательно ?
            newUserWord.difficulty = 'hard';
            newUserWord.optional.isNew = ((newUserWord.optional.meetingCounter as number) <= 3) && (newUserWord.optional.meetingCounter !== 0);
            console.log('userWord.progressBarSize == 5 && newUserWord.isLearned == false ---- ', newUserWord);
          }
          console.log(newUserWord);
          await UserWordsApi.updateUserWord(ID, newUserWord);
        }
      }
    } catch(error) {
    throw new Error((error as Error).message)
  }
}

  static async calcNewWords(idArray: string[]): Promise < number > {
  let newWordsCounter = 0
    try {
    const response = await UserWordsApi.getUserWords();

    if(response.status !== 200) {
  throw new Error(`calcNewWords response.status is --- ${response.status}`)
}

const userWordsArray: ServerUserWord[] = response.body
for (const ID of idArray) {
  const userWord: ServerUserWord | undefined = userWordsArray.find((userWord) => ID === userWord.wordId)
  if (
    userWord &&
    (
      userWord.optional?.isNew ||
      (!userWord.optional?.isNew && userWord.optional?.meetingCounter > 3)
    )
  ) {
    continue
  }
  newWordsCounter++
}
    } catch (error) {

  throw new Error((error as Error).message)
}
return newWordsCounter
  }

  static calcBestStreak(data: boolean[]): number {
  let bestStreak = 0
  data.reduce((streak, item) => {
    if (item) {
      streak++
      bestStreak = streak > bestStreak ? streak : bestStreak
    } else {
      streak = 0
    }
    return streak
  }, 0)
  return bestStreak
}

  static calcAccuracy(data: boolean[]): number {
  const totalCount = data.length
  if (totalCount === 0) {
    return totalCount
  }
  const correctCount = data.reduce((counter, item) => (item ? ++counter : counter), 0)
  return +((correctCount / totalCount) * 100).toFixed()
}
}