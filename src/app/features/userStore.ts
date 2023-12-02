import { ref, reactive, computed } from 'vue'
import { defineStore } from 'pinia'
import type { User } from '../models/user'

type UserState = User | undefined

export const useUserStore = defineStore('userStore', () => {
  const currentUser = ref(undefined as UserState)

  function loginUser(user: User) {
    currentUser.value = user
  }

  function logoutUser() {
    currentUser.value = undefined
  }

  return {
    currentUser,
    loginUser,
    logoutUser
  }
})
