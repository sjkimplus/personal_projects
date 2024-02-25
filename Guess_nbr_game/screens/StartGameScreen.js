import { TextInput, View, StyleSheet, Alert, Text } from "react-native";
import PrimaryButton from "../components/ui/PrimaryButton";
import {useState} from 'react';
import Colors from '../constants/colors';
import Title from '../components/ui/Title';
import Card from '../components/ui/Card';
import InstructionText from '../components/ui/InstructionText';


function StartGameScreen({onPickNumber}) {
	const [enteredNbr, setEnteredNbr] = useState('');

	function numberInputHandler(enteredText) {
		setEnteredNbr(enteredText);
	}

	function resetInputHandler() {
		setEnteredNbr('');
	}

	function confirmInputHandler() {
		const chosenNumber = parseInt(enteredNbr); // convert to integer
		if (isNaN(chosenNumber) || chosenNumber <= 0 || chosenNumber > 99) {
			Alert.alert(
			'Invalid number!', // title
			'Number has to be a number between 1 and 99.', // description
			[{text: 'Okay', style: 'cancel', onPress: resetInputHandler}] // buttons
			);
		return;
		}
		onPickNumber(chosenNumber);
	}
	
	return (
	<View style={styles.rootContainer}>
		<Title>Guess My Number</Title>
		<Card>
			<InstructionText>Enter a number</InstructionText>
			<InstructionText>between 1 and 99.</InstructionText>
			<TextInput 
			style={styles.numberInput} 
			maxLength={2} 
			keyboardType="number-pad" // shows number keyboard only
			autoCapitalize="none" // for demonstration
			autoCorrect={false} // for demonstration
			onChangeText={numberInputHandler} // executed for every key stroke so updates the entered number
			value={enteredNbr} // displayed the entered number
			/>

			<View style={styles.buttonsContainer}>
				<View style={styles.buttonContainer}>
					<PrimaryButton onPress={resetInputHandler}>Reset</PrimaryButton>
				</View>
				<View style={styles.buttonContainer}>
					<PrimaryButton onPress={confirmInputHandler}>Confirm</PrimaryButton>
				</View>
			</View>
		</Card>
	</View>	
	);
}

export default StartGameScreen;

const styles = StyleSheet.create({
	rootContainer: {
		flex: 1,
		marginTop: 100,
		alignItems: 'center'
	},

	numberInput: {
		height: 50,
		width: 50,
		textAlign: 'center',
		fontSize: 32,
		borderBottomColor: Colors.primary00,
		borderBottomWidth: 2,
		color: Colors.primary00,
		marginVertical: 8,
		fontWeight: 'bold'
	},

	buttonsContainer: {
		flexDirection: 'row'
	},

	buttonContainer: {
		flex: 1
	},

	instructionText: {
		fontSize: 20,
		color: 'white'
	}
});
