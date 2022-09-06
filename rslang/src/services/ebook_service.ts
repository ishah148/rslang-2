import { ServerUserWord, UserWord } from "../models/UserWordsModels";
import { UserWordsApi } from "./api/UserWords_api";


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
          newUserWord.optional.isNew =  (userWord.optional.meetingCounter <= 3) && (userWord.optional.meetingCounter !== 0);
          newUserWord.optional.meetingCounter = userWord.optional.meetingCounter;
        } else if (userWord.difficulty === 'easy') {
          newUserWord.difficulty = 'hard';
          newUserWord.optional.progressBarSize = 5;
          newUserWord.optional.progressBar = 0;
          newUserWord.optional.isLearned = false;
          newUserWord.optional.isNew =  (userWord.optional.meetingCounter <= 3) && (userWord.optional.meetingCounter !== 0);
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
    let result: ServerUserWord | null = null;

    try {
      const response = await UserWordsApi.getUserWord(wordID);

      if (response.status === 200) {
        const userWord: ServerUserWord = response.body;

        if (userWord.optional.isLearned === true) {
          newUserWord.optional.isLearned = false;
          newUserWord.optional.isNew = (userWord.optional.meetingCounter <= 3) && (userWord.optional.meetingCounter !== 0);
          newUserWord.optional.meetingCounter = userWord.optional.meetingCounter;
          newUserWord.optional.progressBarSize = 3;
          newUserWord.difficulty = 'easy';
          newUserWord.optional.progressBar = 0;
        } else if (userWord.optional.isLearned === false) {
          newUserWord.optional.isLearned = true;
          newUserWord.optional.isNew = false;
          newUserWord.optional.meetingCounter = userWord.optional.meetingCounter;
          newUserWord.optional.progressBar = userWord.difficulty === 'hard' ? 5 : 3;
          newUserWord.optional.progressBarSize = userWord.difficulty === 'hard' ? 5 : 3;
          newUserWord.difficulty = 'easy';
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
        result = (await UserWordsApi.createUserWord(wordID, newUserWord)).body;
      }

      if (response.status !== 200 && response.status !== 404) {
        throw new Error(`updateLearnedWord response.status is --- ${response.status}`);
      }
    } catch (error) {
      throw new Error((error as Error).message);
    }

    return result as ServerUserWord;
  }
}