import { useContext, useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StatusBar } from "expo-status-bar";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as SplashScreen from "expo-splash-screen";

import AuthContextProvider, { AuthContext } from "./store/auth-context";
import IconButton from "./components/ui/IconButton";
import LoginScreen from "./Screens/LoginScreen";
import WelcomeScreen from "./Screens/WelcomeScreen";
import SignupScreen from "./Screens/SignUpScreen";
import { Colors } from "./constants/styles";
import {
	useFonts,
	Montserrat_100Thin,
	Montserrat_100Thin_Italic,
	Montserrat_200ExtraLight,
	Montserrat_200ExtraLight_Italic,
	Montserrat_300Light,
	Montserrat_300Light_Italic,
	Montserrat_400Regular,
	Montserrat_400Regular_Italic,
	Montserrat_500Medium,
	Montserrat_500Medium_Italic,
	Montserrat_600SemiBold,
	Montserrat_600SemiBold_Italic,
	Montserrat_700Bold,
	Montserrat_700Bold_Italic,
	Montserrat_800ExtraBold,
	Montserrat_800ExtraBold_Italic,
	Montserrat_900Black,
	Montserrat_900Black_Italic,
} from "@expo-google-fonts/montserrat";

const Stack = createNativeStackNavigator();

SplashScreen.preventAutoHideAsync();

function AuthStack() {
	return (
		<Stack.Navigator
			screenOptions={{
				headerShown: false,
			}}
		>
			<Stack.Screen name="Login" component={LoginScreen} />
			<Stack.Screen name="Signup" component={SignupScreen} />
		</Stack.Navigator>
	);
}

function AuthenticatedStack() {
	const authCtx = useContext(AuthContext);
	return (
		<Stack.Navigator
			screenOptions={{
				headerStyle: { backgroundColor: Colors.gsblue },
				headerTintColor: "white",
				contentStyle: { backgroundColor: Colors.gsblue },
				headerShadowVisible: false,
				headerTitleStyle: { color: Colors.gsblue },
			}}
		>
			<Stack.Screen
				name="Welcome"
				component={WelcomeScreen}
				options={{
					headerRight: ({ tintColor }) => (
						<IconButton
							icon="exit"
							color={tintColor}
							size={24}
							onPress={authCtx.logout}
						/>
					),
				}}
			/>
		</Stack.Navigator>
	);
}

function Navigation() {
	const authCtx = useContext(AuthContext);

	return (
		<NavigationContainer>
			{!authCtx.isAuthenticated && <AuthStack />}
			{authCtx.isAuthenticated && <AuthenticatedStack />}
		</NavigationContainer>
	);
}

function Root() {
	const [isTryingLogin, setIsTryingLogin] = useState(true);

	const authCtx = useContext(AuthContext);

	useEffect(() => {
		async function fetchToken() {
			const storedToken = await AsyncStorage.getItem("token");
			console.log(storedToken);

			if (storedToken !== null) {
				authCtx.authenticate(storedToken);
			}
			await SplashScreen.hideAsync();
			setIsTryingLogin(false);
		}

		fetchToken();
	}, []);

	if (isTryingLogin) {
		return null;
	}

	return <Navigation />;
}

export default function App() {
	let [fontsLoaded] = useFonts({
		Montserrat_100Thin,
		Montserrat_100Thin_Italic,
		Montserrat_200ExtraLight,
		Montserrat_200ExtraLight_Italic,
		Montserrat_300Light,
		Montserrat_300Light_Italic,
		Montserrat_400Regular,
		Montserrat_400Regular_Italic,
		Montserrat_500Medium,
		Montserrat_500Medium_Italic,
		Montserrat_600SemiBold,
		Montserrat_600SemiBold_Italic,
		Montserrat_700Bold,
		Montserrat_700Bold_Italic,
		Montserrat_800ExtraBold,
		Montserrat_800ExtraBold_Italic,
		Montserrat_900Black,
		Montserrat_900Black_Italic,
	});

	// if (!fontsLoaded) {
	// 	return null;
	// } else {
	return (
		<>
			<StatusBar style="light" />
			<AuthContextProvider>
				<Root />
			</AuthContextProvider>
		</>
	);
}
// }
