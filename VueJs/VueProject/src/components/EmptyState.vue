<script setup>

defineProps({
    'currentFilter': String 
})

</script>

<template>

     <div class="empty-state">
        <div class="empty-icon">
            <span v-if="currentFilter === 'all'">✨</span>
            <span v-else-if="currentFilter === 'active'">✅</span>
            <span v-else>🎉</span>
    </div>
    <p class="empty-text" v-if="currentFilter === 'all'">
      No todos yet. Start by adding one above!
    </p>
    <p class="empty-text" v-else-if="currentFilter === 'active'">
      No active todos. Great job! 🎊
    </p>
    <p class="empty-text" v-else>
      No completed todos yet. Keep going!
    </p>
  </div>

</template>

<style scoped>

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