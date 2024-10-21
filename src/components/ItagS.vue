<template>
  <div>
    <span :class="spnclass"
      @mousedown="onPress"
      @mouseup="handleMouseUp"
      @mouseleave="cancelTimeout"
      @touchstart="onPress"
      @touchend="handleMouseUp">
			<slot></slot>
		</span>
  </div>
</template>

<script setup>
	import { ref,defineEmits } from "vue";
	const spnclass = ref("badge bg-danger");
	let pressTimeout = null;
	let pressStartTime = null; // 記錄按下的開始時間
	let pressTimes = 0;
	// 按下時觸發
	const onPress = (event) => {
  event.preventDefault();
  pressStartTime = Date.now(); // 記錄按下的時間
  console.log("");
  
	setTimeout(() => {
		pressTimes = 0 ;
	},1500);

	// 計時 1 秒後執行長按動作
  pressTimeout = setTimeout(() => {
    console.log("長按動作");
		pressTimes = 0 ;
  }, 1000); // 1 秒後執行長按動作

};

	

	const emit = defineEmits(['tagStat']);


// 放開時觸發短按動作，並且檢查按下時間是否少於 1 秒
const handleMouseUp = () => {
  const pressDuration = Date.now() - pressStartTime; // 計算按下的持續時間
  cancelTimeout(); // 清除長按的計時器

  if (pressDuration < 1000) {
    console.log("短按動作"+ pressTimes);
		pressTimes += 1 ;
		triPress();
  }
};

// 取消計時器
const cancelTimeout = () => {
  if (pressTimeout) {
    clearTimeout(pressTimeout); // 清除長按計時器
    pressTimeout = null;
  }
};

const triPress = () => {
	if (pressTimes > 2) {
		pressTimes = 0 ;
		spnclass.value = "badge bg-secondary";
		emit('tagStat','誌');
	}

};

</script>


