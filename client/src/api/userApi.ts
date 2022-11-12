import axios from "axios";
import { store } from '../store';


const serverUrl: string = "http://localhost:5000/api/user";

export const getNames = async () => {
	let result: any;
	const token = store.getters['user/getToken'] || '';

	try {
		result = await axios.get(`${serverUrl}/names`, {
			headers: {
				"auth-token": token
			}
		});
	} catch (error) {
		throw error;
	}

	return result;
}

export const addName = async (name: string) => {
	let result: any;
	const token = store.getters['user/getToken'] || '';

	try {
		result = await axios
			.post(`${serverUrl}/names`, { name }, {
				headers: {
					'auth-token': token
				}
			});
	} catch(error) {
		throw error;
	}

	return result;
}

export const updateRank = async (oldPos: number, newPos: number) => {
	let result: any;
	const token = store.getters['user/getToken'] || '';

	try {
		result = await axios
			.post(`${serverUrl}/changeNameOrder`, {
				oldPos,
				newPos
			}, {
				headers: {
					'auth-token': token
				}
			});
	} catch (error) {
		throw error;
	}

	return result;
}

export const deleteNameById = async (id: number) => {
	let result: any;

	const token = store.getters['user/getToken'];

	try {
		result = await axios
			.delete(`${serverUrl}/names/${id}`, {
				params: { id },
				headers: {
					'auth-token': token
				}
			});
	} catch(error) {
		throw error;
	}

	return result;
}

export const updateNameById = async (id: number, name: string) => {
	let result: any;

	const token = store.getters['user/getToken'];

	try {
		result = await axios
			.put(`${serverUrl}/names/${id}`, {
				name
			}, {
				headers: {
					'auth-token': token
				}
			});
	} catch (error) {
		throw error;
	}

	return result;
}