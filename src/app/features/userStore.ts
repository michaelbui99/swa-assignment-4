import { ref, reactive, computed } from 'vue'
import { defineStore } from 'pinia'
import type { User } from '../models/user'

type UserState = User | undefined

export const userStore = defineStore('userStore', () => {
  const userState = ref(undefined as UserState)

  function loginUser(user: User) {
    userState.value = user
  }

  function logoutUser() {
    userState.value = undefined
  }
})
