<template>
  <div class="dialog-box">
    <p class="dialog-text">
      {{ message }}
    </p>
  </div>
</template>

<script setup>
import { defineProps } from 'vue';
defineProps({
  message: {
    type: String,
    default: '這是一個對話框。'
  }
});


</script>
<style>
/* 對話框容器 */
.dialog-box {
  position: fixed;
  bottom: 10px; /* 離畫面底部 20px */
  left: 50%; /* 水平置中 */
  transform: translateX(-50%); /* 將框框水平居中 */
  width: 80%; /* 寬度為畫面 80% */
  max-width: 500px; /* 最大寬度 500px */
  background-color: rgba(0, 0, 0, 0.8); /* 黑色半透明背景 */
  color: white; /* 文字顏色為白色 */
  padding: 15px 20px; /* 內邊距 */
  border-radius: 10px; /* 圓角框框 */
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.3); /* 陰影效果 */
  text-align: center; /* 文字置中 */
  z-index: 1000; /* 確保框框在最上層 */
}

/* 對話框內的文字 */
.dialog-text {
  font-size: 16px;
  line-height: 1.5;
}
</style>

