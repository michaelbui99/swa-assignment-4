<script setup lang="ts">
import { defineProps } from 'vue'
import { useRouter } from 'vue-router'
import RouteLink from '@/components/RouteLink.vue'

export type RouteLinkType = {
  label: string
  route: string
  show: boolean
}

const props = defineProps<{ routeLinks: RouteLinkType[] }>()

const router = useRouter()

function navigateHome() {
  router.push('/')
}

console.log(props)
</script>

<template>
  <div class="navbar">
    <h1 class="logo" @click="navigateHome()">SWA Crush</h1>
    <div class="routes-container">
      <route-link v-for="link in props.routeLinks" :key="link.route" :link="link"></route-link>
    </div>
  </div>
</template>

<style lang="scss">
.navbar {
  display: flex;
  flex-direction: row;
  height: 4rem;
  background-color: #4c566a;
  align-items: center;
  padding: 0rem 4rem;
}

.logo {
  color: #d8dee9;
  transition: all 0.3s ease-in-out;
  &:hover {
    opacity: 0.8;
    color: #222;
    cursor: pointer;
  }
}

.routes-container {
  display: flex;
  flex-direction: row;
  column-gap: 1rem;
}
</style>
