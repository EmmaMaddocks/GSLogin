import { useState } from "react";
import { Alert, StyleSheet, View, Text, Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";

import FlatButton from "../ui/FlatButton";
import AuthForm from "./AuthForm";
import { Colors } from "../../constants/styles";
import ButtonOutlined from "../ui/ButtonOutlined";

function AuthContent({ isLogin, onAuthenticate }) {
	const navigation = useNavigation();

	const [credentialsInvalid, setCredentialsInvalid] = useState({
		username: false,
		password: false,
		confirmUsername: false,
		confirmPassword: false,
	});

	function switchAuthModeHandler() {
		if (isLogin) {
			navigation.replace("Signup");
		} else {
			navigation.replace("Login");
		}
	}

	function submitHandler(credentials) {
		let { username, confirmUsername, password, confirmPassword } = credentials;

		const usernameIsValid = username.length > 1;
		const passwordIsValid = password.length > 6;
		const usernamesAreEqual = username === confirmUsername;
		const passwordsAreEqual = password === confirmPassword;

		if (
			!usernameIsValid ||
			!passwordIsValid ||
			(!isLogin && (!usernamesAreEqual || !passwordsAreEqual))
		) {
			Alert.alert("Invalid input", "Please check your entered credentials.");
			setCredentialsInvalid({
				email: !usernameIsValid,
				confirmUsername: !usernameIsValid || !usernamesAreEqual,
				password: !passwordIsValid,
				confirmPassword: !passwordIsValid || !passwordsAreEqual,
			});
			return;
		}
		onAuthenticate({ username, password });
	}

	return (
		<View style={styles.authContent}>
			<Text style={styles.heading}>
				{isLogin ? "Welcome Back" : "Create an account"}
			</Text>
			<Text style={styles.subheading}>
				{isLogin ? "Log in to your account" : null}
			</Text>

			<AuthForm
				isLogin={isLogin}
				onSubmit={submitHandler}
				credentialsInvalid={credentialsInvalid}
			/>
			<View style={styles.buttons}>
				<ButtonOutlined onPress={switchAuthModeHandler}>
					{isLogin ? "Create a new user" : "Log in instead"}
				</ButtonOutlined>
			</View>
			{isLogin ? (
				<Pressable>
					<Text style={styles.link}>Forgot password?</Text>
				</Pressable>
			) : null}
		</View>
	);
}

export default AuthContent;

const styles = StyleSheet.create({
	authContent: {
		flex: 1,
		padding: 36,
		backgroundColor: "#FFFFFF",
		alignContent: "center",
		justifyContent: "center",
	},
	buttons: {
		marginTop: 0,
	},
	heading: {
		fontSize: 25,
		color: "black",
		marginTop: 55,
		fontFamily: "Montserrat_700Bold",
	},
	subheading: {
		fontSize: 18,
		color: "grey",
		marginTop: 5,
		fontFamily: "Montserrat_500Medium",
	},
	link: {
		color: "black",
		textAlign: "center",
		marginTop: 20,
		fontSize: 16,
		fontFamily: "Montserrat_500Medium",
	},
});
