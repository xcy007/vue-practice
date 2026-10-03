import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/pages/Home.vue'
import Login from '@/pages/Login.vue'
import NotFound from '@/pages/404.vue'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path:'/login',
      name:'login',
      component:Login
    },
    { path: '/:pathMatch(.*)*', 
      name: 'NotFound', 
      component: NotFound 
    },
  ],
})

export default router
