import { Text, StyleSheet } from 'react-native';

function instructionText({children}) {
	return( <Text style={styles.instructionText}>{children}</Text>

	);
}

export default instructionText;

const styles = StyleSheet.create({
	
	instructionText: {
		fontFamily: 'open-sans',
		fontSize: 20,
		marginBottom: 20,
		color: 'white'
	}

});