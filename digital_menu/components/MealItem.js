import { View, Text, Pressable, Image, StyleSheet } from 'react-native';
import { useContext } from 'react';
import { shadow } from './shadow';
import { useNavigation  } from '@react-navigation/native';
import MealDetails from './MealDetails';
import IconButton from '../components/IconButton';
import { FavoritesContext } from '../storage/context/favorites-context';


function MealItem({id, name, imageURL, complexity, affordability}) {
	const navigation = useNavigation();
	const favoriteMealsCtx = useContext(FavoritesContext);
	const mealsIsFav = favoriteMealsCtx.ids.includes(id);

	function mealDetailHandler() {
		navigation.navigate('MealDetail', {
			mealId: id
		});
	}

	function favStatusHandler() {
		if (mealsIsFav) {
			favoriteMealsCtx.removeFavorite(id);
		} else {
			favoriteMealsCtx.addFavorite(id);
		}
	}

	return (
		<View style={shadow.mealItem}>
			<Pressable 
			style={({pressed}) => pressed && styles.pressedItem}
			onPress={mealDetailHandler}
			>
				<View style={styles.innerContainer}>
					<Image style={styles.image} source={{uri: imageURL}}/>					
					<Text style={styles.title} >{name}</Text>
				</View>
				<MealDetails complexity={complexity} affordability={affordability}/>
				<View style={styles.basket}>
					<IconButton 
					icon={mealsIsFav ? "basket" : "basket-outline" }
					color={ mealsIsFav ? "#5df084" : "black" }
					onPress={favStatusHandler} />
				</View>
			</Pressable>
		</View>
	);

}
export default MealItem;

const styles = StyleSheet.create({
	
	image: {
		width: '100%', // of the surrounding container
		height: 200
	},

	innerContainer: {
		borderRadius: 8,
		overflow: 'hidden'
	},

	pressedItem: {
		opacity: 0.5
	},

	title: {
		fontWeight: 'bold',
		textAlign: 'center',
		fontSize: 18,
		margin: 8
	},
	
	basket: {
		// justifyContent: 'flex-end', // Align items to the right
		alignItems: 'center', // Align items vertically in the center
		padding: 5
	}

});