<template>
  <div class="todo-app">
    <div class="card">
      <!-- 表头 -->
      <div class="title">Todo List</div>

      <!-- 输入框和添加按钮 -->
      <div class="todo-form">
        <input 
        v-model="str" 
        type="text" 
        class="todo-input" 
        placeholder="Add a todo"/>
        <button @click="add" class="todo-button" >Add Todo</button>
      </div>

      <!-- 待办事项列表 -->
      <div v-for="(item,index) in list" 
      :class="[item.isComplete ? 'completed' : 'item']">
        <div class="item-left">
          <input v-model="item.isComplete" type="checkbox"/>
          <span class="name">{{ item.text }}</span>
        </div>

        <span @click="del(index)" class="del">del</span>
        
      </div>
    </div>
  </div>
</template>

<script setup>
import {ref} from 'vue'

const str=ref({
  text:''
}) 
const list=ref([
  {
    isComplete: false,//标记是否被选中
    text: '上班'
  },
   {
    isComplete: false,
    text: '练车'
  },
   {
    isComplete: false,
    text: '学习'
  }
])

  function add(){
   
    list.value.push({
      isComplete:false,
      text:str.value
    })
    str.value = ''
  }
 
  function del(index){
    list.value.splice(index,1)
    //splice表示从index下标开始，删除一个元素
  }
</script>


<style scoped>
.todo-app {
  --primary: #6366f1;
  --primary-dark: #4f46e5;
  --bg-gradient: linear-gradient(160deg, #4f46e5 0%, #7c3aed 40%, #6366f1 100%);
  --card-bg: #ffffff;
  --text: #1f2937;
  --text-muted: #9ca3af;
  --border: #e5e7eb;
  --item-bg: #f9fafb;
  --danger: #ef4444;
  --radius: 14px;
  --shadow: 0 25px 50px rgba(0, 0, 0, 0.25);

  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: var(--bg-gradient);
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
  padding: 20px;
  box-sizing: border-box;
}

.card {
  width: 100%;
  max-width: 480px;
  background: var(--card-bg);
  border-radius: 20px;
  padding: 36px 28px;
  box-shadow: var(--shadow);
}

.title {
  text-align: center;
  font-size: 26px;
  font-weight: 700;
  color: var(--text);
  margin: 0 0 24px 0;
}

.todo-form {
  display: flex;
  gap: 10px;
  margin-bottom: 18px;
}

.todo-input {
  flex: 1;
  padding: 11px 14px;
  font-size: 14px;
  border: 1px solid var(--border);
  border-radius: var(--radius);
  outline: none;
  transition: border-color 0.2s, box-shadow 0.2s;
  background: #fafafa;
}

.todo-input::placeholder {
  color: var(--text-muted);
}

.todo-input:focus {
  border-color: var(--primary);
  box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.12);
  background: #ffffff;
}

.todo-button {
  padding: 11px 22px;
  font-size: 14px;
  font-weight: 600;
  color: #ffffff;
  background: linear-gradient(135deg, var(--primary) 0%, var(--primary-dark) 100%);
  border: none;
  border-radius: var(--radius);
  cursor: pointer;
  transition: transform 0.15s, box-shadow 0.2s;
  white-space: nowrap;
}

.todo-button:hover {
  transform: translateY(-1px);
  box-shadow: 0 8px 20px rgba(99, 102, 241, 0.35);
}

.todo-button:active {
  transform: translateY(0);
}

.item,
.completed {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  padding: 12px 14px;
  border-radius: var(--radius);
  margin-bottom: 8px;
  transition: background 0.2s;
}

.item {
  background: var(--item-bg);
}

.item:hover {
  background: #f3f4f6;
}

.item-left {
  display: flex;
  align-items: center;
  gap: 10px;
  flex: 1;
  min-width: 0;
}

.item-checkbox {
  width: 16px;
  height: 16px;
  accent-color: var(--primary);
  cursor: pointer;
}

.name {
  font-size: 14px;
  color: var(--text);
  line-height: 1.4;
  flex: 1;
}

.del {
  display: inline-flex;
  align-items: center;
  font-size: 13px;
  color: var(--danger);
  cursor: pointer;
  font-weight: 500;
  padding: 2px 6px;
  border-radius: 4px;
  transition: background 0.2s;
  line-height: 1.4;
  white-space: nowrap;
}

.completed {
  background: #dfe3e8;
  opacity: 1;
}

.completed:hover {
  background: #b5b8ba;
}

.completed .name {
  text-decoration: line-through;
  color: #888a91;
}

.completed .item-checkbox {
  accent-color: var(--primary);
}

.del:hover {
  background: rgba(239, 68, 68, 0.08);
}
</style>