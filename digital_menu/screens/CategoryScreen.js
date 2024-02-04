import { FlatList } from 'react-native';
import CategoryGridTile from '../components/CategoryGridTile';
import { CATEGORIES } from '../data/dummy-data';

function CategoryScreen({navigation}) { // 'navigation' given by the react-navigation package
	function renderCategoryItem(itemData) {
		function pressHandler() {
			navigation.navigate("Meal Overview", 
			{categoryId: itemData.item.id,categoryTitle: itemData.item.title});  
			// the second parameter passed in is an object
			// defines the params (or parameters) of the to-be loaded
			// screen (in this case "Meal Overiew")
		}
		return (
			<CategoryGridTile 
			title={itemData.item.title} 
			color={itemData.item.color} 
			pressed={pressHandler} 
			/>
		);
	}
	return (
		<FlatList
		data={CATEGORIES}
		keyExtractor={(item) => item.id}
		renderItem={renderCategoryItem}
		numColumns={2}
		/>
  );
}

export default CategoryScreen;