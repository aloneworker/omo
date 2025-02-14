<template>
  <div class="d-flex justify-content-center align-items-end vh-100">
    <div class="card shadow-lg mb-5 border-0 rounded-lg" style="width: 90%; max-width: 400px;">
      <div class="card-body text-center">
        <h5 class="card-title">對話框標題</h5>
        <p class="card-text">{{ context }}</p>
      </div>
      <div class="card-footer d-flex justify-content-between bg-white border-0">
        <button class="btn btn-secondary">{{ left }}</button>
        <button class="btn btn-primary">{{ right }}</button>
      </div>
    </div>
	</div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import axios from 'axios';

const context = ref('對話框內容放在這裡');
const left = ref('左邊按鈕');
const right = ref('右邊按鈕');

onMounted(() => {
  axios.post('http://122.254.17.181:6996/api/gging/')
    .then(response => {
      console.log('POST request successful:', response.data);
      if (response.data && response.data.context && response.data.left && response.data.right) {
        context.value = response.data.context;
        left.value = response.data.left;
        right.value = response.data.right;
      } else {
        console.error('Response data is missing context, left, or right properties:', response.data);
      }
    })
    .catch(error => {
      console.error('Error sending POST request:', error);
    });
});
</script>

<style scoped>
.card {
  box-shadow: 0 1rem 3rem rgba(0, 0, 0, 0.35) !important;
}
</style>
