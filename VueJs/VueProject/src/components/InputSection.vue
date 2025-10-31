<script setup>

import { ref } from 'vue'

const emit = defineEmits(['add-Todo'])

const newTodo = ref('')

const addTodo = () => {
    if(newTodo.value.trim()) {
        emit('add-Todo', newTodo.value.trim())
        newTodo.value = ''
    }
}
</script>


<template>
    <!-- Input Section -->
  <div class="input-section">
    <input 
      type="text" 
      v-model="newTodo" 
      @keyup.enter="addTodo"
      placeholder="What needs to be done?"
    >
    <button @click="addTodo" class="btn btn-primary">Add Todo</button>
  </div>

</template>



<style scoped>

.input-section {
  display: flex;
  gap: 12px;
  margin-bottom: 24px;
}

input[type="text"] {
  flex: 1;
  padding: 14px 16px;
  border: 2px solid #e5e7eb;
  border-radius: 10px;
  font-size: 15px;
  transition: all 0.2s;
  font-family: inherit;
}

input[type="text"]:focus {
  outline: none;
  border-color: #667eea;
  box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
}

.btn {
  padding: 14px 28px;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  font-size: 15px;
  font-weight: 600;
  transition: all 0.2s;
  font-family: inherit;
}

.btn-primary {
  background: #667eea;
  color: white;
}

.btn-primary:hover {
  background: #5568d3;
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(102, 126, 234, 0.4);
}

.btn-primary:active {
  transform: translateY(0);
}
</style>