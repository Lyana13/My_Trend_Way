import React, {memo} from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {scale, colors, fontSizes, fontNames, indent} from '../styles';

export const THEME_GRADIENT = 'gradient';
export const THEME_BORDER = 'border';

function ButtonUniversal({title, onPress, theme = THEME_GRADIENT, onLayout = null, style = null, styleText = null} = iProps) {
    let colorF, colorS, cntView, textView;
    if(theme === THEME_BORDER){
        cntView = styles.borderCnt;
        colorF = colorS = colors.appBg;
        textView = styles.textBorder;
    }else{
        colorF = colors.gradFirst;
        colorS = colors.gradSecond;
        textView = styles.textGradient;
    }

    return (
        <TouchableOpacity style={[style]} activeOpacity={0.5} onPress={onPress} onLayout={onLayout}>
            <LinearGradient colors={['#17FEF2','#25FBDC']} style={styles.linearGradient}>
                <Text style={[styles.textMain, textView, styleText]} numberOfLines={1}> {title} </Text>
            </LinearGradient>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    linearGradient: {
        width: scale(125),
        height: scale(80),
        marginHorizontal: 0,
    },
    cnt: {
        marginHorizontal: indent,
        width: scale(265),
        height: scale(44),
        borderRadius: scale(5),
        overflow: 'hidden'
    },
    borderCnt: {
        borderWidth: scale(1),
        borderColor: colors.main,
    },
    linearGradient: {
        flex: 1,
        justifyContent: 'center'
    },

    textGradient: {
        color: colors.whiteTitles,
    },
    textBorder: {
        color: colors.main,
    }

});

export default memo(ButtonUniversal);