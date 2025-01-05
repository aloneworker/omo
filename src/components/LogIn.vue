<template>
  <div
    class="d-flex justify-content-center align-items-center min-vh-100"
    :style="{ backgroundImage: `url(${backgroundImage})`, backgroundSize: 'cover', backgroundPosition: 'center' }"
  >
    <!-- Bootstrap Container for Responsive Behavior -->
    <div class="container px-3">
      <div class="row justify-content-center">
        <div class="col-12 col-sm-8 col-md-6 col-lg-4">
          <!-- Bootstrap Card -->
          <div class="card shadow-sm">
            <div class="card-body">
              <!-- 標題 -->
              <h4 class="card-title text-center mb-4">LogIn</h4>
              <!-- 密碼欄位 -->
              <div class="mb-3">
                <input type="password" v-model="password" class="form-control" id="password" placeholder="請輸入密碼">
              </div>
              <!-- 登入按鈕 -->
              <div class="d-grid gap-2">
                <button class="btn btn-primary" @click="handleLogin">登入</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted ,defineEmits } from 'vue';
import axios from 'axios'

const password = ref("");
const emit = defineEmits(["loginStatus"]);
// 背景圖片路徑，指向 public/bg 資料夾
const backgroundImages = [
  '/bg/1.jpg',
  '/bg/2.jpg',
  '/bg/3.jpg',
	'/bg/4.jpg',
	'/bg/5.jpg',
	'/bg/6.jpg',
	'/bg/7.jpg',
	'/bg/8.jpg',
	'/bg/9.jpg',
	'/bg/10.jpg',
	'/bg/11.jpg',
	'/bg/12.jpg',
	'/bg/13.jpg',
	'/bg/14.jpg',
	'/bg/15.jpg',
	'/bg/16.jpg',
	'/bg/17.jpg',
	'/bg/18.jpg',
	'/bg/19.jpg',
	'/bg/20.jpg',
	'/bg/21.jpg',
	'/bg/22.jpg',
	'/bg/23.jpg',
	'/bg/24.jpg',
	'/bg/25.jpg',
	'/bg/26.jpg',
	'/bg/27.jpg',
	'/bg/28.jpg',
	'/bg/29.jpg',
	'/bg/30.jpg',
	'/bg/31.jpg',
	'/bg/32.jpg',
];

const backgroundImage = ref("");

const getRandomBackground = () => {
  const randomIndex = Math.floor(Math.random() * backgroundImages.length);
  backgroundImage.value = backgroundImages[randomIndex];
};

onMounted(() => {
  getRandomBackground();
});


const sendString = async () => {
  try {
		
    const response = await axios.post('http://122.254.17.181:6996/api/talk/', {
		string: password.value
    })
    console.log('Response:', response.data)
		const success =  response.data['message'] === "Login";
		emit("loginStatus", success);
  } catch (error) {
    console.error('Error sending string:', error)
  }
}


const handleLogin = () => {
  console.log("密碼: ", password.value);
  // 模擬登入邏輯
  sendString();
};
</script>

<style scoped>
/* 自定義樣式 */
.card {
  border-radius: 10px;
	background-color: rgba(255, 255, 255, 0.8); /* 設定透明背景 */
}
</style>

