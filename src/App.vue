<template>
	<login v-if="!isLogin" @loginStatus="handleLoginStatus"/>
	<div v-if="isLogin" >
	<transition name='slide' v-if="isLogin">
	<lists v-if='isnow' :fetch="changes" @headerClicked='headerclick'/>
	<loglist v-else-if='islog' :fetch="changes" @headerClicked='headerclick'/>
	<booklist v-else-if='isbook' :fetch="changes" @headerClicked='headerclick'/>
	</transition>

	<keepcomponent/>

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
import keepcomponent from './components/KeepS.vue'
import axios from 'axios'
const newdata = ref('');
const now_stat = ref('now');
const changes = ref('');
const isnow = ref(true);
const islog = ref(false);
const isbook = ref(false);
const isLogin = ref(false);
const loginResult = ref(null);





const talkwhat = (data) =>{
  newdata.value = data ;
	console.log('talk',data);
	sendString();

}


const headerclick = () => {
	if (now_stat.value === 'now') {
    now_stat.value = 'log';
  } else if (now_stat.value === 'log') {
    now_stat.value = 'book';
  } else if (now_stat.value === 'book') {
    now_stat.value = 'now';
  }

}

const sendString = async () => {
  try {
    const response = await axios.post('http://122.254.17.181:6996/api/talk/', {string: newdata.value})
    console.log('Response:', response.data)
		changes.value = newdata.value ;
  } catch (error) {
    console.error('Error sending string:', error)
  }
}
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

</style>
