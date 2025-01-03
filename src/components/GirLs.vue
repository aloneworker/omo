<template>
  <div 
    class="swipeable-container"
    @touchstart="handleTouchStart"
    @touchmove="handleTouchMove"
    @touchend="handleTouchEnd"
  >
    <img 
      src="/girls/a1/stand/normal/a1.png" 
      alt="自適應圖片" 
      class="responsive-image"
      :style="transformStyle"
    />
  </div>
</template>

<script setup>
import { ref, computed ,defineEmits} from 'vue'

const startX = ref(0)
const currentX = ref(0)
const isDragging = ref(false)
const threshold = 50 // 觸發事件的閾值

const transformStyle = computed(() => {
  if (!isDragging.value) return {}
  return {
    transform: `translateX(${currentX.value}px)`,
    transition: isDragging.value ? 'none' : 'transform 0.3s ease'
  }
})

const emit = defineEmits(['swipe-right', 'swipe-left'])

const handleTouchStart = (event) => {
  startX.value = event.touches[0].clientX
  isDragging.value = true
}

const handleTouchMove = (event) => {
  if (!isDragging.value) return
  
  const x = event.touches[0].clientX
  const diff = x - startX.value
  currentX.value = diff
}

const handleTouchEnd = () => {
  if (Math.abs(currentX.value) > threshold) {
    if (currentX.value > 0) {
      emit('swipe-right')
      console.log('向右滑動')
    } else {
      emit('swipe-left')
      console.log('向左滑動')
    }
  }
  
  // 重置位置
  currentX.value = 0
  isDragging.value = false
}
</script>

<style scoped>
.swipeable-container {
  width: 100%;
  overflow: hidden;
  touch-action: pan-x;
}
.responsive-image {
  width: 100%;
  display: block;
  user-select: none;
  -webkit-user-drag: none;
}
</style>
