<template>
	<div class="auth-block">
		<ul>
			<li>
				<label for="username">username:</label>
				<input type="text" id="username" v-model="username">
			</li>
			<li>
				<label for="password">password:</label>
				<input type="text" id="password" v-model="password">
			</li>
		</ul>
		<button @click="loginClick">Login</button>
	</div>

	<RouterLink to="/signUp">signUp</RouterLink>
</template>
<script setup lang="ts">
	import { ref } from 'vue';
	import { RouterLink, useRouter } from 'vue-router';
	import { useStore } from 'vuex';

	import { login } from '../api/authApi.ts';

	const store = useStore();
	const router = useRouter();

	let username = ref("");
	let password = ref("");

	const loginClick = (): void => {
		login(username.value, password.value)
			.then(res => {
				const token = res.data;
				
				store.commit('user/setToken', token);
				router.push('/');
			})
			.catch(err => console.log(err));
	} 
</script>