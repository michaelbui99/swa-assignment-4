<script setup lang="ts">
import type { User } from '@/app/models/user'
import { ref, defineProps } from 'vue'

const props = defineProps<{
  user: User
}>()

const defaultProfileImage =
  'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Default_pfp.svg/2048px-Default_pfp.svg.png'
</script>

<template>
  <div class="card-container">
    <img class="profile-img" :src="user.profileImageUrl ?? defaultProfileImage" />
    <h2 class="display-name">{{ user.displayName ?? user.username }}</h2>
    <p class="user-tag">#{{ user.username }}</p>
  </div>
</template>

<style lang="scss">
.card-container {
  width: 20%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.profile-img {
  max-height: 150px;
  max-width: 150px;
}

.display-name {
  font-weight: bold;
  text-align: center;
  font-size: x-large;
}

.user-tag {
  font-size: medium;
  color: #d8dee9;
  text-align: center;
  font-style: italic;
  transition: all 0.3s ease-in-out;
  &:hover {
    color: #222;
    cursor: default;
  }
}
</style>
