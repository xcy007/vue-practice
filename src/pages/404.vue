<template>
    <div>
        <el-result
        icon="warning"
        title="404"
        sub-title="你找的页面不存在"
      >
        <template #extra>
          <el-button type="primary" @click="goHome">回到首页</el-button>
        </template>
      </el-result>
    </div>
</template>

<script setup> 
import { useRouter } from 'vue-router'
const router = useRouter()
function goHome(){
    router.push({name:'home'})
}
</script>