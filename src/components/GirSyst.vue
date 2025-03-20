<template>
  <div class="girl-system">
    <div class="image-container" v-if="girlImage">
      <img :src="girlImage" alt="Girl Image" class="girl-image" />
    </div>
    <div
      class="dialog-box"
      v-if="girlImage"
      @touchstart="startSwipe"
      @touchmove="swipeMove"
      @touchend="endSwipe"
      ref="dialogBox"
    >
      <div class="dialog-text">{{ mainContext }}</div>  <div class="left-dialog-box" >
        <div class="dialog-text">{{ leftContext }}</div>  </div>
      <div class="right-dialog-box" >
        <div class="dialog-text">{{ rightContext }}</div>  </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, defineProps, defineEmits } from 'vue';
import axios from 'axios';

const mainContext = ref(''); // 用於存放中間對話框的內容
const leftContext = ref(''); // 用於存放左側對話框的內容
const rightContext = ref(''); // 用於存放右側對話框的內容
const girlImage = ref('');
const emit = defineEmits(['hide']);
const props = defineProps({
  shouldTriggerGirl: {
    type: String,
    default: ''
  }
});

const dialogBox = ref(null);
const touchStartX = ref(0);
const isSwiping = ref(false);
const swipeThreshold = 50;

const fetchGirlData = async (state) => {
  try {
    const response = await axios.post(
      'http://122.254.17.181:6996/api/get_girl/',
      { state: state },
      {
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );

      if (response.data.context === ''){
          emit('hide');
      }

    // 分割 context 內容
    const contextParts = response.data.context.split('|');
    if (contextParts.length === 3) {
      mainContext.value = contextParts[0].trim(); // 中間對話框內容
      leftContext.value = contextParts[1].trim(); // 左側對話框內容
      rightContext.value = contextParts[2].trim(); // 右側對話框內容
    } else {
      // 如果分割後不是三份，則將原始 context 顯示在中間對話框，左右側清空
      mainContext.value = response.data.context;
      leftContext.value = '';
      rightContext.value = '';
      console.warn("Context 內容分割後不是三份，使用原始 context 顯示在中間對話框");
    }

    girlImage.value = response.data.image;
  } catch (error) {
    console.error(`獲取妹子資料失敗 (狀態: ${state}):`, error);
  }
};

const swipeLeft = () => {
  fetchGirlData('left');
};

const swipeRight = () => {
  fetchGirlData('right');
};

const startSwipe = (event) => {
  if (!mainContext.value && !leftContext.value && !rightContext.value) return; // 修正判斷條件
  isSwiping.value = true;
  touchStartX.value = event.touches[0].clientX;
};

const swipeMove = (event) => {
  if (!isSwiping.value || (!mainContext.value && !leftContext.value && !rightContext.value)) return; // 修正判斷條件
  const touchCurrentX = event.touches[0].clientX;
  const diffX = touchCurrentX - touchStartX.value;
  dialogBox.value.style.transform = `translateX(${diffX}px)`;
};

const endSwipe = (event) => {
  if (!isSwiping.value || (!mainContext.value && !leftContext.value && !rightContext.value)) return; // 修正判斷條件
  isSwiping.value = false;
  dialogBox.value.style.transform = `translateX(0)`;

  const endX = event.changedTouches[0].clientX;
  const diffX = endX - touchStartX.value;

  if (Math.abs(diffX) >= swipeThreshold) {
    if (diffX < 0) {
      swipeLeft();
    } else {
      swipeRight();
    }
  }
};

watch(
  () => props.shouldTriggerGirl,
  (newValue) => {
    if (newValue != '') {
      fetchGirlData(newValue);
    }
  }
);
</script>

<style scoped>
/* ... (CSS 樣式程式碼，與之前的修改版本相同) ... */
.girl-system {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  position: relative;
  overflow: hidden;
}

.image-container {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.girl-image {
  max-width: 110%;
  max-height: 110%;
  object-fit: contain;
  border-radius: 10px;
	opacity: 0; /* 初始時設定圖片透明度為 0，動畫開始時再顯示 */
  animation: bounce-and-fade 0.8s ease-out forwards; /* 套用動畫 */
}

@keyframes bounce-and-fade {
  0% {
    transform: translateY(0);
    opacity: 0;
  }
  20% {
    transform: translateY(-8px); /* 向上跳動的距離，可以調整 */
    opacity: 1;
  }
  40% {
    transform: translateY(4px); /* 向下的小幅度回彈，可以調整 */
  }
  60% {
    transform: translateY(-2px); /* 再次小幅度向上 */
  }
  80% {
    transform: translateY(1px); /* 再次小幅度向下 */
  }
  100% {
    transform: translateY(0); /* 回到原始位置 */
    opacity: 1; /* 動畫結束時完全顯示 */
  }
}





.dialog-box {
  background-color: rgba(255, 255, 255, 0.9);
  border: 1px solid #ccc;
  padding: 15px;
  border-radius: 8px;
  width: 80%;
  max-width: 400px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
  text-align: center;
  transition: transform 0.2s ease;
  left: 20;
    bottom: 100px;
    position: absolute;
    z-index: 10;
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
opacity: 0; /* 初始時隱藏對話方塊 */
  animation: fade-in 0.2s ease-out forwards 0.2s; /* 延遲 0.8 秒後淡入顯示 */
}






@keyframes fade-in {
  from { opacity: 0; }
  to { opacity: 1; }
}
.dialog-text {
  margin-bottom: 20px;
}

.swipe-buttons {
  display: flex;
  justify-content: space-around;
  margin-top: 10px;
}


.left-dialog-box {
  background-color: rgba(255, 255, 255, 0.7);
  border: 1px solid #ccc;
  padding: 10px;
  border-radius: 8px;
  width: 40%;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
  text-align: center;
  position: absolute;
  left: -23%;
  top: -20px;
  z-index: 11;
  display: flex;
  align-items: center;
  justify-content: center;
}

.right-dialog-box {
  background-color: rgba(255, 255, 255, 0.7);
  border: 1px solid #ccc;
  padding: 10px;
  border-radius: 8px;
  width: 40%;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
  text-align: center;
  position: absolute;
  right: -23%;
  top: -20px;
  z-index: 11;
  display: flex;
  align-items: center;
  justify-content: center;
}

.left-dialog-box .dialog-text,
.right-dialog-box .dialog-text {
  margin-bottom: 0;
  font-size: 0.9em;
}
</style>
