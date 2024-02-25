import {Text, StyleSheet} from 'react-native';
import Colors from '../../constants/colors';

function Title({children}) {
	return <Text style={styles.title}>{children}</Text>;
}

export default Title;

const styles = StyleSheet.create({

	title: {
		fontFamily: 'open-sans-bold',
		fontSize: 30,
		color: 'white',
		textAlign: 'center',
		borderWidth: 2,
		borderColor: '#fa4a14',
		padding: 22
	}
});