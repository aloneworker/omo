<template>
  <div class="random-image-container">
    <transition name="fade">
      <img 
        v-if="shouldShowImage" 
        src="girls/a1/stand/nomal/01.png"
        alt="Anime Character"
        class="random-image"
      />
    </transition>
  </div>
</template>

<script setup>
import { ref, watch ,defineProps} from 'vue'

const props = defineProps({
  show: {
    type: Boolean,
    required: true
  }
})

const shouldShowImage = ref(false)

watch(
  () => props.show,
  (newValue) => {
    if (newValue) {
      shouldShowImage.value = Math.random() < 0.5
    } else {
      shouldShowImage.value = false
    }
  },
  { immediate: true }
)
</script>

<style scoped>
.random-image-container {
  width: 300px;
  height: 400px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.random-image {
  max-width: 100%;
  height: auto;
}

.fade-enter-active, .fade-leave-active {
  transition: opacity 0.5s;
}

.fade-enter-from, .fade-leave-to {
  opacity: 0;
}
</style>
