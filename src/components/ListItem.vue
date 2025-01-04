<template>
  <div class="d-flex align-items-center" @click.self="closeOpenCards">
    <!-- 標籤：包含標籤和標籤背景顏色 -->
    <span :class="badgeClass" :style="badgeStyle" style="user-select: none; cursor: pointer;" @dblclick="handleDoubleClick" @mousedown="startPress" @mouseup="endPress" @touchstart="startPress" @touchend="endPress">{{ badgeText }}</span>
    <!-- 標籤內容：表示我們想要紀錄的內容 -->
    <p class="mb-0 fs-5">{{ cardTitle }}</p>
  </div>

  <!-- note-card：長按後彈出的對話方塊 -->
  <div v-if="showCard" class="card mt-3" style="position: fixed; top: 0; left: 0; width: 100%; height: 100%; margin: 0; padding: 0; z-index: 1000; background: white;" @click.self="closeOpenCards">
    <div class="card-body">
      <h5 style="border: none;" class="card-title fs-5">記事</h5>
      <input type="text" v-model="cardTitle"  style="border: none;"   class="form-control form-control-md mb-2" placeholder="標籤">
      <textarea v-model="cardContent"  style="border: none; flex: 1; resize: none;"   class="form-control form-control-md mb-2" placeholder="內容"></textarea>
      <button class="btn btn-primary btn-md" @click="confirmCard">確認</button>
    </div>
  </div>

  <!-- 展示保存的 note-card 資訊 -->
  <div v-if="showNote" class="card mt-3" style="max-width: 90%; margin: 0 auto;" @click.self="closeOpenCards">
    <div class="card-body">
      <p class="card-text fs-5" style="white-space: pre-wrap;">{{ savedContent }}</p>
      <button class="btn btn-secondary btn-md" @click="closeNote">關閉</button>
    </div>
  </div>

  <!-- 刪除確認窗口 -->
  <div v-if="showDeleteConfirm" class="modal fade show" tabindex="-1" role="dialog" style="display: block; background: rgba(0, 0, 0, 0.5);" @click.self="showDeleteConfirm = false">
    <div class="modal-dialog modal-dialog-centered shadow-lg" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title text-danger fs-5">確認刪除</h5>
          <button type="button" class="btn-close" @click="showDeleteConfirm = false" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <p class="text-center fs-5">確定要刪除這個標籤嗎？</p>
        </div>
        <div class="modal-footer d-flex justify-content-center">
          <button type="button" class="btn btn-secondary btn-md" @click="showDeleteConfirm = false">取消</button>
          <button type="button" class="btn btn-danger btn-md" @click="deleteBadge">刪除</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onBeforeUnmount, defineProps, computed, defineEmits, watch } from 'vue';

// 從父組件接收標籤、標題和內容
const props = defineProps({
  initialBadgeText: String,
  initialTitle: String,
  initialContent: String,
});

// 發出事件到父組件
const emit = defineEmits(['delete-item', 'update-item','creat-item']);

// 標籤的文字
const badgeText = ref(props.initialBadgeText || '@');
// 控制 note-card 是否顯示
const showCard = ref(false);
// 控制已保存的 note-card 是否顯示
const showNote = ref(false);
// 控制是否顯示刪除確認窗口
const showDeleteConfirm = ref(false);
// note-card 的標題
const cardTitle = ref(props.initialTitle || '');
// note-card 的內容
const cardContent = ref(props.initialContent || '');
// 保存的 note-card 標題和內容
const savedTitle = ref(props.initialTitle || '');
const savedContent = ref(props.initialContent || '');
let pressTimer = null;

// 計算標籤顏色根據標籤文字動態變化
const badgeClass = computed(() => {
  if (badgeText.value === '@') {
    return 'badge bg-danger me-2 fs-5';
  } else if (badgeText.value === '誌') {
    return 'badge bg-secondary me-2 fs-5';
  } else if (badgeText.value === '書') {
    return 'badge bg-success me-2 fs-5';
	} else if (badgeText.value ==- '>>'){
		return 'badge me-2 fs-5';
	} else {
		return 'badge bg-primary me-2 fs-5';
  }
});

