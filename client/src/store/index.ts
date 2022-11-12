import { createStore } from 'vuex';
import userModule from './user'

export const store = createStore({
	modules: {
		user: userModule
	}
});