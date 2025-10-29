<script setup>

defineProps({
    'filteredTodos': Array,

})

const emit = defineEmits(['remove-todo'])

const removeTodo = (id) => {
    emit('remove-todo', id)
}


</script>

<template>

 <ul class="todo-list">
    <li 
      v-for="todo in filteredTodos" 
      :key="todo.id"
      :class="['todo-item', { completed: todo.completed }]"
    >
      <input 
        type="checkbox" 
        v-model="todo.completed"
        class="todo-checkbox"
      >
      <span class="todo-text">{{ todo.text }}</span>
      <button @click="removeTodo(todo.id)" class="btn-delete">Delete</button>
    </li>
  </ul>

</template>

<style scoped>

.todo-list {
  list-style: none;
  max-height: 400px;
  overflow-y: auto;
}

.todo-list::-webkit-scrollbar {
  width: 6px;
}

.todo-list::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 10px;
}

.todo-list::-webkit-scrollbar-thumb {
  background: #667eea;
  border-radius: 10px;
}

.todo-item {
  background: #f9fafb;
  padding: 16px;
  margin-bottom: 10px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  gap: 14px;
  transition: all 0.3s ease;
  border: 2px solid transparent;
}

.todo-item:hover {
  background: #f3f4f6;
  border-color: #667eea;
  transform: translateX(4px);
}

.todo-item.completed {
  opacity: 0.6;
}

.todo-checkbox {
  width: 22px;
  height: 22px;
  cursor: pointer;
  accent-color: #667eea;
}

.todo-text {
  flex: 1;
  font-size: 15px;
  color: #1f2937;
  font-weight: 500;
}

.todo-item.completed .todo-text {
  text-decoration: line-through;
  color: #9ca3af;
}

.btn-delete {
  padding: 8px 16px;
  background: #ef4444;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 13px;
  font-weight: 600;
  transition: all 0.2s;
}

.btn-delete:hover {
  background: #dc2626;
  box-shadow: 0 2px 8px rgba(239, 68, 68, 0.3);
}
</style>