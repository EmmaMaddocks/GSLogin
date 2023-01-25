import axios from "axios";
import { useContext, useEffect, useState } from "react";

import { StyleSheet, Text, View } from "react-native";
import NotesList from "../components/NotesList";
import { AuthContext } from "../store/auth-context";
import { instance } from "../util/auth";

function WelcomeScreen() {
	const [data, setData] = useState([]);

	const authCtx = useContext(AuthContext);
	const token = authCtx.token;

	useEffect(() => {
		// change to api end point you want to fetch data from
		axios
			.get(
				"https://max-suite-demo.gs-systems.co.uk/api/Notes/getNotes/2023-01-11/1"
			)
			.then((response) => {
				setData(response.data);
				console.log("res", response);
			})
			.catch((error) => {
				console.log("err", error);
			});
	}, [token]);

	return (
		<View style={styles.rootContainer}>
			<Text style={styles.title}>You authenticated successfully</Text>
			{/* use to check data has been fetched */}
			{/* <NotesList data={data} setData={setData} /> */}
		</View>
	);
}

export default WelcomeScreen;

const styles = StyleSheet.create({
	rootContainer: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		padding: 32,
	},
	title: {
		fontSize: 20,
		fontWeight: "bold",
		marginBottom: 8,
		fontFamily: "Montserrat_500Medium",
		color: "white",
	},
});
