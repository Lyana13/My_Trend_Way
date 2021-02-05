import {Image, StyleSheet, TouchableOpacity} from 'react-native';
import React from 'react';
import {colors, quadrantIndent, scale} from '../styles';

const Brand = ({ item, onPress, style}) => (
    <TouchableOpacity style={[s.brandCnt, style]} onPress={onPress}>
        <Image style={s.brandImage} source={{uri: item.image }} progressiveRenderingEnabled={true} />
    </TouchableOpacity>
);

export default Brand;

const s = StyleSheet.create({
    brandCnt: {
        width: scale(100),
        height: scale(100),
        borderRadius: scale(12),
        overflow: 'hidden',
        marginHorizontal: quadrantIndent,
    },
    brandImage: {
        width: '100%',
        height: '100%',
        backgroundColor: colors.inputBackground,
    },
});
