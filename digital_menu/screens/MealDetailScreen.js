import { useLayoutEffect, useContext } from 'react';
import {Text, View, Image, StyleSheet} from 'react-native';
import { MEALS } from '../data/dummy-data';
import MealDetails from '../components/MealDetails';
import IconButton from '../components/IconButton';
import { FavoritesContext } from '../storage/context/favorites-context';

function MealDetailScreen({route, navigation}) {
	const favoriteMealsCtx = useContext(FavoritesContext);
	const mealId = route.params.mealId;
	const selectedMeal = MEALS.find((meal) => meal.id === mealId);
	const mealsIsFav = favoriteMealsCtx.ids.includes(mealId);

	function favStatusHandler() {
		if (mealsIsFav) {
			favoriteMealsCtx.removeFavorite(mealId);
		} else {
			favoriteMealsCtx.addFavorite(mealId);
		}
		}
	
	useLayoutEffect(() => {
	navigation.setOptions({
		headerRight: () => {
		return (<IconButton 
		icon={mealsIsFav ? "basket" : "basket-outline" }
		color={mealsIsFav ? "#5df084" : "white" }
		onPress={favStatusHandler} />
		);
		}
	});
	}, [navigation, favStatusHandler]);

	return (
		<View style={styles.background}>
			<Image style={styles.image} source={{uri: selectedMeal.imageUrl}}/>
			<Text style={styles.name}>{selectedMeal.title}</Text>
			<MealDetails txtstyle={styles.subText}
			complexity={selectedMeal.complexity} 
			affordability={selectedMeal.affordability}/>
			<View style={styles.diet}>
				<Text style={styles.texts}>{selectedMeal.isGlutenFree===true ? '  Gluten Free  ': null}</Text>
				<Text style={styles.texts}>{selectedMeal.isVegan===true ? '  Vegan  ': null}</Text>
				<Text style={styles.texts}>{selectedMeal.isVegetarian===true ? '  Vegetarian  ': null}</Text>
				<Text style={styles.texts}>{selectedMeal.isLactoseFree===true ? '  Lactos Free  ': null}</Text>	
			</View>
			<Text style={styles.ingredients}>Contents:</Text>
			<Text style={styles.ingredients}>{selectedMeal.ingredients.join(', ')}</Text>
		</View>
	);
}

export default MealDetailScreen;

const styles = StyleSheet.create({
	image: {
		width: '100%', // of the surrounding container
		height: 300
	},
	background: {
		flex: 1,
		backgroundColor: 'black'
	},
	name: {
		color: 'white',
		fontSize: 20,
		fontWeight: 'bold',
		textAlign: 'center',
		marginTop: 30
	},
	subText: {
		color: '#dedddc',
		fontSize: 18,
		textAlign: 'center',
		
	},
	ingredients : {
		color: 'white',
		fontSize: 18,
		textAlign: 'center',
		marginTop: 5,
		marginHorizontal: 70
	},
	diet: {
		marginBottom: 50,
		flexDirection: 'row',
		justifyContent: 'center',
		padding: 10
	},
	texts : {
		color: 'white',
		fontSize: 15,
		marginTop: 5,
	},

});

