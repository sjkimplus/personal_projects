import { MEALS } from '../data/dummy-data';
import { View, StyleSheet, FlatList } from 'react-native';
import { useLayoutEffect } from 'react';
import MealItem from '../components/MealItem';

function MealOverViewScreen({ route, navigation }) {
	// the route prop allows you to access the
	// paramter that was passed in when loading this screen
	const catId = route.params.categoryId;
	const catTitle = route.params.categoryTitle;
	const displayedMeals = MEALS.filter((meal) => {
		// will return -1 if the catId does not exist in the categoryIds of the dish
		return meal.categoryIds.indexOf(catId) >= 0;
	});

	useLayoutEffect(() => {
		navigation.setOptions({
			title: catTitle
		});
	}, [navigation]);


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
			<MealItem {...mealItemProps} />
		);	
	}

	return (
		<View style={styles.container}>
			<FlatList 
			data={displayedMeals} 
			keyExtractor={(item) => item.id}
			renderItem={renderMealItem}
			/>
		</View>
	);
}

export default MealOverViewScreen;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 16,
		backgroundColor: 'grey'
	}
})