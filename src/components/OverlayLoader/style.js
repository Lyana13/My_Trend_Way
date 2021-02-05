import {StyleSheet} from 'react-native';
import {colors, fontSizes, fontNames} from '../../styles';

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        width: '100%',
        height: '100%',
        // flex:1,
        justifyContent: 'center',
        padding: 20,
        backgroundColor: 'rgba(256, 256, 256, 0.5)',
    },
    innerContainer: {
        borderRadius: 10,
        alignItems: 'center',
        padding: 20,
    },
    indicator: {
        marginBottom: 15,
    },
    message: {
        color: colors.white,
        fontFamily: fontNames.bold,
        fontSize: fontSizes.heading,
        fontWeight: '900',
    },

});
export default styles;
