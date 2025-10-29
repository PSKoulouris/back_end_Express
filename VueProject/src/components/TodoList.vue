<script setup>
import { ref, computed } from 'vue'
import InputSection from './InputSection.vue'
import FilterSection from './FilterSection.vue'
import StatsSection from './StatsSection.vue'
import TodoListItems from './TodoListItems.vue'
import EmptyState from './EmptyState.vue'


// Reactive state
//const newTodo = ref('')
const todos = ref([])
const currentFilter = ref('all')
const nextId = ref(1)

// Computed properties
const filteredTodos = computed(() => {
  if (currentFilter.value === 'active') {
    return todos.value.filter(todo => !todo.completed)
  } else if (currentFilter.value === 'completed') {
    return todos.value.filter(todo => todo.completed)
  }
  return todos.value
})

const totalTodos = computed(() => todos.value.length)

const activeTodosCount = computed(() => {
  return todos.value.filter(todo => !todo.completed).length
})

const completedTodosCount = computed(() => {
  return todos.value.filter(todo => todo.completed).length
})


// Methods
const addTodo = (text) => {

    todos.value.push({
      id: nextId.value++,
      text: text,
      completed: false
    })
  }



const removeTodo = (id) => {
  todos.value = todos.value.filter(todo => todo.id !== id)
}


const setFilter = (filterKey) => {
    currentFilter.value = filterKey
}

</script>

<template>
    
  <InputSection @add-todo="addTodo"/>

  <!-- Filter Section -->
  <FilterSection :current-filter="currentFilter" @set-filter="setFilter" />

  <!-- Stats Section -->
  <StatsSection v-if ="todos.length> 0"
    :total-todos="totalTodos"
    :active-todos-count="activeTodosCount"
    :completed-todos-count="completedTodosCount"
  />

  <!-- Todo List -->
 <TodoListItems v-if="filteredTodos.length > 0"
    :filtered-todos="filteredTodos"
    @remove-todo="removeTodo"
  
  />

  <!-- Empty State -->
 <EmptyState v-else
  :current-filter="currentFilter" 
 />

</template>



<style scoped>


</style>