import { UserWordsApi } from "./api/UserWords_api";
import { UserWord } from "../models/UserWordsModels";

export class WordsService {

  static async updateDifficultWord(wordID: string, difficulty: string) {
    const response = await UserWordsApi.getUserWord(wordID);  
    //обработать ситуацию, когда сложное слово становится легким, а степень изучения 3-4-5
    const userWord: UserWord = response.body;
    const newWord = {
      difficulty: userWord.difficulty,
      optional: userWord.optional
    }
    await UserWordsApi.updateUserWord(wordID, newWord);
    // return await UserWordsApi.updateUserWord(wordID, newWord);
  }

  static async updateLearnedWord(wordID: string, isLearned: boolean, progressBar: number) {
    const response = await UserWordsApi.getUserWord(wordID);
    const userWord: UserWord = response.body;
    const newWord = {
      difficulty: userWord.difficulty,
      optional: {
        isLearned,
        progressBar,
        progressBarSize: userWord.optional.progressBarSize,
        isNew: userWord.optional.isNew,
        meetingCounter: userWord.optional.meetingCounter,
     }
    }
    await UserWordsApi.updateUserWord(wordID, newWord);
    //return await UserWordsApi.updateUserWord(wordID, newWord);
  }

  static async updateNewWord(wordID: string, isNew: boolean, meetingCounter: number) {
    const response = await UserWordsApi.getUserWord(wordID);
    const userWord: UserWord = response.body;
    const newWord = {
      difficulty: userWord.difficulty,
      optional: {
        isLearned: userWord.optional.isLearned,
        progressBar: userWord.optional.progressBar,
        progressBarSize: userWord.optional.progressBarSize,
        isNew,
        meetingCounter,
     }
    }
    await UserWordsApi.updateUserWord(wordID, newWord);
    //return await UserWordsApi.updateUserWord(wordID, newWord);
  }
}