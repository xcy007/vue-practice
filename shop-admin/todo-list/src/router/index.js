import { createRouter, createWebHistory } from 'vue-router'
import Button from '../components/Button.vue' 
import Body from '@/components/Body.vue'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Button',
      component: Button,
      props: { text: '点我进入 Todo List' } 
    },
    {
      path: '/todo',
      name: 'Todo',
      component: Body
    }
  ],
})

export default router
