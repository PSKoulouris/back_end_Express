<script setup>

import { ref } from 'vue'

const newTodo = ref('')
const todos = ref([])
const nextid = ref(1)


let totalTodos = ref(0)
let activeTodosCount = ref(0)
let completedTodosCount = ref(0)

const currentFilter = ref("All")

/*
structure of information in array:

{
    id: integer,
    text: string,
    completed: boolean (set to default false)
} */

function totalTodosCount() {
  return totalTodos.value = todos.value.length
}
function completedTodoCount() {
   const activeTodo = todos.value.filter(function (i) {
       return i.completed === true
   })

   completedTodosCount.value = activeTodo.length
}

function activeTodoCount() {
  const activeTodo = todos.value.filter(function(i) {
    return i.completed === false
  })

  activeTodosCount.value = activeTodo.length
}


//Add task to array:
const addTodo = () => {

    const information = {
        id: nextid.value++,
        text: newTodo.value,
        completed: false
    }

    todos.value.push(information)

    newTodo.value = ''
    console.log(todos.value)

    totalTodosCount()
    completedTodoCount()
    activeTodoCount()
}

//delete task from array:
const deleteItem = (id) => {

      const todoObject = todos.value.find(function (i) { //find requires a callbak function function(i){ i.text === "string"}
         return i.id === id
      }
    )
      console.log(todoObject)
      const index = todos.value.indexOf(todoObject)
      console.log(index)
      todos.value.splice(index,1)

      console.log(todos.value)

      totalTodos.value = todos.value.length

       totalTodosCount()
      completedTodoCount()
      activeTodoCount()
    }

  const updateItem =(id) => {

      const todoObject = todos.value.find(function (i) { //find requires a callbak function function(i){ i.text === "string"}const todoObject = todos.value.find(function (i) { //find requires a callbak function function(i){ i.text === "string"}
         return i.id === id
      }
    )
      todoObject.completed = !todoObject.completed

      console.log(todos.value)

      totalTodosCount()
      completedTodoCount()
      activeTodoCount()
  }

</script>

///////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////

<template>

  <div class = "input-section">
        <input type = "text" id = "todo" name = "todo" placeholder="Add task to do here" v-model="newTodo">
        <button class = "btn btn-primary" @click = "addTodo">Add</button>
  </div>

  <div class = "filter-section">
        <button @click= "currentFilter = 'All'" :class = "['filter-btn',{active:currentFilter ==='All'}]">All</button>
        <button @click= "currentFilter = 'Active'" :class = "['filter-btn',{active:currentFilter ==='Active'}]">Active</button>
        <button @click= "currentFilter = 'Completed'" :class = "['filter-btn',{active:currentFilter ==='Completed'}]">Completed</button>
  </div>

  <div class = "stats">
        <div class = "stat-item">
            <div class = "stat-label">TOTAL</div>
            <div class = "stat-value">{{ totalTodos }}</div>
        </div>
        <div class = "stat-item">
            <div class = "stat-label">ACTIVE</div>
            <div class = "stat-value">{{ activeTodosCount }}</div>
        </div>
        <div class = "stat-item">
            <div class = "stat-label">DONE</div>
            <div class = "stat-value">{{ completedTodosCount }}</div>
    </div>
  </div>

  <ul class = "todo-list">
    <li v-for = "(task, id) in todos" :key="id" class = "todo-item">
        <input class = "todo-checkbox" type = "checkbox" @change="updateItem(task.id)">
        <span class = "todo-text">{{ task.text }}</span>
        <button @click = "deleteItem(task.id)" class = "delete-btn">Delete</button>
    </li>
  </ul>

</template>

///////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////

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
 
.filter-section {
  display: flex;
  gap: 8px;
  margin-bottom: 20px;
  background: #f9fafb;
  padding: 8px;
  border-radius: 12px;
}
 
.filter-btn {
  flex: 1;
  padding: 10px 16px;
  background: transparent;
  color: #6b7280;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 14px;
  font-weight: 500;
  transition: all 0.2s;
}
 
.filter-btn:hover {
  background: #e5e7eb;
}
 
.filter-btn.active {
  background: #667eea;
  color: white;
  box-shadow: 0 2px 8px rgba(102, 126, 234, 0.3);
}
 
.stats {
  background: linear-gradient(135deg, #f9fafb 0%, #f3f4f6 100%);
  padding: 16px 20px;
  border-radius: 12px;
  margin-bottom: 20px;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
  border: 1px solid #e5e7eb;
}
 
.stat-item {
  text-align: center;
}
 
.stat-label {
  font-size: 12px;
  color: #6b7280;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  font-weight: 600;
  margin-bottom: 4px;
}
 
.stat-value {
  font-size: 24px;
  font-weight: 700;
  color: #667eea;
}
 
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
 
.empty-state {
  text-align: center;
  padding: 60px 20px;
}
 
.empty-icon {
  font-size: 64px;
  margin-bottom: 16px;
  opacity: 0.5;
}
 
.empty-text {
  color: #9ca3af;
  font-size: 15px;
}
 
.project-info {
  margin-top: 32px;
  padding: 20px;
  background: linear-gradient(135deg, #ede9fe 0%, #ddd6fe 100%);
  border-radius: 12px;
  border: 2px solid #c4b5fd;
}
 
.project-info h3 {
  color: #5b21b6;
  font-size: 14px;
  font-weight: 700;
  margin-bottom: 12px;
}
 
.features-list {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}
 
.feature-tag {
  background: white;
  color: #5b21b6;
  padding: 6px 12px;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 600;
  font-family: 'Monaco', 'Courier New', monospace;
}

</style>
