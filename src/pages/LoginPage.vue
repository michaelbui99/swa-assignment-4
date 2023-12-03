<script setup lang="ts">
import { loginUser } from '@/api/user'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/app/features/userStore'
import { ref, onMounted, computed } from 'vue'
import PageLayout from '@/components/PageLayout.vue'

const userStore = useUserStore()
const { currentUser } = userStore
const router = useRouter()

const userNameInput = ref('')
const passwordInput = ref('')
const invalidCredentials = ref(false)
const serverUnavailable = ref(false)

const handleUsernameChange = (e: any) => {
  userNameInput.value = e.currentTarget?.value
}

const handlePasswordChange = (e: any) => {
  passwordInput.value = e.currentTarget?.value
}

const handleLogin = async () => {
  try {
    const user = await loginUser({ username: userNameInput.value, password: passwordInput.value })

    if (!user) {
      invalidCredentials.value = true
      return
    }

    userStore.currentUser = user
  } catch (err) {
    serverUnavailable.value = true
  }
}

onMounted(() => {
  if (currentUser) {
    router.push('/')
  }
})

userStore.$subscribe((_, state) => {
  if (state.currentUser) {
    router.push('/')
  }
})
</script>

<template>
  <page-layout>
    <div class="login-form-container">
      <div class="login-layout">
        <div class="form-group">
          <label for="usernameInput">Username</label>
          <input
            @change="handleUsernameChange($event)"
            type="text"
            class="form-control"
            id="usernameInput"
            placeholder="Enter username"
          />
        </div>
        <div class="form-group">
          <label for="passwordInput">Password</label>
          <input
            @change="handlePasswordChange($event)"
            type="password"
            class="form-control"
            id="passwordInput"
            placeholder="Password"
          />
        </div>
        <small v-if="invalidCredentials" class="form-text text-danger"
          >Username or password is invalid</small
        >
        <small v-if="serverUnavailable" class="form-text text-danger"
          >Unable to reach server...</small
        >
        <button @click="handleLogin()" class="btn btn-primary signup-btn">Login</button>
      </div>
    </div>
  </page-layout>
</template>

<style lang="scss">
.login-form-container {
  height: calc(100vh - 4rem);
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.login-layout {
  display: flex;
  flex-direction: column;
  max-width: 300px;
}
</style>
