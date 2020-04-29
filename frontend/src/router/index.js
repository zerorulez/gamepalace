import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import NewPost from '../views/NewPost.vue'
import Post from '../views/Post.vue'
import NewReply from '../views/NewReply.vue'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/post/new',
    name: 'NewPost',
    component: NewPost
  },
  {
    path: '/post/:id',
    name: 'Post',
    component: Post
  },
  {
    path: '/post/:id/reply',
    name: 'NewReply',
    component: NewReply
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
