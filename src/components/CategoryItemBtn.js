import React from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import IsActive from '../../assets/icons/isActive.svg';
import {
    colors,
    fontNames,
    fontSizes,
    fontWeights,
    halfIndent,
    indent,
    quadrantIndent,
    scale,
    thirdIndent,
} from '../styles';

const CategoryItemBtn = ({id, title, isActive, onPress, style}) => (
    <TouchableOpacity key={id.toString()+'+'+title} style={[s.itemBtn, isActive ? s.itemBtnActive : null, style]} onPress={onPress}>
        <Text style={[s.itemBtnTitle, isActive ? s.itemBtnTitleActive : null]}>{title}</Text>
    </TouchableOpacity>
);

export default CategoryItemBtn;

const s = StyleSheet.create({
    itemBtn:{
        alignItems: 'center',
        flexDirection: "row",
        justifyContent: "space-between",
        // paddingVertical: quadrantIndent,
        borderRadius: scale(6),
        borderColor: colors.designColor1,
        borderWidth: scale(1.5),
        marginHorizontal: quadrantIndent,
        paddingHorizontal: thirdIndent,
    },
    itemBtnActive:{
        backgroundColor: colors.designColor1,
    },
    itemBtnTitle: {
        fontFamily: fontNames.regular,
        fontWeight: fontWeights.medium,
        fontSize: fontSizes.small,
        color: colors.mainText,
        paddingVertical: quadrantIndent,
    },
    itemBtnTitleActive: {
        color: colors.mainText,
        fontWeight: fontWeights.regular,
    }
});
