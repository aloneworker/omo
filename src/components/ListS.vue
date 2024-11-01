<template>
  <div class="card-container position-absolute top-0 start-50 translate-middle-x">
    <!-- Card element that contains the card header and list items -->
    <div class="card shadow p-2 mb-4 bg-body rounded" style="width: 16rem; margin-top: 15px;">
      <!-- Card header section -->
      <div class="card-header" style="font-size: 0.9rem;">
        Featured
      </div>
      <!-- List group inside the card for displaying list items -->
      <ul class="list-group list-group-flush">
        <!-- Loop through items array to render each ListItem component -->
        <li v-for="(item, index) in items" :key="item.title" class="list-group-item" style="font-size: 0.85rem;">
          <!-- ListItem component to display label, title, and content dynamically, and handle delete event -->
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
// Importing the ListItem component to be used inside the list item element
import ListItem from "./ListItem.vue";
import { ref, onMounted , watch,defineProps} from 'vue';
import axios from 'axios';



const props = defineProps({
  fetch: {
    type: String,
    required: true
  }
});
// Defining a reactive list of items for dynamic rendering
// The ref() function is used to make the items reactive, so any change in items will reflect in the DOM
const items = ref([]);

const fetchData = async () => {
  try {
    const response = await axios.get('http://122.254.17.181:6996/api/items/');
    items.value = response.data;
  } catch (error) {
    console.error('Error fetching data from the server:', error);
  }
};

const updateItem = (index, updatedItem) => {
  items.value[index].label = updatedItem.badgeText;
  items.value[index].title = updatedItem.cardTitle;
  items.value[index].content = updatedItem.cardContent;
  syncData();
};


const syncData = async () => {
  try {
		console.log('put 了');
    await axios.put('http://192.168.68.53:6996/api/items/', items.value);
  } catch (error) {
    console.error('Error syncing data with the server:', error);
  }
};



watch(items, (newdata) => {
	console.log(newdata)
  syncData();
}, { deep: true });
// Fetch data from the Django server on component mount
onMounted(fetchData);
watch(() => props.fetch, () => {
  
    fetchData();
});
// Function to delete an item from the list
const deleteItem = (index) => {
  items.value.splice(index, 1);
};
</script>

<style scoped>
/* Styling the card with additional top margin to avoid overlapping the top of the screen */
.card {
  width: 16rem;
  margin: auto;
  margin-top: 15px;
  padding: 0.5rem;
}

/* Reduce the font size of list items and card content */
.card-header {
  font-size: 0.9rem;
}

.list-group-item {
  font-size: 0.85rem;
}
</style>

