<template>
  <!-- 卡片容器，使用 Bootstrap 設置位置為橫向居中 -->
  <div class="card-container">
    <!-- 卡片元素，包含卡片標題與列表項目 -->
    <div class="card shadow p-2 mb-4 bg-body rounded" style="width: 16rem; margin-top: 15px;" >
      <!-- 卡片標題區域，顯示當天日期，字體粗體白字，背景黃色，設定為不可懸取 -->
      <div class="card-header" style="font-size: 0.9rem; font-weight: bold; color: red; background-color: white;text-align: center; user-select: none;" @dblclick="emitSignalToParent">
        {{ new Date().toLocaleDateString() }}
      </div>
      <!-- 卡片內的列表組，用來顯示各個項目 -->
      <ul class="list-group list-group-flush">
        <!-- 走過 items 數組，以渲染每個 ListItem 組件 -->
        <li v-for="(item, index) in items" :key="item.title" class="list-group-item" style="font-size: 0.85rem;">
          <!-- ListItem 組件用來加載標籤、標題和內容，並處理刪除事件 -->
          <ListItem 
            :initial-badge-text="item.label" 
            :initial-title="item.title" 
            :initial-content="item.content" 
            @delete-item="deleteItem(index)"
            @update-item="updateItem(index, $event)"
          />
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
// 引入 ListItem 組件使用於渲染每個列表項目
import ListItem from "./ListItem.vue";
import { ref, onMounted, watch, defineProps, defineEmits } from 'vue';
import axios from 'axios';

// 定義 props，取得引數 fetch
const props = defineProps({
  fetch: {
    type: String,
    required: true
  }
});

// 定義 emits，向父組件傳遞事件
const emit = defineEmits(['headerClicked']);

// 定義一個有效的 items 數組使用於動態渲染
// 使用 ref() 來使 items 可反應，任何對 items 的更改都會反應在 DOM 上
const items = ref([]);

// 從服務器獲取資料的函數
const fetchData = async () => {
  try {
    const response = await axios.get('http://122.254.17.181:6996/api/items/');
    items.value = response.data;
  } catch (error) {
    console.error('從服務器獲取資料時出錯:', error);
  }
};


const updateItem = async (index, updatedItem) => {
  try {
    // 更新本地的 items
    items.value[index].label = updatedItem.badgeText;
    items.value[index].title = updatedItem.cardTitle;
    items.value[index].content = updatedItem.cardContent;
		const itemId = items.value[index].id;    
    // 向服務器同步更新的項目
    console.log('使用 PUT 同步更新資料');
    await axios.put(`http://122.254.17.181:6996/api/carditem/${itemId}/`, items.value[index]);
  } catch (error) {
    console.error('同步更新項目到服務器時出錯:', error);
  }
	fetchData();
};
// 同步數據到服務器的函數
const syncData = async () => {
  try {
    console.log('使用 PUT 同步資料');
    await axios.put('http://122.254.17.181:6996/api/items/', items.value);
  } catch (error) {
    console.error('同步數據到服務器時出錯:', error);
  }
};

// 使用 watch 監視 items 的變化以实時更新數據
watch(items, (newdata) => {
  console.log(newdata);
  syncData();
}, { deep: true });

// 在組件加載時自動調用 fetchData 來獲取資料
onMounted(fetchData);

// 監視 props 中 fetch 的變化以重新獲取資料
watch(() => props.fetch, () => {
  fetchData();
});

// 刪除一個項目的函數
const deleteItem = (index) => {
  items.value.splice(index, 1);
};

// 向父組件傳遞信號的函數
const emitSignalToParent = () => {
  emit('headerClicked');
};
</script>

<style scoped>
/* 設置卡片，以避免重疊頂部 */
.card {
  width: 16rem;
  margin: auto;
  margin-top: 15px;
  padding: 0.5rem;
}

/* 調整卡片標題的字體大小與樣式，並設置為粗體白字，背景黃色，不可懸取 */
.card-header {
  font-size: 0.9rem;
  font-weight: bold;
  color: white;
  background-color: red;
  user-select: none;
}

.list-group-item {
  font-size: 0.85rem;
}
</style>

