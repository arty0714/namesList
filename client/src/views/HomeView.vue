<template>
	<AddItem @add-item="addName"/>
	<VueDraggableNext :list="names" @change="updateRank">
		<div v-for="(name, index) in names">
			<Item :name="name.name" :id="name.id" @update-click="updateName" @delete-click="deleteName" :rank="index + 1" />
		</div>
	</VueDraggableNext>
</template>
<script setup lang="ts">
	import { VueDraggableNext } from 'vue-draggable-next';
	import { reactive, onMounted } from 'vue';
	import Item from '../components/Item.vue';
	import AddItem from '../components/AddItem.vue';
	import * as userApi from '../api/userApi';

	let names = reactive([{}]);

	const updateRank = (event) => {
		const oldPos = event.moved.oldIndex;
		const newPos = event.moved.newIndex;

		userApi.updateRank(oldPos, newPos)
			.then(result => {
				updateNames();
			})
	}

	const updateNames = (): void => {
		names.splice(0);

		userApi.getNames()
			.then(result => {
				result.data.forEach(name => names.push(name))
			})
			.catch(error => console.log(error));
	}
	const addName = (newName): void => {
		userApi.addName(newName)
			.then(res => {
				updateNames()
			})
			.catch(err => console.log(err));
	}
	const deleteName = (nameId: number): void => {
		userApi.deleteNameById(nameId)
			.then(res => {
				updateNames();
			})
			.catch(err => console.log(err));
	}
	const updateName = (nameObj: nameObj): void => {
		userApi.updateNameById(nameObj.id, nameObj.name)
			.then(res => {
				updateNames();
			})
			.catch(err => console.log(err));
	}

	onMounted(() => {
		updateNames();
	})
</script>
