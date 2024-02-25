import { View, Text, StyleSheet, Alert, ScrollView } from 'react-native';
import { useState, useEffect } from 'react';
import NumberContainer from '../components/game/NumberContainer';
import Title from '../components/ui/Title';
import PrimaryButton from '../components/ui/PrimaryButton';
import Card from '../components/ui/Card';
import InstructionText from '../components/ui/InstructionText';
import Colors from '../constants/colors';
import {Ionicons} from '@expo/vector-icons';


function genRandom(min, max, exclude) {
	const rndNum = Math.floor(Math.random() * (max - min)) + min;

	if (rndNum === exclude) // when the number user entered is guessed right away generate another random number
	{
		return genRandom(min, max, exclude);
	}
	else
	{
		return rndNum;
	}
}

let minBoundary = 1;
let maxBoundary = 100;

function GameScreen({userNbr, onGameOver}) { // doesn't this have to be defined in the prop
	const initialGuess = genRandom(1, 100, userNbr); // hard code the boundry values? Why?
	const [currentGuess, setCurrentGuess] = useState(initialGuess);
	const [guessNbr, setGuessNbr] = useState([initialGuess])

	useEffect(() => {
		if (currentGuess === userNbr) {
			onGameOver(guessNbr.length);
		}
	}, [currentGuess, userNbr, onGameOver]);

	useEffect(() => { // only run once in the initial render bc no trigger conditions are listed
		minBoundary = 1;
		maxBoundary = 100;
	  }, []);

	function nextGuessHandler(direction) { // direction => 'lower' 'higher'
		if ((direction === 'lower' && currentGuess < userNbr) || (direction === 'higher' && currentGuess > userNbr))
		{
			Alert.alert("Don't lie!", "You are misguiding...", [{text: 'okay', style: 'cancel'}])
			return;
		}
		if (direction === 'lower')
		{
			maxBoundary = currentGuess;
		}
		else
		{
			minBoundary = currentGuess + 1; // add 1 so we don't guess in the range of the current guess
		}
		const newRndNbr = genRandom(minBoundary, maxBoundary, currentGuess)
		setCurrentGuess(newRndNbr);
		setGuessNbr(prevGuesses => [newRndNbr, ...prevGuesses]);
	}



	return (
		<View style={styles.screen}>
			<Title>Opponenet's Guess</Title>
			<NumberContainer>{currentGuess}</NumberContainer>
			<Card>
				<InstructionText>Higher or Lower?</InstructionText>
				<View>
					<PrimaryButton style={styles.buttonDesign} onPress={nextGuessHandler.bind(this, 'higher')}>
						<Ionicons name='add-circle' size={24} color='white'/>
					</PrimaryButton>
					<PrimaryButton style={styles.buttonDesign} onPress={nextGuessHandler.bind(this, 'lower')}>
						<Ionicons name='remove-circle' size={24}/>
					</PrimaryButton>
				</View>		
			</Card>
			<View style={styles.log}>
				<ScrollView>
					<Text style={styles.logText}>Guess History:</Text>
					{guessNbr.map(guessNbrs => <Text style={styles.logText} key={guessNbrs}>{guessNbrs}</Text>)}
				</ScrollView>
			</View>
		</View>
	);
}

export default GameScreen;

const styles = StyleSheet.create({

	screen: {
		flex: 1,
		padding: 12,
	},

	buttonDesign: {
		backgroundColor: Colors.primary00,
		paddingVertical: 8,
		paddingHorizontal: 100,
		elevation: 2,
	},

	logText: {
		color: 'white',
		fontSize: 25,
		fontFamily: 'open-sans-bold',
		textAlign: 'center'
	},

	log: {
		marginTop: 30
	}

});