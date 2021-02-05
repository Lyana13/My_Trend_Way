import React, {memo} from 'react';
import { Dimensions, StyleSheet, Text, TouchableOpacity, View,Image } from 'react-native';
import {colors, fontNames, fontSizes, fontWeights, halfIndent, indent, scale, thirdIndent, windowW} from '../styles';

export const ITEM_VIEW_SIZE = {
    extraSmall: 'extraSmall',
    small: 'small',
    medium: 'medium',
    large: 'large'
}

const ItemProduct = (props) => {
    const {image, price, title, like_count, id} = props.item;
    const {size, onPress} = props;

    let contStyle = null;
    let imgStyle = null;
    if(size === ITEM_VIEW_SIZE.large){
        contStyle = s.containerL;
        imgStyle = s.imageL;
    }else if(size === ITEM_VIEW_SIZE.small){
        contStyle = s.containerS;
        imgStyle = s.imageS;
    }else if(size === ITEM_VIEW_SIZE.extraSmall){
        contStyle = s.containerXS;
        imgStyle = s.imageXS;
    }

    return (
        <TouchableOpacity style={[s.container, contStyle]} onPress={onPress}>
            <Image style={[s.image, imgStyle]} source={{uri: image}} progressiveRenderingEnabled={true} backgroundColor={colors.lightGray}/>
            {(size === ITEM_VIEW_SIZE.small || size === ITEM_VIEW_SIZE.extraSmall)
                ? null
                : <>
                    <Text style={s.price}>£{price}</Text>
                    <Text style={s.title} numberOfLines={2}>{title}</Text>
                </>
            }
        </TouchableOpacity>
    );
};


const s = StyleSheet.create({
    container: {
        overflow: 'hidden',
        marginBottom: indent,
        marginRight: halfIndent,
        width: scale(156),
    },
    containerS: {
        width: (windowW - indent*3) * 0.3333,
        height: scale(181),
        marginBottom: halfIndent,
        marginRight: 0,
        marginHorizontal: halfIndent,
    },
    containerXS: {
        width: scale(58),
        height: scale(90),
        marginBottom: 0,
        marginRight: 0,
        marginHorizontal: halfIndent,
    },
    containerL: {
        width: (windowW - indent*3) * .5,
        marginRight: indent,
    },

    image:{
        width: '100%',
        height: scale(248),
        borderRadius: scale(12),
        marginBottom: halfIndent,
    },
    imageS:{
        height: '100%',
        marginBottom: 0,
    },
    imageXS:{
        height: '100%',
        borderRadius: scale(8),
        marginBottom: 0,
    },
    imageL:{
        height: scale(292),
    },

    price: {
        fontFamily: fontNames.regular,
        fontSize: fontSizes.medium,
        fontWeight: fontWeights.bold,
    },
    title: {
        fontFamily: fontNames.regular,
        fontSize: fontSizes.medium,
        fontWeight: fontWeights.bold
    }

});

export default ItemProduct;//memo(ItemProduct);
