<template>
  <div class="keep-container" @mousedown="startDrag" @mouseup="stopDrag" @mouseleave="stopDrag">
    <div class="keep-tab" :style="{ right: tabPosition + 'px' }">
      <div class="keep-drag-icon">☰</div>
    </div>
    <iframe
      v-if="showKeep"
      ref="keepIframe"
      class="keep-iframe"
      src="https://keep.google.com/"
    ></iframe>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";

const showKeep = ref(false);
const tabPosition = ref(0);
const isDragging = ref(false);
const keepIframe = ref(null);

// 長按時間閾值 (毫秒)
const longPressThreshold = 500;
let timer;

onMounted(() => {
  // 初始位置
  tabPosition.value = -30;
});

const startDrag = (event) => {
  isDragging.value = true;
  timer = setTimeout(() => {
    showKeep.value = true;
    centerKeepIframe();
  }, longPressThreshold);

  // 紀錄滑鼠點擊位置
  const initialX = event.clientX - tabPosition.value;

  const handleMouseMove = (event) => {
    if (isDragging.value) {
      // 計算新的書籤位置，限制在畫面邊界
      tabPosition.value = Math.min(
        Math.max(event.clientX - initialX, -30),
        0
      );
    }
  };

  // 監聽滑鼠移動事件
  document.addEventListener("mousemove", handleMouseMove);

  // 監聽滑鼠放開事件
  const handleMouseUp = () => {
    clearTimeout(timer);
    isDragging.value = false;
    document.removeEventListener("mousemove", handleMouseMove);
    document.removeEventListener("mouseup", handleMouseUp);

    if (!showKeep.value) {
      // 如果沒有觸發 Keep 顯示，重置書籤位置
      tabPosition.value = -30;
    }
  };
  document.addEventListener("mouseup", handleMouseUp);
};

const stopDrag = () => {
  clearTimeout(timer);
  isDragging.value = false;
};

const centerKeepIframe = () => {
  const iframeWidth = keepIframe.value.offsetWidth;
  const windowWidth = window.innerWidth;
  keepIframe.value.style.left = `${(windowWidth - iframeWidth) / 2}px`;
};
</script>

<style scoped>
.keep-container {
  position: fixed;
  top: 50%;
  transform: translateY(-50%);
  right: 0;
  z-index: 1000; /* 確保 Keep 顯示在最上層 */
}

.keep-tab {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  right: -30px; /* 預設隱藏在右側 */
  width: 30px;
  height: 100px;
  background-color: #f2f2f2;
  border-left: 1px solid #ccc;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
}

.keep-drag-icon {
  writing-mode: vertical-rl; /* 讓圖示垂直顯示 */
  font-size: 20px;
  color: #666;
}

.keep-iframe {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 800px;
  height: 600px;
  border: none;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
}
</style>

