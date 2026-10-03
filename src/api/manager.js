import axios from '@/axios.js'

//登录接口
export function login(username,password){
    return axios.post('/admin/login',{
        username,
        password
    })
}

//获取当前用户信息接口
export function getinfo(){
    return axios.get('/admin/getinfo')
}