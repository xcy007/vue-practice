import { defineStore } from 'pinia'
import { login, getinfo } from '@/api/manager.js'
import { setToken } from '@/composables/auth.js'

export const useUserStore = defineStore('user', {
  state: () => ({
    //用户信息
    user: {}
  }),
  actions: {
    //登录
    login({ username, password }) {
      return login(username, password).then(res => {
        //存储token
        setToken(res.token)
        return res
      })
    },
    //获取当前用户信息
    getinfo() {
      return getinfo().then(res => {
        this.user = res
        return res
      })
    }
  }
})
