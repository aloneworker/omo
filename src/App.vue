<template>

	<login v-if="!isLogin" @loginStatus="handleLoginStatus"/>
	<div v-if="isLogin">
	<transition name='slide' v-if="isLogin">
	<lists v-if='isnow' :fetch="changes" @headerClicked='headerclick'/>
	<loglist v-else-if='islog' :fetch="changes" @headerClicked='headerclick'/>
	<booklist v-else-if='isbook' :fetch="changes" @headerClicked='headerclick'/>
	</transition>
	<!--
  <girl :show='showgirl' class="floating-element" @swipe-right='girl_right' @swipe-left='girl_left'/>
	<talk :message='talking'/>
	!-->
	<flatb @sendInput="talkwhat"/>
	</div>
</template>

<script setup>
import { ref,watch } from 'vue'
import lists from './components/ListS.vue'
import loglist from './components/ListLog.vue'
import booklist from './components/ListBook.vue'
import flatb from './components/FlatBott.vue'
import login from './components/LogIn.vue'

//import girl from './components/GirLs.vue'
//import talk from './components/TalkBox.vue'
import axios from 'axios'
const newdata = ref('');
const now_stat = ref('now');
const changes = ref('');
const isnow = ref(true);
const islog = ref(false);
const isbook = ref(false);
const isLogin = ref(true);
const loginResult = ref(null);
//const showgirl = ref(true);
//const talking = ref('');
//const talkwhat = (data) =>{
//	showgirl.value = !showgirl.value
//  newdata.value = data ;
//	console.log('talk',data);
//	sendString();

//}

//const girl_left = () => {
//	alert('girl lift');
//}

//const girl_right = () => {
//	alert('girl right');
//}

const headerclick = () => {
	if (now_stat.value === 'now') {
    now_stat.value = 'log';
  } else if (now_stat.value === 'log') {
    now_stat.value = 'book';
  } else if (now_stat.value === 'book') {
    now_stat.value = 'now';
  }

}

//const sendString = async () => {
//  try {
//    const response = await axios.post('http://122.254.17.181:6996/api/talk/', {
//      string: newdata.value
//    })
//    console.log('Response:', response.data)
//		changes.value = newdata.value ;
//  } catch (error) {
//    console.error('Error sending string:', error)
//  }
//}
// 接收子組件傳遞的登入狀態
const handleLoginStatus = (status) => {
  loginResult.value = status;
	isLogin.value = status;
  console.log('接收到的登入狀態:', status);
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

.floating-element {
  position: fixed; /* 元件會固定在螢幕某位置，隨捲動不變 */
  top: 0;       /* 距離畫面底端 0px */
  left: 50%;       /* 水平置中 */
  width: 100%; /* 寬度佔滿容器 */
  height: auto; /* 根據寬度自動調整高度，保持比例 */
  display: block; /* 移除底部多餘的間距 */

	transform: translateX(-50%); /* 將元素的中心對齊到畫面中心 */
  background-color: rgba(255, 255, 255,0.8); /* 半透明背景 */
  padding: 10px 20px; /* 內邊距 */
  border-radius: 10px; /* 圓角 */
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2); /* 陰影效果 */
  z-index: 1000;   /* 確保元件顯示在其他內容上方 */

  border: 5px solid rgba(10,60,190,0.8); /* 可選：加個邊框更直觀 */

}
</style>
