<script setup lang="ts">
import { useUserStore } from '@/app/features/userStore'
import { onMounted, ref } from 'vue'
import { storeToRefs } from 'pinia'
import { useRouter } from 'vue-router'
import {} from '@/api/user'
import PageLayout from '@/components/PageLayout.vue'
import UserCard from '@/components/UserCard.vue'
import UserStats from '@/components/UserStats.vue'

const router = useRouter()

const userStore = useUserStore()
const { currentUser } = storeToRefs(userStore)

onMounted(() => {
  if (!currentUser.value) {
    router.push('/login')
  }
})

userStore.$subscribe((_, state) => {
  if (!state.currentUser) {
    router.push('/login')
  }
})
</script>

<template>
  <page-layout>
    <div class="page-container" v-if="currentUser">
      <div class="w-20-percent">
        <div class="layout">
          <button class="btn btn-primary edit-btn">Edit</button>
          <user-card :user="currentUser"></user-card>
          <user-stats :games="currentUser.games"></user-stats>
        </div>
      </div>
    </div>
  </page-layout>
</template>

<style lang="scss">
.page-container {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
}

.layout {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 4rem;
  height: 100%;
  width: 100%;
}

.edit-btn {
  margin-left: auto;
  transition: all 0.3s ease-in-out;
  &:hover {
    cursor: pointer;
    color: #d8dee9;
  }
}

.w-20-percent {
  width: 20%;
}
</style>
