import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import { gethighScores } from './api/score'
import { createUser } from './api/user'

const app = createApp(App)
app.use(createPinia())
app.use(router)

app.mount('#app')
