import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'
import Profile from '../views/Profile.vue'
import UserProfile from '../views/UserProfile.vue'
import NewThread from '../views/NewThread.vue'
import Thread from '../views/Thread.vue'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/registrar',
    name: 'Register',
    component: Register
  },
  {
    path: '/perfil',
    name: 'Profile',
    component: Profile
  },
  {
    path: '/perfil/:id',
    name: 'UserProfile',
    component: UserProfile
  },
  {
    path: '/novo-topico',
    name: 'NewThread',
    component: NewThread
  },
  {
    path: '/topico/:id',
    name: 'Thread',
    component: Thread
  },
]

const router = new VueRouter({
  // mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
