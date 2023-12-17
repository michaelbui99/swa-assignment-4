import type { Board } from '@/game/board'

export type Game = {
  id: number
  user: number
  score: number
  completed: boolean
  movesUsed: number
  board: Board<string>
}
