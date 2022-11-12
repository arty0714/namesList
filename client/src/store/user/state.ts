export const state = () => {
	const cookieStr: string = document.cookie;
	const cookieArr: string[] = cookieStr.split('=')

	interface Cookie {
		token: string
	}

	let cookie: Cookie = { token: '' };

	if (cookieArr.length = 2) {
		cookie[cookieArr[0]] = cookieArr[1];
	}

	return {
		token: cookie.token,
	}
}