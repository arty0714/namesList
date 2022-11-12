import { state } from './state';
import { getters } from './getters';
import { mutations } from './mutations';

const store = {
	namespaced: true,
	state,
	getters,
	mutations
}

export default store;