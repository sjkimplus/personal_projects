import { StyleSheet, Platform } from "react-native";

const shadow = StyleSheet.create({
	mealItem: {
		margin: 16,
		borderRadius: 8,
		overflow: 'hidden',
		backgroundColor: 'white',
		elevation: 4,
		shadowColor: 'black',
		shadowOpacity: 0.35,
		shadowOffset: { width: 0, height: 2 },
		shadowRadius: 8,
		overflow: Platform.OS === 'android' ? 'hidden' : 'visible'
	}

});

export {shadow};