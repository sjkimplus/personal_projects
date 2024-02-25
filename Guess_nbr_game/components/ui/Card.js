import { View, StyleSheet } from 'react-native';


function Card({children}) {
	return( <View style={styles.card}>{children}</View>

	);
}

export default Card;

const styles = StyleSheet.create({
	
	card: {
		justifyContent: 'center', // align items across the main axis
		alignItems: 'center', // align items across the non-main axis
		padding: 16,
		marginHorizontal: 24,
		marginTop: 35,
		backgroundColor: "#fa4a14",
		borderRadius: 8,
		elevation: 100, // shadow for only android
		shadowColor: 'black', // iOS
		shadowOffset: {width: 0, height: 2}, //iOS
		shadowRadius: 6, // iOS
		shadowOpacity: 0.95 // iOS
	},


});