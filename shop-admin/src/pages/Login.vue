<template>
    <el-row class="login-container">
        <el-col :lg="16" :md="12" class="left">
            <div>
                <div class="lchild1">欢迎光临</div>
                <div class="lchild2">基于vue3和element-plus的商城后台管理系统</div>
            </div>
        </el-col>
        <el-col :lg="8" :md="12" class="right">
            <h2 class="rchild1">欢迎回来</h2>
            <div class="rchild2">
                <sapn calss="h-[1px] w-16 bg-gray-200">---</sapn>
                <span>账号密码登录</span>
                <span calss="h-[1px] w-16 bg-gray-200">---</span>
            </div>
            <el-form ref="formRef" :rules="rules" :model="form" class="w-[250px]">
                <el-form-item prop="username">
                    <el-input v-model="form.username" placeholder="请输入用户名">
                         <template #prefix>
                            <el-icon><User /></el-icon>
                        </template>
                    </el-input>
                </el-form-item>
                <el-form-item prop="password">
                    <el-input v-model="form.password" type="password" show-password placeholder="请输入密码">
                        <template #prefix>
                            <el-icon><Lock /></el-icon>
                        </template>
                    </el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" class="w-[250px]" round color="#626aef" @click="onSubmit" :loading="loading">登录</el-button>
                </el-form-item>
            </el-form>
        </el-col>
    </el-row>
</template>
<script setup>
import { reactive,ref,onMounted,onBeforeUnmount } from 'vue'
import {useRouter} from 'vue-router'
import { useUserStore } from '@/stores'
import { toast } from '@/composables/util.js'


const router = useRouter()
const store = useUserStore()

// do not use same name with ref
const form = reactive({
    username:"",
    password:""
})
const rules = {
    username:[
         { 
            required: true, 
            message: '用户名不能为空', 
            trigger: 'blur' //触发时机是失去焦点的时候
        }
    ],
    password:[
        { 
            required: true, 
            message: '密码不能为空', 
            trigger: 'blur' //触发时机是失去焦点的时候
        }
    ]
}

const formRef = ref(null)
const loading = ref(false)
const onSubmit = () => {
   formRef.value.validate((valid) => {
       if(!valid){
        return false
       }
        //    console.log("验证通过！")
        loading.value = true

        store.login(form).then(res=>{
            toast("登录成功")
            router.push('/')
        }).finally(()=>{
            loading.value = false
        })
        
   })
}

//监听回车事件
function onKeyUp(e){
    if(e.key === "Enter"){
        onSubmit()
    }
}

//页面加载完毕之后去调用注册事件
onMounted(()=>{
    document.addEventListener('keyup', onKeyUp)
})
//页面卸载之前去注销事件
onBeforeUnmount(()=>{
    document.removeEventListener('keyup', onKeyUp)
})

</script>


<style scoped>
.login-container{
    @apply min-h-screen bg-indigo-500;
}
.login-container .left,.login-container .right{
     @apply flex items-center justify-center;
}
.login-container .right{
    @apply bg-light-50  flex-col;
}
.login-container .left .lchild1{
    @apply font-bold text-5xl text-light-50 mb-4;
}
.login-container .left .lchild2{
    @apply text-light-50;
}
.login-container .right .rchild1{
    @apply font-bold text-3xl text-gray-800;
}
.login-container .right .rchild2{
    @apply flex items-center justify-center my-5 text-gray-300 space-x-2;
}
</style>