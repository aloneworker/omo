<template>

	<div class="d-flex justify-content-center align-items-center" style="height: 60vh;">
  <div>
	<lists :fetch="changes"/>
  <flatb @sendInput="talkwhat"/>
  </div>
</div>

</template>

<script setup>
import { ref } from 'vue'
import lists from './components/ListS.vue'
import flatb from './components/FlatBott.vue'
import axios from 'axios'
const newdata = ref('');
const changes = ref('');
const talkwhat = (data) =>{
  newdata.value = data ;
	console.log('talk',data);
	sendString();

}




const sendString = async () => {
  try {
    const response = await axios.post('http://192.168.68.53:6996/api/talk/', {
      string: newdata.value
    })
    console.log('Response:', response.data)
		changes.value = newdata.value ;
  } catch (error) {
    console.error('Error sending string:', error)
  }
}


</script>

<style>
</style>
