<template>
	<header>
		<RouterLink to="/">Home</RouterLink>
		<RouterLink to="/signIn" v-if='!isAuth'>SignIn</RouterLink>
		<button v-else @click="logout">Log Out</button>
	</header>
</template>
<script setup>
	import { RouterLink } from 'vue-router';
	import { useStore } from 'vuex';
	import { computed } from 'vue';
	import { useRouter } from 'vue-router';

	const store = useStore();
	const router = useRouter();

	let isAuth = computed(() => store.getters['user/isAuth']);

	const logout = () => {
		store.commit('user/setToken', '');
		router.push('/signIn')
	}
</script>
<style scoped>
	header {
		display: flex;
		flex-direction: row;
		gap: 10px;
	}
</style>