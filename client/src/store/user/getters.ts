export const getters = {
	isAuth: (state) => (state.token) ? true : false,
	getToken: (state) => state.token,
}