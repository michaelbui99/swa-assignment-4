<script setup lang="ts">
import { useUserStore } from '@/app/features/userStore'
import { onMounted, ref } from 'vue'
import { storeToRefs } from 'pinia'
import { useRouter } from 'vue-router'
import { updateUser } from '@/api/user'
import PageLayout from '@/components/PageLayout.vue'
import UserCard from '@/components/UserCard.vue'
import UserStats from '@/components/UserStats.vue'
import GamesList from '@/components/GamesList.vue'

const router = useRouter()

const userStore = useUserStore()
const { currentUser } = storeToRefs(userStore)

const editing = ref(false)
const displayNameInput = ref(currentUser.value?.displayName ?? currentUser.value?.username)
const profileImageInput = ref(currentUser.value?.profileImageUrl)

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

const handleSave = async () => {
  if (!currentUser.value) {
    return
  }
  const defaultProfileImage =
    'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Default_pfp.svg/2048px-Default_pfp.svg.png'

  const updatedUser = await updateUser({
    ...currentUser.value,
    displayName: displayNameInput.value,
    profileImageUrl: profileImageInput.value
  })

  userStore.updateProfile(
    updatedUser.displayName ?? updatedUser.username,
    updatedUser.profileImageUrl ?? defaultProfileImage
  )
  editing.value = false
}
const handleEdit = () => {
  editing.value = true
}
</script>

<template>
  <page-layout>
    <div class="page-container" v-if="currentUser">
      <div class="w-20-percent">
        <div v-if="editing" class="layout">
          <button type="button" @click="handleSave()" class="btn btn-primary edit-btn">Save</button>
          <div class="form-group">
            <label for="displayNameInput">Display name</label>
            <input
              v-model="displayNameInput"
              type="text"
              class="form-control"
              id="displayNameInput"
              placeholder="Enter display name"
            />
          </div>
          <div class="form-group">
            <label for="profileImageInput">Profile Image URL</label>
            <input
              v-model="profileImageInput"
              type="text"
              class="form-control"
              id="profileImageInput"
              placeholder="Profile image URL"
            />
          </div>
        </div>
        <div v-else class="layout">
          <button type="button" @click="handleEdit()" class="btn btn-primary edit-btn">Edit</button>
          <user-card :user="currentUser"></user-card>
          <user-stats :games="currentUser.games"></user-stats>
          <games-list :games="currentUser.games"></games-list>
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
