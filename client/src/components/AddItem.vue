<template>
	<div class="add-item-block">
		<input type="text" v-model="item">
		<button @click="submit">Add item</button>
	</div>
</template>
<script setup lang="ts">
	import { ref } from 'vue';

	const emit = defineEmits(['addItem']);

	const item = ref("");

	const submit = () => {
		emit('addItem', item.value);
		
		item.value = "";
	}
</script>