<script setup lang="ts">
import { useUserStore } from '@/app/features/userStore'
import { useGameStore } from '@/app/features/gameSlice'
import { onMounted, ref } from 'vue'
import { storeToRefs } from 'pinia'
import { useRouter } from 'vue-router'
import { updateUser } from '@/api/user'
import PageLayout from '@/components/PageLayout.vue'
import UserCard from '@/components/UserCard.vue'
import UserStats from '@/components/UserStats.vue'
import GamesList from '@/components/GamesList.vue'
import { games } from '@/api/score'

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

const handleCellClick = (row: number, col: number) => {
  if (!currentGame.value) {
    return
  }

  if (selectedCell.value) {
    if (currentGame.value.board.canMove(selectedCell.value, { row, col })) {
      gameStore.makeMove({ from: selectedCell.value, to: { row, col } })
    } else {
      selectedCell.value = null
    }
  } else {
    selectedCell.value = null
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

userStore.$subscribe((_, state) => {
  if (!state.currentUser) {
    router.push('/login')
  }
})

onMounted(() => {
  if (!currentUser.value) {
    router.push('/login')
  }
})
</script>

<template>
  <page-layout> </page-layout>
</template>

<style lang="scss"></style>
