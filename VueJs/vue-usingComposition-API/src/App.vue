<!--
<script>

import { ref } from 'vue';

export default {
  
  setup() {
    const status = ref("active")

    const changeSts = () => {
      if(status.value === "active") {
        status.value = "pending"
      }else if(status.value === "pending") {
        status.value = "inactive"
      }
    }
    return {
      status,
      changeSts
    }
    
  }
}
</script>
-->


<script setup>

import {ref} from 'vue';

    const status = ref("active")
    const tasks = ref(['taskone', 'tasktwo', 'taskthree'])
    const newTask = ref('')

    const changeSts = () => {
      if(status.value === "active") {
        status.value = "pending"
      }else if(status.value === "pending") {
        status.value = "inactive"
      } else {
        status.value = "active"
      }
    }

    //Add in array: 
    const addTask = () => {
      if(newTask.value.trim()) {
        tasks.value.push(newTask.value.trim())
        newTask.value = ''
        console.log(tasks.value)
      }
    }


//Delete from the array:
    const deleteItem = (index) => {
      tasks.value.splice(index,1)
      console.log(tasks.value)
    }


</script>

//////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////

<template>
  
  <h1>Todo App</h1>

  <p v-if="status === 'active'"> User is active </p>
  <p v-else-if ="status === 'pending'"> User is pending </p>
  <p v-else> User is inactive </p>

  <form action = "" @submit.prevent = "addTask">
    <label for="newTask">Add Task: </label>
    <input type="text" name="newTask" id="newTask" placeholder="Task as : Coding!" v-model="newTask">
    <button type ="submit" >Add Task</button>
    
  </form>

  <h3>Todos: </h3>

  <ul>  
    <li v-for = "(task, index) in tasks" :key="index">
            <span>{{ task }}</span>
            <button @click = "deleteItem(index)"> Delete Task </button>
      </li>
  </ul>

</template>

//////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////

<style scoped>

</style>
