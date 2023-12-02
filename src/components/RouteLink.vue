<script setup lang="ts">
import { defineProps } from 'vue'
import { useRouter } from 'vue-router'
import { type RouteLinkType } from '@/components/NavigationBar.vue'

const props = defineProps<{
  link: RouteLinkType
}>()

const router = useRouter()

function handleClick() {
  router.push(props.link.route)
}
</script>

<template>
  <button class="btn btn-light" v-if="link.show" @click="handleClick()">{{ link.label }}</button>
</template>

<style>
.route-link {
  border-radius: 10px;
  padding: 0.25rem 0.5rem;
  transition: all 0.3s ease-in-out;
  &:hover {
    background-color: #222;
    color: aliceblue;
  }
}
</style>
