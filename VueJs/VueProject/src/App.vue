<script setup>
  import TodoList from './components/TodoList.vue'
</script>

<template>
  <div class="app-header">
    <h1>📝 Vue.js Todo List</h1>
    <p class="subtitle">Pure Vue 3 Composition API - Create Vue Structure</p>
  </div>
  
  <TodoList />
</template>



<style scoped>
.app-header {
  margin-bottom: 30px;
}

h1 {
  color: #667eea;
  font-size: 32px;
  margin-bottom: 8px;
  font-weight: 700;
}

.subtitle {
  color: #6b7280;
  font-size: 14px;
}
</style>