<template>
  <div class="btn btn-primary floating-button shadow-lg" @click="handleClick">
    <!-- 你可以放入任意的 Icon -->
    <span>+</span>
  </div>

  <div v-if="showCard" class="card position-fixed" style="bottom: 80px; right: 20px; width: 30rem;">
    <div class="card-body">
      <h5 class="card-title">搜尋</h5>
      <div class="input-group mb-3">
        <input type="text" class="form-control" placeholder="輸入您的查詢..." aria-label="搜尋輸入方塊" />
        <button class="btn btn-primary" type="button">搜尋</button>
      </div>
      <button class="btn btn-secondary" @click="closeCard">關閉</button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

// 控制卡片顯示的狀態
const showCard = ref(false);

// 設置按鈕點擊的事件處理邏輯
const handleClick = () => {
  showCard.value = true;
}

// 設置關閉卡片的事件處理邏輯
const closeCard = () => {
  showCard.value = false;
}
</script>

<style scoped>
.floating-button {
  position: fixed;
  bottom: 20px;
  right: 20px;
  width: 40px; /* 按鈕的寬度設定 */
  height: 40px; /* 按鈕的高度設定 */
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: background-color 0.3s ease, opacity 0.3s ease;
  box-shadow: var(--bs-btn-box-shadow, 0 0.5rem 1rem rgba(0, 0, 0, 0.15)); /* 使用 Bootstrap 的樣式來製作陰影效果 */
  background-color: rgba(0, 123, 255, 0.6); /* 半透明的背景顏色 */
  opacity: 0.6; /* 初始半透明效果 */
}

.floating-button:active {
  opacity: 0.6; /* 按下時保持半透明效果 */
}
</style>

