<script setup lang="ts">
import type { User } from '@/app/models/user'
import { ref, defineProps, computed } from 'vue'
import UserStatistic from './UserStatistic.vue'
import type { Game } from '@/app/models/game'

const props = defineProps<{
  games: Game[]
}>()

const gamesPlayed = computed(() => {
  return {
    title: 'Games played',
    value: props.games.length
  }
})

const gamesCompleted = computed(() => {
  return {
    title: 'Games completed',
    value: props.games.filter((game) => game.completed).length
  }
})

const highestScore = computed(() => {
  return {
    title: 'Highest score',
    value: props.games.map((game) => game.score).sort((a, b) => b - a)[0] ?? 0
  }
})
</script>

<template>
  <div class="stats-container">
    <user-statistic :statistic="gamesPlayed"></user-statistic>
    <user-statistic :statistic="gamesCompleted"></user-statistic>
    <user-statistic :statistic="highestScore"></user-statistic>
  </div>
</template>

<style lang="scss">
.stats-container {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 100%;
  column-gap: 2rem;
}
</style>
