<template>
  <div v-if="route.path === '/'">
    <Button text="点我进入Todo List" @ok="handleOk" />
  </div>
  <router-view v-else />
</template>

<script setup>
import { useRoute } from 'vue-router'
import Button from './components/Button.vue'

const route = useRoute()

function handleOk(data) {
  console.log('收到子组件事件：', data)
}
</script>

<style scoped>
</style>
