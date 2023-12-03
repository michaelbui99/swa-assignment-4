<script setup lang="ts">
import type { Game } from '@/app/models/game'
import { ref, defineProps } from 'vue'

const props = defineProps<{
  games: Game[]
}>()
</script>

<template>
  <div class="gameslist-container">
    <div v-for="game in props.games" :key="game.id" class="stack">
      <p>Game: {{ game.id }}</p>
      <p>Score: {{ game.score }}</p>
      <p>Completed: {{ game.completed ? 'Yes' : 'No' }}</p>
    </div>
  </div>
</template>

<style lang="scss">
.gameslist-container {
  justify-content: flex-start;
  flex-direction: column;
  align-items: center;
  row-gap: 2rem;
  width: 100%;
  text-align: center;
  height: 100%;
  margin-top: 2rem;
}

.stack {
  display: flex;
  flex-direction: column;
  margin-bottom: 2rem;
}
</style>
