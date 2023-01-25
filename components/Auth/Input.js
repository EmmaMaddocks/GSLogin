import { View, Text, TextInput, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

// import { Colors } from "../../constants/styles";

function Input({
	label,
	keyboardType,
	secure,
	onUpdateValue,
	value,
	isInvalid,
	iconName,
}) {
	return (
		<View style={styles.inputContainer}>
			<Text style={[styles.label, isInvalid && styles.labelInvalid]}>
				{label}
			</Text>
			<View style={styles.inputBox}>
				<Ionicons name={iconName} size={24} color={"grey"} />

				<TextInput
					style={[styles.input, isInvalid && styles.inputInvalid]}
					autoCapitalize={false}
					keyboardType={keyboardType}
					secureTextEntry={secure}
					onChangeText={onUpdateValue}
					value={value}
				/>
			</View>
		</View>
	);
}

export default Input;

const styles = StyleSheet.create({
	inputBox: {
		borderColor: "lightgrey",
		borderBottomWidth: 1,
		flexDirection: "row",
		padding: 10,
	},
	label: {
		color: "grey",
		// marginBottom: 4,
		alignSelf: "flex-start",
		fontSize: 18,
		marginTop: 30,
		marginBottom: 10,
		fontFamily: "Montserrat_500Medium",
	},
	labelInvalid: {
		color: "red",
	},
	input: {
		paddingVertical: 0,
		backgroundColor: "white",
		fontSize: 18,
		marginTop: 0,
		paddingLeft: 15,
		flex: 2,
		alignSelf: "center",
		fontFamily: "Montserrat_500Medium",
	},
	inputInvalid: {
		// backgroundColor: "blue",
	},
});
