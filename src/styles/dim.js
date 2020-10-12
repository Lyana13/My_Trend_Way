import {Dimensions, Platform, PixelRatio, StatusBar} from 'react-native';

//Sizes of app sketches
const guidelineBaseWidth = 414;//375;
const guidelineBaseHeight = 897;//812;

const initial = Dimensions.get('window').width < Dimensions.get('window').height ? 'PORTRAIT' : 'LANDSCAPE';
const width = initial === 'PORTRAIT' ? Dimensions.get('window').width : Dimensions.get('window').height;
const height = initial === 'PORTRAIT' ? Dimensions.get('window').height : Dimensions.get('window').width;

const dimen = Dimensions.get('window');
const isIphoneX = Platform.OS === 'ios' && !Platform.isPad && !Platform.isTVOS &&
    ((dimen.height === 812 || dimen.width === 812) || (dimen.height === 896 || dimen.width === 896));

const scale = size => width / guidelineBaseWidth * size;
const verticalScale = size => height / guidelineBaseHeight * size;
const moderateScale = (size, factor = 0.5) => size + ( scale(size) - size ) * factor;

export const indent = scale(15);
export const halfIndent = indent * .5;
export const doubleIndent = indent * 2;
export const designIndent = scale(20);

export const bottomIndent = !isIphoneX ? 0 : scale(11);
export const startY = !isIphoneX ? 0 : StatusBar.currentHeight - indent;
export const barH = !isIphoneX ? StatusBar.currentHeight : 0;
export const windowH = height - barH - bottomIndent;
export const windowW = width;

export {scale, verticalScale, moderateScale};