<template>
  <div class="floating-button" @click="handleClick">
    <!-- 使用圖片作為按鈕圖樣 -->
    <img src="m.jpg" alt="按鈕圖樣" class="button-icon" />
  </div>

  <div v-if="showCard" class="position-fixed responsive-input-group">
    <div class="input-group mb-3">
      <input v-model="inputValue" type="text" class="form-control border-0" placeholder="輸入您的查詢..." aria-label="搜尋輸入方塊" />
      <button class="btn btn-primary" type="button" @click="handleSayClick">說</button>
    </div>
  </div>
</template>

<script setup>
import { ref, defineEmits } from 'vue';

// 控制卡片顯示的狀態
const showCard = ref(false);
// 儲存輸入的值
const inputValue = ref('');

// 定義 emit，將資料傳遞給父組件
const emit = defineEmits(['sendInput']);

// 設置按鈕點擊的事件處理邏輯
const handleClick = () => {
  showCard.value = true;
}

// 設置「說」按鈕的點擊事件處理邏輯
const handleSayClick = () => {
  showCard.value = false;
  emit('sendInput', inputValue.value); // 將輸入的資料傳遞給父組件
}
</script>

<style scoped>
.floating-button {
  position: fixed;
  bottom: 20px;
  right: 20px;
  cursor: pointer;
  transition: opacity 0.3s ease;
  opacity: 0.6; /* 初始半透明效果 */
}

.floating-button:active {
  opacity: 0.6; /* 按下時保持半透明效果 */
}

.button-icon {
  width: 40px; /* 調整圖片的大小 */
  height: 40px; /* 調整圖片的大小 */
  object-fit: cover;
}

.responsive-input-group {
  bottom: 80px;
  right: 20px;
  width: 90%; /* 使其在移動設備上更合適 */
  max-width: 480px; /* 設置最大寬度以適應較大屏幕 */
  padding: 10px;
  box-sizing: border-box;
}

@media (max-width: 768px) {
  .floating-button {
    bottom: 15px;
    right: 15px;
    width: 50px;
    height: 50px;
  }

  .button-icon {
    width: 100%;
    height: 100%;
  }

  .responsive-input-group {
    bottom: 60px;
    right: 10px;
    width: 95%;
    padding: 5px;
  }
}
</style>

