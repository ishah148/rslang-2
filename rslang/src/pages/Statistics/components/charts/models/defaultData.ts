import { DailyStatsData } from "../../../../../models/StatsModels";

export const DailyStatsDataDefault:DailyStatsData = {
    "newWords": 0,
    "learnedWords": 0,
    "totalAccuracy": 0,
    "audioChallenge": {
        "newWords": 0,
        "accuracy": 0,
        "bestStreak": 0
    },
    "sprint": {
        "newWords": 0,
        "accuracy": 0,
        "bestStreak": 0
    }
}