export const mutations = {
	setToken: (state, token) => {
		state.token = token;
		document.cookie = `token=${token}`;
	}
}