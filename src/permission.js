import router from './router'
import { getToken } from '@/composables/auth.js'
import { toast } from '@/composables/util.js'
import { useUserStore } from '@/stores'

//全局前置守卫

router.beforeEach(async (to, from, next) => {

//   console.log("全局前置守卫")
    const token = getToken()

    if(!token && to.path !== '/login'){//如果你没有登陆并且你去的不是登录页

        toast("请先登录", 'error')
        return next({path: '/login'})//跳转到登录页

    }

    //防止重复登录
    if(token && to.path === '/login'){//如果你已经登录了并且你去的是登录页
        toast("你已经登录了", 'warning')
        return next({path: from.path ? from.path : '/'})//跳转到上一个页面，如果没有上一个页面就跳转到首页
    }

    //如果用户登陆了，自动获取用户信息，并存储在pinia中
    if(token){
        await useUserStore().getinfo()
    }
    
    next()
})