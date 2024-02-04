import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Button} from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';

import CategoryScreen from './screens/CategoryScreen';
import MealOverViewScreen from './screens/MealOverViewScreen';
import MealDetailScreen from './screens/MealDetailScreen'
import FavoritesScreen from './screens/FavoritesScreen';
import FavoritesContextProvider from './storage/context/favorites-context';


const Stack = createNativeStackNavigator(); // object
const Drawer = createDrawerNavigator();
function DrawerNavigator() {
	return(
		<Drawer.Navigator
		screenOptions={{
			sceneContainerStyle: { backgroundColor: 'black'},
			headerStyle: { backgroundColor: 'black'},
			headerTintColor: 'white',
			drawerContentStyle: { backgroundColor: 'grey' },
			drawerInactiveTintColor: "white",
			drawerActiveTintColor: "black",
			drawerActiveBackgroundColor: "white"
		}}>
			<Drawer.Screen name="Category" component={CategoryScreen}
			options={{
				title: 'All Categories',
				headerTitleAlign: 'center',
				drawerIcon: ({ color, size }) => (
				<Ionicons name="list" color={color} size={size} />)
			}}/>
			<Drawer.Screen name="Basket" component={FavoritesScreen}
			options={{
				drawerIcon: ({ color, size }) => (
				  <Ionicons name="basket" color={color} size={size} />
				),
			  }}/>
		</Drawer.Navigator>
	); 
}


export default function App() {
	
	return (
	<>
	<StatusBar style="light" />
	<FavoritesContextProvider>
	<NavigationContainer>
		<Stack.Navigator
			screenOptions={{
				contentStyle: {backgroundColor: 'white'},
				headerStyle: {backgroundColor: 'black'},
				headerTintColor: 'white',
			}}
			>
			<Stack.Screen 
			name="Drawer" 
			component={DrawerNavigator} // nested navigator
			options={{
				headerShown: false
			}}
			/>

			<Stack.Screen 
			name="Meal Overview" 
			component={MealOverViewScreen} 
			options={{
				headerTitleAlign: 'center'
			}} 
			/>

			<Stack.Screen 
			name="MealDetail" 
			component={MealDetailScreen}
			options={{
				title: "Meal details:",
				headerTitleAlign: 'center'
			}} 
			/>
		</Stack.Navigator>
	</NavigationContainer>
	</FavoritesContextProvider>
    </>
  );
}

const styles = StyleSheet.create({
	container: {}
}); 