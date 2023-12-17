import { ref, reactive, computed } from 'vue'
import { defineStore } from 'pinia'
import type { User } from '../models/user'
import type { Game } from '../models/game'
import type { Position } from '@/game/board'

type GameState = Game | undefined
export type Move = {
  from: Position
  to: Position
}

export const useGameStore = defineStore('gameStore', () => {
  const currentGame = ref(undefined as GameState)
  const MAX_MOVES_ALLOWED = 3

  function startGame(game: Game) {
    game.completed = false
    game.score = 0
    game.movesUsed = 0
    currentGame.value = game
    currentGame.value.board.addListener((event) => {
      if (event.kind === 'Match') {
        const baseScore = 1000
        let multiplier = 1
        if (event.match && event.match.positions) {
          multiplier = event.match.positions.length
        }

        currentGame.value!.score = baseScore * multiplier
      }
    })
  }

  function makeMove(move: Move) {
    if (!currentGame.value || currentGame.value.movesUsed >= MAX_MOVES_ALLOWED) {
      return
    }

    currentGame.value.board.move(move.from, move.to)
    currentGame.value.movesUsed += 1
  }

  function endGame() {
    if (!currentGame.value) {
      return
    }

    currentGame.value.completed = true
  }

  function disposeGame() {
    if (!currentGame.value) {
      return
    }

    currentGame.value = undefined
  }

  return {
    currentGame,
    startGame,
    makeMove,
    endGame,
    disposeGame
  }
})
