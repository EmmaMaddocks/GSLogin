import {
	View,
	Text,
	StyleSheet,
	SafeAreaView,
	FlatList,
	TouchableOpacity,
	SectionList,
} from "react-native";
import React, { useContext, useState } from "react";
// import { useDataContext } from "../context/ReferenceDataContext";
import moment from "moment";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";

const Item = ({
	item,
	backgroundColor,
	textColor,
	// navigation,
	iconName,
	iconColour,
}) => (
	<TouchableOpacity
		// onPress={() =>
		// 	navigation.navigate("IndividualNote", {
		// 		item: item,
		// 		iconName: iconName,
		// 		iconColour: iconColour,
		// 		backgroundColor: backgroundColor,
		// 	})
		// }
		style={[styles.noteContainer]}
	>
		<View style={[styles.noteColor, backgroundColor]}>
			<Ionicons name={iconName} size={35} color={iconColour} />
		</View>
		<View style={styles.noteContent}>
			<View
				style={{
					flexDirection: "row",
					justifyContent: "space-between",
					alignItems: "center",
				}}
			>
				<Text style={styles.noteTitle}>{item.title}</Text>
				<Text style={styles.noteTime}>
					{moment(item.note_time).format("h.mma")}
				</Text>
			</View>
			<Text style={styles.noteTime}>Added by {item.person_name}</Text>
		</View>
	</TouchableOpacity>
);

export default function NotesList({ data, setData }) {
	// const { setData, data } = useDataContext();
	const [selectedId, setSelectedId] = useState(null);

	const renderItem = ({ item }) => {
		const backgroundColor =
			item.title === "Booking"
				? "#43AA8B70"
				: item.title === "Accident"
				? "#F9414470"
				: item.title === "Phone Call"
				? "#A064BC70"
				: item.title === "General Note"
				? "#F9C74F70"
				: item.title === "Complaint"
				? "#F8961E70"
				: item.title === "Fridge Check"
				? "#2a9ec570"
				: "pink";
		const color = item.note_uid === selectedId ? "white" : "black";

		const iconName =
			item.title === "Booking"
				? "md-restaurant-outline"
				: item.title === "Accident"
				? "md-warning-outline"
				: item.title === "Phone Call"
				? "call-outline"
				: item.title === "General Note"
				? "md-pencil"
				: item.title === "Complaint"
				? "ios-chatbubbles-outline"
				: item.title === "Fridge Check"
				? "ios-thermometer-outline"
				: "pink";

		const iconColour =
			item.title === "Booking"
				? "#43AA8B"
				: item.title === "Accident"
				? "#F94144"
				: item.title === "Phone Call"
				? "#A064BC"
				: item.title === "General Note"
				? "#F9C74F"
				: item.title === "Complaint"
				? "#F8961E"
				: item.title === "Fridge Check"
				? "#2a9ec5"
				: "pink";

		return (
			<Item
				item={item}
				backgroundColor={{ backgroundColor }}
				textColor={{ color }}
				// navigation={navigation}
				iconName={iconName}
				iconColour={iconColour}
			/>
		);
	};

	// const notesByDate = data.filter(function (element) {
	// 	return moment(element.note_time).format("LL") === dateSelected;
	// });

	const morning = data.filter(
		(element) => moment(element.note_time).format("a") === "am"
	);
	const afternoon = data.filter(
		(element) => moment(element.note_time).format("a") === "pm"
	);

	return (
		<SafeAreaView style={styles.container}>
			<SectionList
				style={styles.listContainer}
				contentContainerStyle={{ paddingBottom: 100 }}
				sections={[
					{ title: "Morning", data: morning },
					{ title: "Afternoon", data: afternoon },
				]}
				ItemSeparatorComponent={() => <View style={{ height: 15 }} />}
				keyExtractor={(item, index) => item.note_uid + index}
				renderItem={renderItem}
				renderSectionHeader={({ section: { title }, section }) =>
					section.data.length > 0 ? (
						<View style={styles.sectionHeader}>
							<Text style={styles.header}>{title}</Text>
						</View>
					) : (
						<></>
					)
				}
				SectionSeparatorComponent={() => <View style={styles.section} />}
				showsVerticallScrollIndicator={false}
				bounces={false}
			/>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	container: { flex: 1 },
	listContainer: {
		height: "80%",
		paddingLeft: 20,
		paddingRight: 20,
		paddingBottom: 165,
		backgroundColor: "#f8f8f7",
	},
	noteContainer: {
		flexDirection: "row",
		height: 100,
		alignItems: "center",
		justifyContent: "space-between",
		padding: 10,
		borderRadius: 20,
		shadowOffset: { width: 0, height: 7 },
		shadowColor: "#C5C5C6",
		shadowOpacity: 0.5,
		shadowRadius: 5,
		backgroundColor: "white",
	},
	noteColor: {
		height: 100,
		position: "absolute",
		alignSelf: "flex-start",
		justifyContent: "center",
		alignContent: "center",
		padding: 20,
		borderTopLeftRadius: 20,
		borderBottomLeftRadius: 20,
		backgroundColor: "white",
	},
	noteContent: {
		flexDirection: "column",
		marginLeft: 80,
		width: 280,
	},
	noteAuthor: {
		color: "black",
		fontFamily: "Montserrat_500Medium",
	},
	noteDescription: {
		color: "black",
		fontFamily: "Montserrat_400Regular",
	},
	noteTime: {
		color: "black",
		fontFamily: "Montserrat_300Light",
	},
	noteTitle: {
		color: "black",
		marginBottom: 5,
		fontSize: 20,
		fontFamily: "Montserrat_500Medium",
	},
	header: {
		fontSize: 15,
		fontFamily: "Montserrat_700Bold",
		padding: 20,
	},
	sectionHeader: {
		// backgroundColor: "white",
		paddingBottom: 10,
	},
	noEntries: {
		alignSelf: "center",
		fontSize: 20,
		fontFamily: "Montserrat_500Medium",
	},
});
