<script setup>

defineProps({
    'currentFilter': String
})

const emit = defineEmits(['set-filter'])
const setFilter = (filterKey) => {
    emit('set-filter', filterKey)
}

</script>

<template>
<div class="filter-section">
    <button 
      @click="setFilter = 'all'" 
      :class="['filter-btn', { active: currentFilter === 'all' }]"
    >
      All
    </button>

    <button 
      @click="setFilter = 'active'" 
      :class="['filter-btn', { active: currentFilter === 'active' }]"
    >
      Active
    </button>

    <button 
      @click="setFilter = 'completed'" 
      :class="['filter-btn', { active: currentFilter === 'completed' }]"
    >
      Completed
    </button>
    
  </div>
</template>

<style scoped>

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


</style>