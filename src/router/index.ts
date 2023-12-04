import { createRouter, createWebHistory } from 'vue-router'
import IndexPage from '@/pages/IndexPage.vue'
import SignUpPage from '@/pages/SignUpPage.vue'
import LoginPage from '@/pages/LoginPage.vue'
import ProfilePage from '@/pages/ProfilePage.vue'
import ScorePage from '@/pages/ScorePage.vue'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: IndexPage
    },
    {
      path: '/signup',
      name: 'sign up ',
      component: SignUpPage
    },
    {
      path: '/login',
      name: 'login',
      component: LoginPage
    },
    {
      path: '/scores',
      name: 'scores',
      component: ScorePage
    },
    {
      path: '/profile',
      name: 'profile',
      component: ProfilePage
    }
  ]
})

export default router
