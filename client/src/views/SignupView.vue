<template>
	<ul>
		<li>
			<label for="username">username:</label>
			<input type="text" id="username" v-model="username">
		</li>
		<li>
			<label for="password">password:</label>
			<input type="password" id="password" v-model="password">
		</li>
		<li>
			<label for="password2">repeat password:</label>
			<input type="password" id="password2" v-model="password2">
		</li>
	</ul>
	<button @click="signUp">SignUp</button>
</template>
<script setup lang="ts">
	import { signUp as apiSignUp } from "@/api/authApi"
	import { ref } from "vue";
	import { useRouter } from "vue-router";

	const router = useRouter();

	let username: string = ref("");
	let password: string = ref("");
	let password2: string = ref("");

	const signUp = (): void => {
		if (password.value !== password2.value) {
			console.log("passwors don't match")
			return;
		}
		if (!username.value) {
			console.log("username cannot be empty")
			return;
		}

		apiSignUp(username.value, password.value)
			.then(res => {
				console.log(res);
				router.push('/')
			})
			.catch(err => console.log(err));
	}
</script>