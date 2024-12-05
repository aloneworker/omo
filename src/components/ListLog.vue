<template>
  <div class="card-container">
    <!-- Card element that contains the card header and list items -->
    <div class="card shadow p-2 mb-4 bg-body rounded" style="width: 16rem; margin-top: 15px;">
      <!-- Card header section -->
      <div class="card-header" style="font-size: 1.2rem; font-weight: bold; color: white; background-color: gray; text-align: center; user-select: none;" @dblclick="emitSignalToParent">
        誌
      </div>
      <!-- List group inside the card for displaying list items -->
      <div v-for="(group, date) in groupedItems" :key="date" class="mb-3">
        <!-- Display the date as a group header -->
        <div class="card-header" style="font-size: 0.85rem;">
          {{ date }}
        </div>
        <ul class="list-group list-group-flush">
          <!-- Loop through items array to render each ListItem component -->
          <li v-for="(item, index) in group" :key="item.title" class="list-group-item" style="font-size: 0.85rem;">
            <!-- ListItem component to display label, title, and content dynamically, and handle delete event -->
            <ListItem 
              :initial-badge-text="item.label" 
              :initial-title="item.title" 
              :initial-content="item.content" 
              @delete-item="deleteItem(index, date)"
              @update-item="updateItem(index, $event, date)"
            />
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup>
// Importing the ListItem component to be used inside the list item element
import ListItem from "./ListItem.vue";
import { ref, onMounted, watch, defineProps, defineEmits } from 'vue';
import axios from 'axios';

// 定義 emits，向父組件傳遞事件
// Defining emits to pass events to the parent component
const emit = defineEmits(['headerClicked']);

// 定義 props，用於獲取從父組件傳遞的屬性
// Defining props to receive attributes passed from the parent component
const props = defineProps({
  fetch: {
    type: String,
    required: true
  }
});

// 定義 items 反應式變量，用於存儲動態渲染的項目
// Defining a reactive list of items for dynamic rendering
// The ref() function is used to make the items reactive, so any change in items will reflect in the DOM
const items = ref([]);
const groupedItems = ref({});

// 將項目按日期分組並從新到舊排序
// Group items by date and sort them from newest to oldest
const groupItemsByDate = () => {
  const grouped = {};
  items.value.forEach(item => {
    const date = item.date_created.split('T')[0]; // 使用 "date_created" 屬性並截取日期部分
    if (!grouped[date]) {
      grouped[date] = [];
    }
    grouped[date].push(item);
  });
  // 將結果排序為從最新到最舊
  const sortedKeys = Object.keys(grouped).sort((a, b) => new Date(b) - new Date(a));
  const sortedGrouped = {};
  sortedKeys.forEach(key => {
    sortedGrouped[key] = grouped[key];
  });
  groupedItems.value = sortedGrouped;
};

// 更新項目的函數，用於更新單個項目並同步到伺服器
// Function to update an item and synchronize it with the server
const updateItem = async (index, updatedItem, date) => {
  try {
    // 更新本地的 items，使用更新後的值
    // Update the local items with the new values
    groupedItems.value[date][index].label = updatedItem.badgeText;
    groupedItems.value[date][index].title = updatedItem.cardTitle;
    groupedItems.value[date][index].content = updatedItem.cardContent;
    const itemId = groupedItems.value[date][index].id;    
    // 向服務器同步更新的項目
    // Synchronize the updated item with the server using a PUT request
    console.log('使用 PUT 同步更新資料');
    await axios.put(`http://122.254.17.181:6996/api/carditem/${itemId}/`, groupedItems.value[date][index]);
  } catch (error) {
    console.error('同步更新項目到服務器時出錯:', error);
  }
  fetchData();
};

// 刪除項目並同步到服務器的函數
// Function to delete an item from the server
const deleteItemServer = async(index, date) => {
  try {
    // 向服務器發送刪除請求
    // Send a DELETE request to the server
    await axios.delete(`http://122.254.17.181:6996/api/carditem/${groupedItems.value[date][index].id}/`);
  } catch (error) {
    console.error('同步更新項目到服務器時出錯:', error);
  }
  fetchData();
};

// 從服務器獲取數據的函數
// Function to fetch data from the server
const fetchData = async () => {
  try {
    // 發送 GET 請求以獲取項目列表
    // Send a GET request to fetch the list of items
    const response = await axios.get('http://122.254.17.181:6996/api/logs/');
    items.value = response.data;
    groupItemsByDate();
  } catch (error) {
    console.error('Error fetching data from the server:', error);
  }
};

// 將本地數據同步到伺服器的函數
// Function to synchronize local data to the server
const syncData = async () => {
  try {
    console.log('put 了');
    await axios.put('http://192.168.68.53:6996/api/logs/', items.value);
  } catch (error) {
    console.error('Error syncing data with the server:', error);
  }
};

// 監聽 items 的變化，當 items 變化時自動同步數據到伺服器
// Watch for changes in items and automatically sync with the server when items change
watch(items, (newdata) => {
  console.log(newdata);
  syncData();
}, { deep: true });

// 組件掛載時，從伺服器獲取數據
// Fetch data from the server when the component is mounted
onMounted(fetchData);

// 監聽 props.fetch 變化，當 props.fetch 改變時重新獲取數據
// Watch for changes in props.fetch and refetch data if it changes
watch(() => props.fetch, () => {
  fetchData();
});

// 刪除列表項目的函數
// Function to delete an item from the list
const deleteItem = (index, date) => {
  deleteItemServer(index, date);
  groupedItems.value[date].splice(index, 1);
  if (groupedItems.value[date].length === 0) {
    delete groupedItems.value[date];
  }
};

// 向父組件傳遞信號的函數
// Function to emit a signal to the parent component
const emitSignalToParent = () => {
  emit('headerClicked');
};
</script>

<style scoped>
/* Styling the card with additional top margin to avoid overlapping the top of the screen */
/* 為卡片添加額外的上邊距，以避免與屏幕頂部重疊 */
.card {
  width: 16rem;
  margin: auto;
  margin-top: 15px;
  padding: 0.5rem;
}

/* Reduce the font size of list items and card content */
/* 減少列表項目和卡片內容的字體大小 */
.card-header {
  font-size: 0.9rem;
}

.list-group-item {
  font-size: 0.85rem;
}
</style>

