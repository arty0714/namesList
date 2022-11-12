<template>
	<div class="item">
		<div class="rank">
			{{ props.rank }}
		</div>
		<div v-if="!update" class="name">
			{{ props.name }}
		</div>
		<div v-else>
			<input type="text" v-model="newValue">
		</div>
		<div class="buttons">
			<div class="button" @click="updateClick">update</div>
			<div class="button" @click="deleteClick">delete</div>
		</div>
	</div>
</template>
<script setup lang="ts">
	import { ref } from 'vue';

	const emit = defineEmits(["deleteClick", "updateClick"]);
	const props = defineProps(["name", "id", 'rank']);

	let newValue = ref(props.name);
	let update = ref(false);

	const updateClick = (): void => {
		if (update.value) {
			emit("updateClick", {
				id: props.id,
				name: newValue.value
			});
		}
		
		update.value = !update.value;
	}
	const deleteClick = (): void => {
		emit("deleteClick", props.id);
	}
</script>
<style scoped>
	.item {
		display: flex;
		flex-direction: row;
		justify-content: space-between;

		cursor: grab;
		border: 1px black solid;
		width: 300px;
	}
	.buttons {
		display: flex;
		flex-direction: row;
		justify-content: end;
		gap: 15px;
	}
	.button {
		cursor: pointer;
	}
	.name {
		width: 150px;
		word-wrap: anywhere;
	}
</style>