import React, { useState, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { Pedometer } from "expo-sensors";
import CircularProgress from "react-native-circular-progress-indicator";

export default function App() {
	const [pedometerAvailability, setPedometerAvailability] = useState("");
	const [stepCount, updateStepCount] = useState(0);

	useEffect(() => {
		subscribe();
	}, []);
	subscribe = () => {
		const subscription = Pedometer.watchStepCount((result) => {
			updateStepCount(result.steps);
		});
	};
	Pedometer.isAvailableAsync().then(
		(result) => {
			setPedometerAvailability(String(result));
		},
		(error) => {
			setPedometerAvailability(error);
		}
	);

	return (
		<View style={styles.container}>
			{/* <Text style={styles.headingDesign}>
				Is the Pedometer Availabe? : {pedometerAvailability}
			</Text> */}
			{/* <Text style={styles.headingDesign}>Current Steps: {stepCount}</Text> */}
			<View>
				<CircularProgress
					value={stepCount}
					maxValue={10000}
					radius={210}
					textcolor="white"
					activeStrokeColor="green"
					inActiveStrokeColor="grey"
					inActiveStrokeOpacity={2.5}
					inactiveStrokeWidth={60}
					title={"Hot Girl Steps"}
					titleColor="white"
					titleStyle={{ fontSize: 30, fontWeight: "bold" }}
				></CircularProgress>
			</View>
			<StatusBar style="auto" />
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "black",
		alignItems: "center",
		justifyContent: "center",
	},
	headingDesign: {
		color: "white",
		fontSize: 24,
	},
});
