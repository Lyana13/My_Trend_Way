import React from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import IsActive from '../../assets/icons/isActive.svg';
import {fontNames, fontSizes, fontWeights, halfIndent, quadrantIndent, scale} from '../styles';

const FilterListItem = ({id, title, isActive, onPress, style}) => (
    <TouchableOpacity key={id.toString()+'+'+title} style={[s.itemBtn, style]} onPress={onPress}>
        <Text style={s.itemBtnTitle}>{title}</Text>
        {isActive
            ? <IsActive width={scale(23)} height={scale(17)} />
            : null
        }
    </TouchableOpacity>
);

export default FilterListItem;

const s = StyleSheet.create({
    itemBtn:{
        width: '100%',
        alignItems: 'center',
        flexDirection: "row",
        justifyContent: "space-between",
        paddingVertical: quadrantIndent,
    },
    itemBtnTitle: {
        // width: '100%',
        fontFamily: fontNames.regular,
        fontWeight: fontWeights.bold,
        fontSize: fontSizes.cardTitle,
        paddingVertical: halfIndent,
    }
});
