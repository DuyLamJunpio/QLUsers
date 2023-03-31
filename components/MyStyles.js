import { StyleSheet } from 'react-native';
import { Dimensions } from 'react-native';

const SCREEN_WIDTH = Dimensions.get('window').width;

const styles = StyleSheet.create({
    container: {
        paddingTop:30,
        flex: 1,
        backgroundColor: 'lightgray'
    },
    danhsach: {
        paddingHorizontal: 10,
        marginTop: 20,
        backgroundColor: '#FFF',
        width: SCREEN_WIDTH,
        height: 'auto',
        paddingBottom:10
    },
    item: {
        fontSize: 18,
        fontWeight: 'bold',
        marginTop: 2
    },
    image: {
        marginTop: 5,
        width: '100%',
        height: 400,
        marginBottom: 18
    }
});

export default styles;