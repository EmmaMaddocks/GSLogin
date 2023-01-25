import { useState } from "react";
import { StyleSheet, View, Pressable, Text } from "react-native";

import Button from "../ui/Button";
import Input from "./Input";

function AuthForm({ isLogin, onSubmit, credentialsInvalid }) {
	const [enteredUsername, setEnteredUsername] = useState("");
	const [enteredConfirmUsername, setEnteredConfirmUsername] = useState("");
	const [enteredPassword, setEnteredPassword] = useState("");
	const [enteredConfirmPassword, setEnteredConfirmPassword] = useState("");

	const {
		username: usernameIsInvalid,
		confirmUsername: usernamesDontMatch,
		password: passwordIsInvalid,
		confirmPassword: passwordsDontMatch,
	} = credentialsInvalid;

	function updateInputValueHandler(inputType, enteredValue) {
		switch (inputType) {
			case "username":
				setEnteredUsername(enteredValue);
				break;
			case "confirmUsername":
				setEnteredConfirmUsername(enteredValue);
				break;
			case "password":
				setEnteredPassword(enteredValue);
				break;
			case "confirmPassword":
				setEnteredConfirmPassword(enteredValue);
				break;
		}
	}

	function submitHandler() {
		onSubmit({
			username: enteredUsername,
			confirmUsername: enteredConfirmUsername,
			password: enteredPassword,
			confirmPassword: enteredConfirmPassword,
		});
	}

	return (
		<View style={styles.container}>
			<View style={styles.formContainer}>
				<Input
					label="Username"
					onUpdateValue={updateInputValueHandler.bind(this, "username")}
					value={enteredUsername}
					keyboardType="username"
					isInvalid={usernameIsInvalid}
					iconName={"md-person-outline"}
				/>
				{!isLogin && (
					<Input
						label="Confirm Username"
						onUpdateValue={updateInputValueHandler.bind(
							this,
							"confirmUsername"
						)}
						value={enteredConfirmUsername}
						keyboardType="username"
						isInvalid={usernamesDontMatch}
					/>
				)}
				<Input
					label="Password"
					onUpdateValue={updateInputValueHandler.bind(this, "password")}
					secure
					value={enteredPassword}
					isInvalid={passwordIsInvalid}
					iconName={"md-lock-closed-outline"}
				/>
				{!isLogin && (
					<Input
						label="Confirm Password"
						onUpdateValue={updateInputValueHandler.bind(
							this,
							"confirmPassword"
						)}
						secure
						value={enteredConfirmPassword}
						isInvalid={passwordsDontMatch}
					/>
				)}
				<View style={styles.buttons}>
					<Button onPress={submitHandler}>
						{isLogin ? "LOG IN" : "Sign Up"}
					</Button>
				</View>
			</View>
		</View>
	);
}

export default AuthForm;

const styles = StyleSheet.create({
	buttons: {
		marginTop: 12,
	},
});
