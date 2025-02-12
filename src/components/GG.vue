<template>
  <div class="d-flex justify-content-center align-items-end vh-100">
    <div class="card shadow-lg mb-5 border-0 rounded-lg" style="width: 90%; max-width: 400px;">
      <div class="card-body text-center">
        <h5 class="card-title">對話框標題</h5>
        <p class="card-text">對話框內容放在這裡</p>
      </div>
      <div class="card-footer d-flex justify-content-between bg-white border-0">
        <button class="btn btn-secondary">左邊按鈕</button>
        <button class="btn btn-primary">右邊按鈕</button>
      </div>
    </div>
  </div>  
</template>

<script setup>
import { onMounted } from 'vue';
import axios from 'axios';

onMounted(() => {
  axios.post('http://122.254.17.181:6996/api/gging/')
    .then(response => {
      console.log('POST request successful:', response);
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
