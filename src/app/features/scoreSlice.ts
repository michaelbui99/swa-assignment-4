import { defineStore } from 'pinia'
import type { Game } from '../models/game'
import type { Score } from '../models/score'
import type { User } from '../models/user'
import { ref } from 'vue'

export const useScoreStore = defineStore('score', () => {

  const allScore = ref({userScore: [] as Score[], top10Score: [] as Score[]})

  function getTop3ScoresForUser(userId: number, scores: Score[]): Score[] {
    const userScores = scores.filter((score) => score.userId === userId)
    userScores.sort((a, b) => b.score - a.score)
    const top3Scores = userScores.slice(0, 3)

    return top3Scores
  }

  function top10Scores(scores: Score[]): Score[] {
    const sortedGames = scores.sort((a, b) => b.score - a.score)
    const top10Games = sortedGames.slice(0, 10)

    return top10Games
  }

  const gethighScores = async function highScores(
    allGames: Game[] | undefined,
    logedInUser: User | undefined
  ) {
    if (!allGames) {
      return { userScore: [], top10Score: [] }
    }
    let scoreList: Score[] = [];
    let finishedGames: Game[] = [];

    finishedGames = allGames.filter((game) => (game.completed = true))
    finishedGames.forEach((game) => {
      scoreList.push({
        userId: game.user,
        score: game.score,
        gameId: game.id
      })
    })
    let top10Score = top10Scores(scoreList)
    let userScore: Score[]
    if (logedInUser === undefined || logedInUser === null) {
      userScore = []
    }
    userScore = getTop3ScoresForUser(logedInUser!.id, scoreList)
    allScore.value = {userScore, top10Score}
    return { userScore, top10Score }
  }
  return { 
    allScore,
    gethighScores 
  }
})
