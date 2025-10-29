<script setup>

defineProps({
    totalTodos: Number,
    activeTodosCount: Number,
    completedTodosCount: Number
})

</script>

<template>

<div class="stats">
    <div class="stat-item">
      <div class="stat-label">Total</div>
      <div class="stat-value">{{ totalTodos }}</div>
    </div>
    <div class="stat-item">
      <div class="stat-label">Active</div>
      <div class="stat-value">{{ activeTodosCount }}</div>
    </div>
    <div class="stat-item">
      <div class="stat-label">Done</div>
      <div class="stat-value">{{ completedTodosCount }}</div>
    </div>
  </div>

</template>

<style scoped>

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

</style>