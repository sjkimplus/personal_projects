import { useState } from 'react';
import { StyleSheet, ImageBackground, SafeAreaView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import StartGameScreen from './screens/StartGameScreen';
import GameScreen from './screens/GameScreen';
import Colors from './constants/colors';
import GameOverScreen from './screens/GameOverScreen';
import {useFonts} from 'expo-font';
import AppLoading from 'expo-app-loading';
export default function App() {
	const [userNbr, setUserNbr] = useState();
	const [gameIsOver, setGameIsOver] = useState(true);
	const [guessNbr, setGuessNbr] = useState(0);


	const [fontsLoaded] = useFonts({
		'open-sans': require('./assets/fonts/OpenSans-Regular.ttf'),
		'open-sans-bold': require('./assets/fonts/OpenSans-Bold.ttf')
	});

	if (!fontsLoaded) {
		return <AppLoading />;
	}

	function pickedNbrHandler(pickedNbr) {
		setUserNbr(pickedNbr);
		setGameIsOver(false);
	}

	function gameOverHandler(numberOfRounds) {
		setGameIsOver(true);
		setGuessNbr(numberOfRounds);
	}

	function startNewGameHandler() {
		setUserNbr(null);
		setGuessNbr(0);
	}
	
	// 'let' allows value reassigning
	let screen = <StartGameScreen onPickNumber={pickedNbrHandler}/>;

	if (userNbr) {
		screen = <GameScreen userNbr = {userNbr} onGameOver={gameOverHandler}/>
	}

	if (gameIsOver && userNbr) { // if gameIsOver is true
		screen = <GameOverScreen guessNbr={guessNbr} userNbr={userNbr} onStartNewGame={startNewGameHandler}/>
	}
	
	return (
		<LinearGradient colors={[Colors.primary00, 'green']} style={styles.rootScreen}>
			<ImageBackground 
			source={require('./assets/images/background.png')}
			resizeMode="cover"
			style={styles.rootScreen}
			imageStyle={styles.bgImage}
		>
			{/* displaying screen dynamically */}
		<SafeAreaView style={styles.rootScreen}>
			{screen}
		</SafeAreaView>	
		</ImageBackground>
		</LinearGradient>
	);
}
	
const styles = StyleSheet.create({
	rootScreen: {
		flex: 1,
	},


	bgImage: {
		opacity: 0.15
	}
});