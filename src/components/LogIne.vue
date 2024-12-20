<template>
  <div class="d-flex justify-content-center align-items-center vh-100 bg-light">
    <!-- 登入表單容器 -->
    <div class="card p-4 shadow-sm" style="width: 300px;">
      <div class="card-body">
        <!-- 標題 -->
        <h3 class="text-center mb-4">登入</h3>
        
        <!-- 帳號輸入框 -->
        <div class="mb-3">
          <label for="username" class="form-label">慰問具</label>
          <input 
            v-model="username" 
            type="text" 
            class="form-control" 
            id="username" 
            placeholder="請輸入您的慰問具"
          />
        </div>
        
        <!-- 密碼輸入框 -->
        <div class="mb-3">
          <label for="password" class="form-label">密碼</label>
          <input 
            v-model="password" 
            type="password" 
            class="form-control" 
            id="password" 
            placeholder="請輸入密碼"
          />
        </div>
        
        <!-- 登入按鈕 -->
        <div class="d-grid">
          <button @click="handleLogin" class="btn btn-primary">登入</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Login',
  data() {
    return {
      username: '',
      password: '',
    };
  },
  methods: {
    handleLogin() {
      console.log('慰問具:', this.username);
      console.log('密碼:', this.password);
      // 在這裡添加登入邏輯，例如 API 呼叫
      alert(`慰問具: ${this.username}\n密碼: ${this.password}`);
    },
  },
};
</script>

<style scoped>
.card {
  border-radius: 10px;
}
</style>

