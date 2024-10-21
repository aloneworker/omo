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
          />
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
// Importing the ListItem component to be used inside the list item element
import ListItem from "./ListItem.vue";
import { ref } from 'vue';

// Defining a reactive list of items for dynamic rendering
// The ref() function is used to make the items reactive, so any change in items will reflect in the DOM
const items = ref([
  { label: '@', title: 'Sample Title', content: 'Sample content goes here.' }, // Item 1
  { label: '誌', title: 'Test Title', content: 'This is a test content for debugging purposes.' }, // Item 2
  { label: '書', title: 'Third Title', content: 'Content for the third item.' }, // Item 3
  { label: '@', title: 'Fourth Title', content: 'Content for the fourth item.' }, // Item 4
  { label: '誌', title: 'Fifth Title', content: 'Content for the fifth item.' }, // Item 5
  { label: '書', title: 'Sixth Title', content: 'Content for the sixth item.' }, // Item 6
  { label: '@', title: 'Seventh Title', content: 'Content for the seventh item.' }, // Item 7
  { label: '誌', title: 'Eighth Title', content: 'Content for the eighth item.' }, // Item 8
  { label: '書', title: 'Ninth Title', content: 'Content for the ninth item.' }, // Item 9
  { label: '@', title: 'Tenth Title', content: 'Content for the tenth item.' } // Item 10
]);

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
