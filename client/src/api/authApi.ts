import axios from 'axios';

const serverUrl: string = "http://localhost:5000/api";

export const login = async(username: string, password: string) => {
	let result: any;

	try {
		result = await axios.post(`${serverUrl}/auth/logIn`, {
			username,
			password
		})
	} catch (error) {
		throw error;
	}

	return result;
}

export const signUp = async (username: string, password: string) => {
	let result: any;

	try {
		result = await axios.post(`${serverUrl}/auth/signUp`, {
			username,
			password
		})
	} catch (error) {
		throw error;
	}

	return result;
}