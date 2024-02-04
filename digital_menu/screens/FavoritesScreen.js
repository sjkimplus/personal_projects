import { Text, View, StyleSheet, FlatList } from 'react-native';
import { MEALS } from '../data/dummy-data';
import { useContext } from 'react';
import { FavoritesContext } from '../storage/context/favorites-context';
import SelectedMealItem from '../components/SelectedMealItem';

function FavoritesScreen() {
	const favoriteMealsCtx = useContext(FavoritesContext);

	// array of favorite meals
	let favoriteMeals = MEALS.filter((meal) => favoriteMealsCtx.ids.includes(meal.id));
	if (favoriteMeals.length == 0) {
		return (<View style={styles.nameContainer}>
			<Text style={styles.name}>Empty</Text>
		</View>
		);
	}
	
	function renderMealItem(itemData) {
		const item = itemData.item;
		const mealItemProps = {
			id: item.id,
			name: item.title,
			imageURL: item.imageUrl,
			affordability: item.affordability,
			complexity: item.complexity,
			duration: item.duration
		}

		return (
			<SelectedMealItem {...mealItemProps} />			
		);
	}


	return (
		<View style={styles.container}>
			<FlatList 
			data={favoriteMeals} 
			keyExtractor={(item) => item.id}
			renderItem={renderMealItem}
			/>
		</View>
	);
}
export default FavoritesScreen;

const styles = StyleSheet.create({
	name: {
		color: 'grey',
		fontSize: 80,
		fontWeight: '100',
		textAlign: 'center'
	},
	nameContainer: {
		flex: 1,
		marginTop: '50%'
	},
	container: {
		flex: 1,
		padding: 16
	}
});