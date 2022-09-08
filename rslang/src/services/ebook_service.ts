import { StatsUpdateObject } from "../models/StatsModels";
import { ServerUserWord, UserWord } from "../models/UserWordsModels";
import { WordsApi } from "./api";
import { getAggregatedWordsResponse, UserAggregatedWordsApi } from "./api/AggregatedWords";
import { UserWordsApi } from "./api/UserWords_api";
import { IWord } from "./api_types";
import { StatsService } from "./stats_service";

export class EBookService {

  static async updateDifficultWords(wordID: string): Promise<ServerUserWord> {

    const newUserWord: UserWord = {
      difficulty: null,
      optional: {
        isLearned: null,
        progressBar: null,
        progressBarSize: null,
        isNew: null,
        meetingCounter: null,
      }
    }

    const statsUpdateObject: StatsUpdateObject = {
      newLearnedWords: 0,
    }

    let result: ServerUserWord | null = null;

    try {
      const response = await UserWordsApi.getUserWord(wordID);

      if (response.status === 200) {
        const userWord: ServerUserWord = response.body;

        if (userWord.difficulty === 'hard') {
          newUserWord.difficulty = 'easy';
          newUserWord.optional.progressBarSize = 3;
          newUserWord.optional.progressBar = 0;
          newUserWord.optional.isLearned = false;
          newUserWord.optional.isNew = (userWord.optional.meetingCounter <= 5) && (userWord.optional.meetingCounter !== 0);
          newUserWord.optional.meetingCounter = userWord.optional.meetingCounter;
        } else if (userWord.difficulty === 'easy') {
          newUserWord.difficulty = 'hard';
          newUserWord.optional.progressBarSize = 5;
          newUserWord.optional.progressBar = 0;
          if (userWord.optional.isLearned === true) {
            statsUpdateObject.newLearnedWords -= 1;
          }
          newUserWord.optional.isLearned = false;
          newUserWord.optional.isNew = (userWord.optional.meetingCounter <= 5) && (userWord.optional.meetingCounter !== 0);
          newUserWord.optional.meetingCounter = userWord.optional.meetingCounter;
        }

        result = (await UserWordsApi.updateUserWord(wordID, newUserWord)).body;
      }

      if (response.status === 404) {
        newUserWord.difficulty = 'hard';
        newUserWord.optional.progressBarSize = 5;
        newUserWord.optional.progressBar = 0;
        newUserWord.optional.isLearned = false;
        newUserWord.optional.isNew = false;
        newUserWord.optional.meetingCounter = 0;
        result = (await UserWordsApi.createUserWord(wordID, newUserWord)).body;
      }

      if (response.status !== 200 && response.status !== 404) {
        throw new Error(`updateDifficultWords response.status is --- ${response.status}`);
      }
    } catch (error) {
      throw new Error((error as Error).message);
    }

    await StatsService.updateStatisticWithEBookData(statsUpdateObject);
    return result as ServerUserWord;
  }

  static async updateLearnedWord(wordID: string): Promise<ServerUserWord> {
    const newUserWord: UserWord = {
      difficulty: null,
      optional: {
        isLearned: null,
        progressBar: null,
        progressBarSize: null,
        isNew: null,
        meetingCounter: null,
      }
    }

    const statsUpdateObject: StatsUpdateObject = {
      newLearnedWords: 0,
    }

    let result: ServerUserWord | null = null;

    try {
      const response = await UserWordsApi.getUserWord(wordID);

      if (response.status === 200) {
        const userWord: ServerUserWord = response.body;

        if (userWord.optional.isLearned === true) {
          newUserWord.optional.isLearned = false;
          newUserWord.optional.isNew = (userWord.optional.meetingCounter <= 5) && (userWord.optional.meetingCounter !== 0);
          newUserWord.optional.meetingCounter = userWord.optional.meetingCounter;
          newUserWord.optional.progressBarSize = 3;
          newUserWord.difficulty = 'easy';
          newUserWord.optional.progressBar = 0;
          statsUpdateObject.newLearnedWords -= 1;
        } else if (userWord.optional.isLearned === false) {
          newUserWord.optional.isLearned = true;
          newUserWord.optional.isNew = false;
          newUserWord.optional.meetingCounter = userWord.optional.meetingCounter;
          newUserWord.optional.progressBar = userWord.difficulty === 'hard' ? 5 : 3;
          newUserWord.optional.progressBarSize = userWord.difficulty === 'hard' ? 5 : 3;
          newUserWord.difficulty = 'easy';
          statsUpdateObject.newLearnedWords += 1;
        }

        result = (await UserWordsApi.updateUserWord(wordID, newUserWord)).body;
      }

      if (response.status === 404) {
        newUserWord.optional.isLearned = true;
        newUserWord.optional.isNew = false;
        newUserWord.optional.meetingCounter = 0;
        newUserWord.difficulty = 'easy';
        newUserWord.optional.progressBar = 3;
        newUserWord.optional.progressBarSize = 3;
        statsUpdateObject.newLearnedWords += 1;

        result = (await UserWordsApi.createUserWord(wordID, newUserWord)).body;
      }

      if (response.status !== 200 && response.status !== 404) {
        throw new Error(`updateLearnedWord response.status is --- ${response.status}`);
      }
    } catch (error) {
      throw new Error((error as Error).message);
    }

    await StatsService.updateStatisticWithEBookData(statsUpdateObject);
    return result as ServerUserWord;
  }

  static async checkStatusOfPage(chapter: number, page: number): Promise<boolean> {
    let isPageLearned = true;
    console.log(`Chapter ${chapter}  Page ${page}`);
    try {
      const getWordsResponse = await WordsApi.getWords(page, chapter);
      if (getWordsResponse.status !== 200) {
        throw new Error(`checkStatusOfPage WordsApi.getWords response.status is --- ${getWordsResponse.status}`);
      }
      const words: IWord[] = getWordsResponse.data;
      console.log('WORDS', words);

      const getHardAggregatedWordsResponse: getAggregatedWordsResponse = await UserAggregatedWordsApi.getHardUserAggregatedWords();
      if (getHardAggregatedWordsResponse.status !== 200) {
        throw new Error(`checkStatusOfPage getHardAggregatedWordsResponse response.status is --- ${getHardAggregatedWordsResponse.status}`);
      }
      const userDifficultWords = getHardAggregatedWordsResponse.body[0].paginatedResults;
      console.log('DIFFICULT WORDS', userDifficultWords);

      const getLearnedAggregatedWordsResponse: getAggregatedWordsResponse = await UserAggregatedWordsApi.getLearnedUserAgregatedWords();
      if (getHardAggregatedWordsResponse.status !== 200) {
        throw new Error(`checkStatusOfPage getLearnedAggregatedWordsResponse response.status is --- ${getLearnedAggregatedWordsResponse.status}`);
      }
      const userLearnedWords = getLearnedAggregatedWordsResponse.body[0].paginatedResults;
      console.log('LEARNED WORDS', userLearnedWords);

      for (const word of words) {
        const isLearned = userLearnedWords.find((learnedWord) => learnedWord._id === word.id )

        const isDifficult = userDifficultWords.find((difficultWord) => difficultWord._id === word.id)

        console.log(`isLearned --- ${isLearned} isDifficult ---- ${isDifficult}`);
        if(!isLearned && !isDifficult) {
          isPageLearned = false;
          break;
        }
      }
    } catch (error) {

      throw new Error((error as Error).message)
    }

    console.log(isPageLearned)
    return isPageLearned;
  }
}