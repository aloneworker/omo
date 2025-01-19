<template>
  <transition name="banner"> 
    <div v-if="show" class="banner" :style="{ backgroundColor: color }">
      <span>          {{ title }}</span>
    </div>
  </transition>
</template>
<script setup>
import { ref, defineProps, defineExpose } from 'vue';

defineProps({
  title: {
    type: String,
    required: true,
  },
  color: {
    type: String,
    default: 'orange',
  },
});

const show = ref(false);

const showBanner = () => {
  show.value = true;
  setTimeout(() => {
    show.value = false;
  }, 1500);
};

defineExpose({ showBanner }); 
</script>

<style scoped>

.banner {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 10px 20px;
  border-radius: 5px;
  color: white;
  z-index: 1000;
  width: 120vw;
  transition: transform 0.3s ease-in-out, opacity 0.5s ease-in-out;
	opacity: 1;
}



.banner-leave-active { /* 淡出效果 */
  transition: transform 0.5s ease-in-out, opacity 0.5s ease-in-out;
}

.banner-leave-to {
  opacity: 0; /* 變為透明 */
}


.banner-enter-from {
  transform: translate(100%, -2%); /* 修正初始位置 */
	opacity: 0; /* 初始狀態為透明 */
}


span {
  display: block; /* 將 span 設定為區塊元素 */
  text-align: right; /* 文字靠右對齊 */
  padding-right: 30px; /* 右側內邊距 20px */
}


</style>
