import { View, Image, StyleSheet, Text } from 'react-native';
import Title from '../components/ui/Title';
import PrimaryButton from "../components/ui/PrimaryButton";

function GameOverScreen({guessNbr, userNbr, onStartNewGame}) {
	return (
	<View style={styles.rootContainer}>
		<Title>Game Over!</Title>
		<View style={styles.imageContainer}>
			<Image style={styles.image} source={require('../assets/images/success.png')} />
		</View>
		<Text style={styles.summaryText}>
			Your phone needed{' '}<Text style={styles.highlight}>{guessNbr}</Text>{' '}
			rounds to guess the number{' '}<Text style={styles.highlight}>{userNbr}</Text>.
		</Text>
		<PrimaryButton onPress={onStartNewGame}>Start New Game</PrimaryButton>
	</View>
	
	);
}

export default GameOverScreen;

const styles = StyleSheet.create({
	rootContainer: {
		flex: 1,
		padding: 24,
		justifyContent: 'center',
		alignItems: 'center',
	  },
	
	summaryText: {
		fontFamily: 'open-sans',
		fontSize: 24,
		marginBottom: 30
	},

	highlight: {
		fontFamily: 'open-sans-bold'
	},

	imageContainer: {
		width: 300,
		height: 300,
		borderRadius: 150, // needs to be half the width&height for a circle
		borderWidth: 3,
		borderColor: 'orange',
		overflow: 'hidden', // hides the regtangular-ness of an actual image
		margin: 36,
	},

	image: {
		width: '100%',
		height: '100%',
	  },

});

