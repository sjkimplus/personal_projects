import { View, Text, Pressable, StyleSheet } from 'react-native';
import Colors from '../../constants/colors';

function PrimaryButton({children, onPress, style}) {
	return (
	<View style={styles.buttonOuterContainer}>
		<Pressable 
		style={({pressed}) => pressed ? [styles.pressed, styles.buttonInnerContainer] : [styles.buttonInnerContainer, style]} 
		onPress={onPress} 
		android_ripple={{color: '#ddb52f'}}>
			<Text style={styles.buttonText}>{children}</Text>
		</Pressable>
	</View>	
	);
}

export default PrimaryButton;

const styles = StyleSheet.create({

	buttonOuterContainer: {
		borderRadius: 28,
		margin: 4,
		overflow: 'hidden',
		borderColor: Colors.primary00
		},

	buttonInnerContainer: {
		backgroundColor: Colors.primary00,
		paddingVertial: 8,
		paddingHorizontal: 16,
		elevation: 2,
		padding: 15
	},

	buttonText: {
		textAlign: 'center',
		color: 'white',
		fontWeight: 'bold',
		fontSize: 30
	},

	pressed: {
		opacity: 0.3,
	}
});




