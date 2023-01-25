import { useContext, useState } from "react";
import { Alert } from "react-native";

import AuthContent from "../components/Auth/AuthContent";
import LoadingOverlay from "../components/ui/LoadingOverlay";
import { AuthContext } from "../store/auth-context";
import { login } from "../util/auth";

function LoginScreen() {
	const [isAuthenticating, setIsAuthenticating] = useState(false);

	const authCtx = useContext(AuthContext);

	async function loginHandler({ username, password }) {
		setIsAuthenticating(true);
		try {
			const token = await login(username, password);
			authCtx.authenticate(token);
		} catch (error) {
			Alert.alert(
				"Authentication failed!",
				"Could not log you in. Please check your credentials or try again later!"
			);
			console.log(error);
			setIsAuthenticating(false);
		}
	}

	if (isAuthenticating) {
		return <LoadingOverlay message="Logging you in..." />;
	}

	return <AuthContent isLogin onAuthenticate={loginHandler} />;
}

export default LoginScreen;
