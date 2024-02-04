import { View, Text, Pressable, Image, StyleSheet } from 'react-native';
import { shadow } from './shadow';
import { useNavigation } from '@react-navigation/native';
import IconButton from '../components/IconButton';
import { useState, useContext, useEffect } from 'react';
import { FavoritesContext } from '../storage/context/favorites-context';

function SelectedMealItem({id, name, imageURL}) { // remove id later
	const navigation = useNavigation();
	const favoriteMealsCtx = useContext(FavoritesContext);
	const [order, setOrder] = useState(1);

	useEffect(() => {
		if (order === 0) {
			favoriteMealsCtx.removeFavorite(id);
		}
		}, [order, favoriteMealsCtx, id]);

	function mealDetailHandler() {
		navigation.navigate('MealDetail', {
			mealId: id
		});
	}

	function orderHandler(change) {
		if (change === 'add') {
			setOrder(order + 1);
		} else {
			setOrder(Math.max(order - 1, 0));
		}
	}

	return (
		<View style={shadow.mealItem}>
			<Pressable 
			style={({pressed}) => pressed && styles.pressedItem}
			onPress={mealDetailHandler}>
					<Image style={styles.image} source={{uri: imageURL}}/>					
			</Pressable>
			<Text style={styles.title} >{name}</Text>
			<View style={styles.innerContainer}>
				<IconButton icon="add-circle" color="black" onPress={() => orderHandler('add')}/>
				<Text style={styles.title}> {order} </Text>
				<IconButton icon="remove-circle" color="black" onPress={() => orderHandler('sub')}/>
			</View>
		</View>
	);

}
export default SelectedMealItem;

const styles = StyleSheet.create({
	
	image: {
		width: '100%', // of the surrounding container
		height: 150
	},

	innerContainer: {
		flexDirection: 'row',
		justifyContent: 'center',
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

});