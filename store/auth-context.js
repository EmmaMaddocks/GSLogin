import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext({
	token: "",
	isAuthenticated: false,
	authenticate: (token) => {},
	logout: () => {},
});

function AuthContextProvider({ children }) {
	const [authToken, setAuthToken] = useState();

	function authenticate(token) {
		setAuthToken(token);
		AsyncStorage.setItem("token", token);
	}

	async function logout() {
		const url = `https://max-suite-demo.gs-systems.co.uk/api/auth/logout`;
		const response = await axios.post(url);
		console.log(response);
		setAuthToken(null);
		AsyncStorage.removeItem("token");
	}

	const value = {
		token: authToken,
		isAuthenticated: !!authToken,
		authenticate: authenticate,
		logout: logout,
	};

	return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export default AuthContextProvider;
