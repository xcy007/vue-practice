<template>
  <div class="button-page">
    <button @click="send" class="todo-button">{{ props.text }}</button>
  </div>
</template>

<script setup>
import {defineProps,defineEmits} from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const props = defineProps(['text'])
const emit = defineEmits(['ok'])
function send(){
  emit('ok','hello')
  router.push('/todo')
}


</script>

<style scoped>
.button-page {
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: linear-gradient(160deg, #4f46e5 0%, #7c3aed 40%, #6366f1 100%);
}

.todo-button {
  --primary: #6366f1;
  --primary-dark: #4f46e5;
  --radius: 14px;

  padding: 18px 48px;
  font-size: 20px;
  font-weight: 600;
  color: #ffffff;
  background: linear-gradient(135deg, var(--primary) 0%, var(--primary-dark) 100%);
  border: none;
  border-radius: var(--radius);
  cursor: pointer;
  transition: transform 0.15s, box-shadow 0.2s;
  white-space: nowrap;
  box-shadow: 0 10px 30px rgba(99, 102, 241, 0.4);
}

.todo-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 14px 36px rgba(99, 102, 241, 0.5);
}

.todo-button:active {
  transform: translateY(0);
}
</style>