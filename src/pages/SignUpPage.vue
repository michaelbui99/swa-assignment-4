<script setup lang="ts">
import { createUser } from '@/api/user'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/app/features/userStore'
import { ref, onMounted, computed } from 'vue'
import PageLayout from '@/components/PageLayout.vue'

const userStore = useUserStore()
const { currentUser } = userStore
const router = useRouter()

const userNameInput = ref('')
const passwordInput = ref('')

const usernameIsInvalid = computed(() => {
  return !userNameInput.value
})
const passwordIsInvalid = computed(() => {
  return passwordInput.value.length < 8
})

const handleUsernameChange = (e: any) => {
  userNameInput.value = e.currentTarget?.value
}

const handlePasswordChange = (e: any) => {
  passwordInput.value = e.currentTarget?.value
}

const handleSignUp = async () => {
  const newUser = await createUser(userNameInput.value, passwordInput.value)
  if (newUser) {
    router.push('/login')
  }
}

onMounted(() => {
  if (currentUser) {
    router.push('/login')
  }
})
</script>

<template>
  <page-layout>
    <div class="signup-form-container">
      <div class="signup-layout">
        <div class="form-group">
          <label for="usernameInput">Username</label>
          <input
            @change="handleUsernameChange($event)"
            type="text"
            class="form-control"
            id="usernameInput"
            placeholder="Enter username"
          />
          <small v-if="usernameIsInvalid" class="form-text text-danger"
            >Username cannot be empty!</small
          >
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
          <small v-if="passwordIsInvalid" class="form-text text-danger"
            >Password must have a length of at least 8!</small
          >
        </div>
        <button @click="handleSignUp()" class="btn btn-primary signup-btn">Sign up</button>
      </div>
    </div>
  </page-layout>
</template>

<style lang="scss">
.signup-form-container {
  height: calc(100vh - 4rem);
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.signup-layout {
  display: flex;
  flex-direction: column;
  max-width: 300px;
}
</style>
