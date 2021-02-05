import {Dimensions, Platform, PixelRatio, StatusBar} from 'react-native';

//Sizes of app sketches
const guidelineBaseWidth = 414;//375;
const guidelineBaseHeight = 897;//812;

const Dimension = Dimensions.get('window');
const initial = Dimension.width < Dimension.height ? 'PORTRAIT' : 'LANDSCAPE';
const width = initial === 'PORTRAIT' ? Dimensions.get('window').width : Dimensions.get('window').height;
const height = initial === 'PORTRAIT' ? Dimensions.get('window').height : Dimensions.get('window').width;

const isIphoneX = Platform.OS === 'ios' && !Platform.isPad && !Platform.isTVOS &&
    ((Dimension.height === 780 || Dimension.width === 780)
    || (Dimension.height === 812 || Dimension.width === 812)
    || (Dimension.height === 844 || Dimension.width === 844)
    || (Dimension.height === 896 || Dimension.width === 896)
    || (Dimension.height === 926 || Dimension.width === 926))

const scale = size => width / guidelineBaseWidth * size;
const verticalScale = size => height / guidelineBaseHeight * size;
const moderateScale = (size, factor = 0.5) => size + ( scale(size) - size ) * factor;

export const indent = scale(20);
export const quadrantIndent = indent * .25;
export const halfIndent = indent * .5;
export const thirdIndent = indent * .75;
export const oneAndHalfIndent = indent * 1.5;
export const oneAndThirdIndent = indent * 1.75;
export const doubleIndent = indent * 2;
export const tripleIndent = indent * 3;
export const quadrupleIndent = indent * 4;

export const bottomIndent = isIphoneX ? scale(15) : 0;
export const barH = Platform.OS === 'ios' ? scale(isIphoneX ? 40 : 20 ) : StatusBar.currentHeight;
export const startY = barH;
export const windowH = height - barH;
export const windowW = width;

const hitSlopValue = scale(20);
export const hitSlop = {top: hitSlopValue, bottom: hitSlopValue, left: hitSlopValue, right: hitSlopValue};

export const bbAreaHeight = bottomIndent + oneAndHalfIndent + scale(25 + 2);
export {scale, verticalScale, moderateScale};
