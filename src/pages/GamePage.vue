<script setup lang="ts">
import { inject } from 'vue'
import { useUserStore } from '@/app/features/userStore'
import { useGameStore } from '@/app/features/gameSlice'
import { onMounted, ref } from 'vue'
import { storeToRefs } from 'pinia'
import { useRouter } from 'vue-router'
import PageLayout from '@/components/PageLayout.vue'
import { games } from '@/api/score'
import { createGame, updateGame } from '@/api/game'
import type { User } from '@/app/models/user'
import type { Game } from '@/app/models/game'

const router = useRouter()

const userStore = useUserStore()
const { currentUser } = storeToRefs(userStore)

const gameStore = useGameStore()
const { currentGame } = storeToRefs(gameStore)

const inputDisabled = ref(false)
const selectedCell = ref<{
  row: number
  col: number
} | null>(null)
const targetPiece = ref<{
  row: number
  col: number
} | null>(null)

const handleCellClick = async (row: number, col: number) => {
  if (!currentGame.value) {
    return
  }

  if (selectedCell.value) {
    if (currentGame.value.board.canMove(selectedCell.value, { row, col })) {
      gameStore.makeMove({ from: selectedCell.value, to: { row, col } })
      await updateGame(currentGame.value as Game, currentUser.value as User)
      selectedCell.value = null
    } else {
      selectedCell.value = null
    }
  } else {
    selectedCell.value = { row, col }
  }
}

const isMoving = (targetPiece: any, selectedCell: any, rowIndex: number, cellIndex: number) => {
  if (targetPiece?.row === rowIndex && targetPiece?.col === cellIndex) {
    if (selectedCell?.row === rowIndex - 1 && selectedCell?.col === cellIndex) {
      return 'moving-up'
    } else if (selectedCell?.row === rowIndex + 1 && selectedCell?.col === cellIndex) {
      return 'moving-down'
    } else if (selectedCell?.row === rowIndex && selectedCell?.col === cellIndex - 1) {
      return 'moving-left'
    } else if (selectedCell?.row === rowIndex && selectedCell?.col === cellIndex + 1) {
      return 'moving-right'
    }
  } else if (selectedCell?.row === rowIndex && selectedCell?.col === cellIndex) {
    if (targetPiece?.row === rowIndex - 1 && targetPiece?.col === cellIndex) {
      return 'moving-up'
    } else if (targetPiece?.row === rowIndex + 1 && targetPiece?.col === cellIndex) {
      return 'moving-down'
    } else if (targetPiece?.row === rowIndex && targetPiece?.col === cellIndex - 1) {
      return 'moving-left'
    } else if (targetPiece?.row === rowIndex && targetPiece?.col === cellIndex + 1) {
      return 'moving-right'
    }
  }
  return ''
}

userStore.$subscribe(async (_, state) => {
  if (!state.currentUser) {
    router.push('/login')
  } else {
    if (!currentGame.value) {
      const newGame = await createGame(currentUser.value as User)
      gameStore.startGame(newGame)
    }
  }
})

gameStore.$subscribe(async (_, state) => {
  if (state.currentGame && state.currentGame!.movesUsed >= 3) {
    gameStore.endGame()
    await updateGame(state.currentGame as Game, currentUser.value as User)
    gameStore.disposeGame()
    router.push('/scores')
  }
})

onMounted(async () => {
  if (!currentUser.value) {
    router.push('/login')
  }

  if (!currentGame.value) {
    if (!currentUser.value) {
      return
    }

    const newGame = await createGame(currentUser.value as User)
    gameStore.startGame(newGame)
    console.log(gameStore.currentGame)
  }
})
</script>

<template>
  <page-layout>
    <div>
      <h4 class="text-align-center">
        <strong>Score: {{ currentGame?.score ?? 'No game' }}</strong>
        <br />
        <strong>Moves used: {{ currentGame?.movesUsed ?? 'No game' }}</strong>
      </h4>
      <div v-if="currentGame">
        <div class="row" v-for="(row, rowIndex) in currentGame.board.board" :key="rowIndex">
          <div
            v-for="(cell, cellIndex) in row"
            @click="handleCellClick(rowIndex, cellIndex)"
            :aria-disabled="inputDisabled"
            :class="isMoving(targetPiece, selectedCell, rowIndex, cellIndex)"
            :style="{
              fontWeight:
                selectedCell?.row === rowIndex && selectedCell?.col === cellIndex
                  ? 'bold'
                  : 'normal',
              cursor: 'pointer',
              width: '50px',
              height: '50px',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center'
            }"
            :key="cellIndex"
          >
            {{ cell }}
          </div>
        </div>
      </div>
    </div>
  </page-layout>
</template>

<style lang="scss">
.text-align-center {
  text-align: center;
}

.row {
  display: flex;
  justify-content: center;
  align-items: center;
}

.cell {
  cursor: pointer;
  width: 50px;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.board-cell {
  box-shadow: 0px 0px 2px 0.5px gray;
}

@keyframes moveRight {
  from {
    transform: translateX(0);
  }
  to {
    transform: translateX(50px);
  } /* Adjust distance as needed */
}

@keyframes moveLeft {
  from {
    transform: translateX(0);
  }
  to {
    transform: translateX(-50px);
  } /* Adjust distance as needed */
}

@keyframes moveUp {
  from {
    transform: translateY(0);
  }
  to {
    transform: translateY(-50px);
  } /* Adjust distance as needed */
}

@keyframes moveDown {
  from {
    transform: translateY(0);
  }
  to {
    transform: translateY(50px);
  } /* Adjust distance as needed */
}

.moving-right {
  animation: moveRight 0.5s ease-in-out forwards;
}

.moving-left {
  animation: moveLeft 0.5s ease-in-out forwards;
}

.moving-up {
  animation: moveUp 0.5s ease-in-out forwards;
}

.moving-down {
  animation: moveDown 0.5s ease-in-out forwards;
}

@keyframes soap-bubble-pop {
  0% {
    transform: scale(1);
    opacity: 1;
  }
  50% {
    transform: scale(1.5);
    opacity: 0.5;
  }
  100% {
    transform: scale(0);
    opacity: 0;
  }
}

.soap-bubble {
  /* width: 50px;
        height: 50px;
        border-radius: 50%;
        background-color: #fff;
        transform: translate(-50%, -50%); */
  animation: soap-bubble-pop 0.4s ease-out forwards;
}
</style>