// 增加標籤數值
const incrementBadgeValue = () => {
	const currentValue = parseInt(cardContent.value, 10) || 0;
	cardContent.value = (currentValue + 1).toString();
	const logs = cardTitle.value + " " + cardContent.value + "次"
	emit('update-item', { badgeText: badgeText.value, cardTitle: cardTitle.value, cardContent: cardContent.value ,timestamp: getCurrentISODate()});
	emit('creat-item',{log:logs} )
};



// 計算屬性：動態背景樣式
const badgeStyle = computed(() => {
  if (badgeText.value === '>>') {
    const baseColor = 255; // 白色基數
    const maxBlueIntensity = 200; // 最大藍色強度
    const numberValue = Math.min(parseInt(cardContent.value, 10) || 0, 99); // 提取數值並限制在範圍 0-99
    const blueValue = baseColor - Math.floor((numberValue / 99) * maxBlueIntensity);
    return {
      background: `linear-gradient(to right, rgba(${baseColor}, ${baseColor}, ${blueValue}, 1), rgba(${blueValue}, ${baseColor}, ${baseColor}, 1))`,
    };
  }
  return {};
});


const getCurrentISODate = () => {
  const now = new Date();
  // 格式化為 ISO 8601 並附加時區偏移
  const isoString = now.toISOString(); // 2023-12-04T15:30:00.123Z
  const timezoneOffset = -now.getTimezoneOffset(); // 獲取分鐘數
  const offsetSign = timezoneOffset >= 0 ? '+' : '-';
  const offsetHours = String(Math.floor(Math.abs(timezoneOffset) / 60)).padStart(2, '0');
  const offsetMinutes = String(Math.abs(timezoneOffset) % 60).padStart(2, '0');
  return `${isoString.slice(0, -1)}${offsetSign}${offsetHours}:${offsetMinutes}`;
};

const changeBadge = () => {
  console.log('changeBadge called');
  badgeText.value = '誌';
};

const startPress = () => {
  console.log('startPress called, setting pressTimer');
  pressTimer = setTimeout(() => {
    console.log('Press timer completed, showing card');
    showCard.value = true;
  }, 1000);
};

const endPress = () => {
  console.log('endPress called, clearing pressTimer');
  clearTimeout(pressTimer);
};

const confirmCard = () => {
  console.log('confirmCard called, updating cardTitle and cardContent');
  if (cardTitle.value.trim() === '') {
    console.log('cardTitle is empty, deleting badge and closing card');
    deleteBadge();
    showCard.value = false;
    return;
  }
  savedTitle.value = cardTitle.value;
  savedContent.value = cardContent.value;
  showCard.value = false; // Hide note-card after confirming
  badgeText.value = '書'; // Update the badge to "書" after confirming
  emit('update-item', { badgeText: badgeText.value, cardTitle: cardTitle.value, cardContent: cardContent.value,timestamp: getCurrentISODate()}); // Emit updated data to the parent component
};

const closeNote = () => {
  console.log('closeNote called, hiding note');
  showNote.value = false;
};

const closeOpenCards = () => {
  console.log('closeOpenCards called, hiding open cards if any');
  showCard.value = false;
  showNote.value = false;
};

const handleDoubleClick = () => {
  console.log('handleDoubleClick called');
  if (badgeText.value === '@') {
    console.log('Changing badge to 誌');
    changeBadge();
  } else if (badgeText.value === '書') {
    console.log('Showing saved note-card');
    savedTitle.value = cardTitle.value;
    savedContent.value = cardContent.value;
    showNote.value = true;
  } else if (badgeText.value === '誌') {
    console.log('Confirming delete');
    showDeleteConfirm.value = true;
  }else if (badgeText.value === '>>') {
		incrementBadgeValue();
	}
};

const deleteBadge = () => {
  console.log('deleteBadge called, resetting badgeText to @');
  badgeText.value = '@';
  showDeleteConfirm.value = false;
  emit('delete-item'); // 向父組件發送刪除請求
};

watch([badgeText,  cardContent], () => {
  emit('update-item', { badgeText: badgeText.value, cardTitle: cardTitle.value, cardContent: cardContent.value });
});

onBeforeUnmount(() => {
  console.log('Component is unmounting, clearing pressTimer if active');
  // Clear the timer if the component is unmounted
  if (pressTimer) {
    clearTimeout(pressTimer);
  }
});
</script>

<style scoped>
/* 根據需要進行樣式的調整 */
.modal-dialog {
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  border-radius: 0.5rem;
}
</style>

