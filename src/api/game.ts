import type { Game } from '@/app/models/game'
import type { User } from '@/app/models/user'
import { Board } from '@/game/board'
import { RandomGenerator } from '@/game/random-generator'

export async function createGame(user: User): Promise<Game> {
  const baseUrl = 'http://localhost:9090'
  const endpoint = `${baseUrl}/games?token=${user.token}`
  const response = await fetch(endpoint, {
    method: 'POST'
  })

  const newGame = (await response.json()) as Game

  return {
    ...newGame,
    movesUsed: 0,
    board: new Board(new RandomGenerator(), 5, 5)
  }
}

export async function updateGame(game: Game, user: User): Promise<Game> {
  const baseUrl = 'http://localhost:9090'
  const endpoint = `${baseUrl}/games/${game.id}?token=${user.token}`

  const response = await fetch(endpoint, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(game)
  })

  return game
}
