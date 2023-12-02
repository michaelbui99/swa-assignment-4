<script setup lang="ts">
import NavigationBar from '@/components/NavigationBar.vue'
import { type RouteLinkType } from '@/components/NavigationBar.vue'
import { useUserStore } from '@/app/features/userStore'

const userStore = useUserStore()
const { currentUser } = userStore

const routeLinks = [
  {
    label: 'Login',
    route: '/login',
    show: currentUser ? false : true
  },
  {
    label: 'Sign Up',
    route: '/signup',
    show: currentUser ? false : true
  },
  {
    label: 'Profile',
    route: '/profile',
    show: currentUser ? true : false
  },
  {
    label: 'Score',
    route: '/scores',
    show: currentUser ? true : false
  },
  {
    label: 'New Game',
    route: '/game',
    show: currentUser ? true : false
  }
] as RouteLinkType[]
</script>

<template>
  <div class="stack">
    <navigation-bar :route-links="routeLinks"></navigation-bar>
    <div class="page">
      <slot></slot>
    </div>
  </div>
</template>

<style lang="scss">
.stack {
  display: flex;
  flex-direction: column;
}

.page {
  padding: 0rem 4rem;
}
</style>
