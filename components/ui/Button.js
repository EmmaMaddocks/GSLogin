import { Pressable, StyleSheet, Text, View } from "react-native";

import { Colors } from "../../constants/styles";

function Button({ children, onPress }) {
	return (
		<Pressable
			style={({ pressed }) => [styles.button, pressed && styles.pressed]}
			onPress={onPress}
		>
			<View>
				<Text style={styles.buttonText}>{children}</Text>
			</View>
		</Pressable>
	);
}

export default Button;

const styles = StyleSheet.create({
	button: {
		borderRadius: 20,
		paddingVertical: 20,
		paddingHorizontal: 16,
		backgroundColor: Colors.gsblue,
		elevation: 2,
		shadowOffset: { width: 6, height: 7 },
		shadowColor: "lightgrey",
		shadowOpacity: 0.8,
		shadowRadius: 10,
		marginTop: 40,
	},
	pressed: {
		opacity: 0.7,
	},
	buttonText: {
		textAlign: "center",
		color: "#FFFFFF",
		fontSize: 16,
		fontFamily: "Montserrat_500Medium",
	},
});
