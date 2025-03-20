<template>

  <girsys v-show="triggerFlag" @hide="triggerFlag=false" :shouldTriggerGirl="triggerFlag" class="A" />
	
	<login v-if="!isLogin" @loginStatus="handleLoginStatus"/>
	<div v-if="isLogin" >
	<transition name='slide' v-if="isLogin">
	<lists v-if='isnow' :fetch="changes" @headerClicked='headerclick'/>
	<loglist v-else-if='islog' :fetch="changes" @headerClicked='headerclick'/>
	<booklist v-else-if='isbook' :fetch="changes" @headerClicked='headerclick'/>
	</transition>
	
	<flatb @sendInput="talkwhat"/>
	</div>
</template>

<script setup>
import { ref,watch,onMounted  } from 'vue'

import girsys from './GirSyst.vue'

import lists from './ListS.vue'
import loglist from './ListLog.vue'
import booklist from './ListBook.vue'
import flatb from './FlatBott.vue'
import login from './LogIn.vue'
import axios from 'axios'
const newdata = ref('');
const now_stat = ref('now');
const changes = ref('');
const isnow = ref(true);
const islog = ref(false);
const isbook = ref(false);
const isLogin = ref(false);
const loginResult = ref(null);

const triggerFlag = ref(false); //  控制子組件是否觸發 triggerGirl 的旗標


const talkwhat = (data) =>{
  newdata.value = data ;
	sendString();
}


const see = () =>{
  if (!document.hidden) {
     // 當網頁變成可見時發出訊號
		triggerFlag.value = 'useing';
  }
}


const headerclick = () => {
	if (now_stat.value === 'now') {
    now_stat.value = 'log';
  } else if (now_stat.value === 'log') {
    now_stat.value = 'now';
  } else if (now_stat.value === 'book') {
    now_stat.value = 'now';
  }

}

const sendString = async () => {

  try {
		if (newdata.value === '喝')
		{
			triggerFlag.value = '喝';
		}else {
			const response = await axios.post('http://122.254.17.181:6996/api/talk/', {string: newdata.value})
			console.log('Response:', response.data)
			changes.value = newdata.value ;

			triggerFlag.value = 'add';

		}
  } catch (error) {
    console.error('Error sending string:', error)
  }
}
// 接收子組件傳遞的登入狀態
const handleLoginStatus = (status) => {
  loginResult.value = status;
	isLogin.value = status;
  console.log('接收到的登入狀態:', status);
	triggerFlag.value = 'come';
};

watch(now_stat,(newdata) => {
	if (newdata === 'now'){
		isnow.value=true;
		islog.value=false;
		isbook.value=false ;
		changes.value = 'now';
}
		if (newdata === 'log'){
		isnow.value=false;
		islog.value=true;
		isbook.value=false;
		changes.value = 'log';
}
	if (newdata === 'book'){
		isnow.value=false;
		islog.value=false;
		isbook.value=true;
		changes.value='book';
}

});




onMounted(() => {
  // 觸發後，如果需要限制只觸發一次，可以考慮在這裡將 triggerFlag 設回 false
  // 但在這個例子中，讓旗標保持 true，讓子組件在整個生命週期都處於 "準備好被觸發" 的狀態，可能更符合需求
	document.addEventListener('visibilitychange', see);


});



</script>


<style scoped>
.slide-leave-active,
.slide-enter-active {
  transition: all .6s ease;
  position : absolute; 
	transform: translateX(20%);
}

.slide-enter-from {
	transform: translateX(200%);
}

.slide-leave-to {
	transform: translateX(-100%);
}



/* 針對自定義組件 A 的樣式 */
.A {
	position: fixed;
	top: 0;
	left: 0; /* 或根據需要調整 */
	z-index:999;
	width: 100%;
	background-color: rgba(255, 255, 255, 0.5);
}
</style>
