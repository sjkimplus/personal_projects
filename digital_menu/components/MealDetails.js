import {Text, View, StyleSheet} from 'react-native';

function MealDetails({complexity, affordability, txtstyle}) {
	return(
		<View style={styles.details}>
			<Text style={[styles.detailItem, txtstyle]}>{complexity.toUpperCase()}</Text>
			<Text style={[styles.detailItem, txtstyle]}>{affordability.toUpperCase()}</Text>
		</View>
	);
}

export default MealDetails;

const styles = StyleSheet.create({

	details: {
		flexDirection: 'row',
		justifyContent: 'center',
		padding: 8
	},

	detailItem: {
		marginHorizontal: 4,
		fontSize: 15,
	}

});
