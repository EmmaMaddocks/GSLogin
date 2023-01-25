import axios from "axios";

async function authenticate(username, password) {
	const url = `https://max-suite-demo.gs-systems.co.uk/api/auth/login`;

	const response = await axios.post(url, {
		username: username,
		password: password,
	});

	const token = response.data.token;
	console.log("token", response);
	console.log("res", response);

	if (response.data.validated) {
		return token;
	}
}

export function createUser(username, password) {
	return authenticate(username, password);
}

export function login(username, password) {
	return authenticate(username, password);
}

// async function logout() {
// 	const url = `https://max-suite-demo.gs-systems.co.uk/api/auth/logout`;

// 	const response = await axios.post(url);

// 	setAuthToken(null);
// 	AsyncStorage.removeItem("token");

// 	console.log("log out ", response);
// }
