<script setup lang="ts">
import type { User } from '@/app/models/user'
import { ref, defineProps } from 'vue'

const props = defineProps<{
  statistic: {
    title: string
    value: string | number
  }
}>()
</script>

<template>
  <div class="statistic-container">
    <h3 class="heading">{{ statistic.title }}</h3>
    <p class="stat">{{ statistic.value }}</p>
  </div>
</template>

<style lang="scss">
.statistic-container {
  width: 20%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.heading {
  text-align: center;
  font-size: x-large;
  font-weight: bold;
}
.stat {
  text-align: center;
}
</style>
