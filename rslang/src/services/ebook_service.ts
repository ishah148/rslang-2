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
    try {
      const response = await UserWordsApi.getUserWord(wordID);

      if (response.status === 200) {
        const userWord: ServerUserWord = response.body;

        if (userWord.difficulty === 'hard') {
          newUserWord.difficulty = 'easy';
          newUserWord.optional.progressBarSize = 3;
          newUserWord.optional.progressBar = userWord.optional.progressBar > 3 ? 3 : userWord.optional.progressBar;
          newUserWord.optional.isLearned = userWord.optional.progressBar === 3;
          if (newUserWord.optional.isLearned) {
            newUserWord.optional.isNew = false;
          } else {
            newUserWord.optional.isNew = userWord.optional.meetingCounter < 3;
          }
          newUserWord.optional.meetingCounter = userWord.optional.meetingCounter;
        } else if (userWord.difficulty === 'easy') {
          newUserWord.difficulty = 'hard';
          newUserWord.optional.progressBarSize = 5;
          newUserWord.optional.progressBar = userWord.optional.progressBar;
          newUserWord.optional.isLearned = false;
          newUserWord.optional.isNew = userWord.optional.meetingCounter < 3;
          newUserWord.optional.meetingCounter = userWord.optional.meetingCounter;
        }
        return (await UserWordsApi.updateUserWord(wordID, newUserWord)).body;
      }

      if (response.status === 404) {
        newUserWord.difficulty = 'hard';
        newUserWord.optional.progressBarSize = 5;
        newUserWord.optional.progressBar = 0;
        newUserWord.optional.isLearned = false;
        newUserWord.optional.isNew = true;
        newUserWord.optional.meetingCounter = 0;
      }
      
      if (response.status !== 200 && response.status !== 404) {
        throw new Error(`updateDifficultWords response.status is --- ${response.status}`);
      }
    } catch (error) {
      throw new Error((error as Error).message);
    }
    
    return (await UserWordsApi.createUserWord(wordID, newUserWord)).body;
  }
}
