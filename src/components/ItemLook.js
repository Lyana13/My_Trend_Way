import React, {memo, useState, useEffect, useRef } from 'react';
import {Dimensions, StyleSheet, Text, TouchableOpacity,TouchableWithoutFeedback, View, Image, FlatList, Animated} from 'react-native';
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
    windowW,
} from '../styles';
import HangerPlus from '../../assets/icons/hangerPlus.svg';
import DoubleTapLike from './DoubleTapLike';
import HeartEmpty from '../../assets/icons/heartEmpty.svg';
import HeartFilled from '../../assets/icons/heartFilled.svg';
import Comment from '../../assets/icons/comment.svg';
import BagEmpty from '../../assets/icons/bagEmpty.svg';
import BagFilled from '../../assets/icons/bagFilled.svg';
import Share from '../../assets/icons/share.svg';
import LookComposition from './LookComposition';
import {getBrandImage, getUserImage} from '../utils/dataGenerator';
import SETTINGS from '../utils/settings';
import {showToast} from '../utils/helpers';
import ItemProduct, {ITEM_VIEW_SIZE} from './ItemProduct';

function ItemLook({item, userToken, navigation}) {
    const [like, setLike] = useState(false);
    const [bag, setBag] = useState(false);

    const {id, content, hashtags, view_count, products, user} = item;
    const {username} = user;

    let image = user.image;
    
    if(!image) image = getUserImage(username);

      
    const onHangerPlus = () => {
        const formData = new FormData();
        formData.append('look_id', id);

        fetch(SETTINGS.REST_URL + '/profile/drawers', {
            method: 'POST',
            headers: { Authorization: 'Bearer '+userToken, Accept: 'application/json' },
            body: formData,
        })
            .then(response => response.json())
            .then(result => {
                if(result.errors){
                    showToast(`Something went wrong :\n${ result.errors.code[0] }`);
                }else{
                    showToast('Added to your wear board');
                }
                return result;
            })
            .catch(error => {
                showToast(`Something went wrong, please try again\n${ error.message }`);
            });
        // product_id
    }

    const onLikePress = () => {
        if(like) return;
        fetch(SETTINGS.REST_URL + `/looks/${id}/likes`, {
            method: 'POST',
            headers: { Authorization: 'Bearer '+userToken, Accept: 'application/json' },
        })
            .then(response => response.json())
            .then(result => {
                if(result.errors){
                    showToast(`Something went wrong :\n${ result.errors.code[0] }`);
                }else{
                    setLike(true);
                }
                return result;
            })
            .catch(error => {
                showToast(`Something went wrong, please try again\n${ error.message }`);
            });
    }

    const onBagPress = () => {
        if(!bag){
            fetch(SETTINGS.REST_URL + `/looks/${id}/views`, {
                method: 'PUT',
                headers: { Authorization: 'Bearer '+userToken, Accept: 'application/json' },
            })
                .then(response => response.json())
                .then(result => {
                    if(result.errors){
                        showToast(`Something went wrong :\n${ result.errors.code[0] }`);
                    }
                    return result;
                })
                .catch(error => {
                    showToast(`Something went wrong, please try again\n${ error.message }`);
                });
        }
        setBag(!bag);
    }

    const onContainerTouch = () => {
        if(bag){
            setBag(!bag);
        }
    }

    const onItemPress = (iID, iImg ) => navigation.push('Product', {id:iID, image:iImg});
    const renderItemSmall = ({item, index}) => <ItemProduct item={item} onPress={() => onItemPress(item.id, item.image)} size={ITEM_VIEW_SIZE.extraSmall}/> ;
    
    return (
        <View style={s.container} >
            <View style={s.profileWrap}>
                <Image style={s.profileImg} source={{uri: image}} />
                <Text style={s.profileName}>{username}</Text>
            </View>

            <DoubleTapLike onLike={onLikePress}>
                    <View style={s.wrapImages}>
                        <LookComposition value={products}/>
                    </View>
            </DoubleTapLike>
            
            <View style={s.wrapControls}>
                <View style={s.wrapButtons}>
                    <TouchableOpacity style={s.btn} onPress={onHangerPlus}>
                        <HangerPlus width={scale(27)} height={scale(22)}/>
                    </TouchableOpacity>
                    
                    <TouchableOpacity style={s.btn} onPress={onLikePress}>
                        {like
                            ? <HeartFilled width={scale(25)} height={scale(22)}/>
                            : <HeartEmpty width={scale(25)} height={scale(22)}/>
                        }
                    </TouchableOpacity>
                    
                    <TouchableOpacity style={s.btn}>
                        <Comment width={scale(22)} height={scale(22)} opacity={.2}/>
                    </TouchableOpacity>
                    <TouchableOpacity style={s.btn} onPress={onBagPress}>
                        {bag
                            ?<BagFilled width={scale(22)} height={scale(22)}/>
                            :<BagEmpty width={scale(22)} height={scale(22)}/>
                        }

                    </TouchableOpacity>
                    <TouchableOpacity style={s.btn}>
                        <Share width={scale(29)} height={scale(22)}  opacity={.2}/>
                    </TouchableOpacity>
                </View>
                <TouchableOpacity style={s.btn}>
                    <Text style={s.textViews}>{view_count} views</Text>
                </TouchableOpacity>
                {bag
                    ? <View style={s.itemsListCnt}>
                        <FlatList
                            // nestedScrollEnabled={true}
                            // removeClippedSubviews={true}
                            showsVerticalScrollIndicator={false}
                            showsHorizontalScrollIndicator={false}
                            horizontal={true}
                            // initialNumToRender={6}
                            // style={s.itemsList}
                            // contentContainerStyle={s.itemsListCnt}
                            data={products}
                            // extraData={this.state}
                            renderItem={renderItemSmall}
                            keyExtractor={(item, index) => `trending-item-${index}-${item.id}`}
                        />
                    </View>
                    : null
                }
            </View>
            <View style={s.wrapText}>
              <Text style={s.textName}>{content}</Text>
              <Text style={s.textDescription}>{hashtags}</Text>
            </View>
        </View>
    );
};

const s = StyleSheet.create({
    container: {
        paddingBottom: indent,
    },
    profileWrap: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    profileImg: {
        width: scale(29),
        height: scale(29),
        borderRadius: scale(10),
        marginVertical: indent,
        marginLeft: indent,
        marginRight: thirdIndent,
    },
    profileName: {
        fontFamily: fontNames.bold,
        fontWeight: fontWeights.black,
        fontSize: fontSizes.regular,
        textAlign: 'left'
    },

    wrapImages: {
        padding: scale(7.5),
        width: windowW,
        height: windowW,
        flexDirection: 'row',
        backgroundColor: colors.lightGray,
    },

    wrapControls: {
        zIndex:1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: halfIndent,
    },
    wrapButtons: {
        flexDirection: 'row',
    },
    btn: {
        padding: halfIndent,
    },
    textViews: {
        textAlign: 'right',
        fontFamily: fontNames.regular,
        fontSize: fontSizes.medium,
    },

    wrapText: {
        marginHorizontal: indent,
    },
    textName: {
        fontFamily: fontNames.regular,
        fontSize: fontSizes.medium,
        fontWeight: fontWeights.regular,
    },
    textDescription: {
        fontFamily: fontNames.regular,
        fontSize: fontSizes.medium,
        fontWeight: fontWeights.thin,
    },
    itemsListCnt:{
        zIndex:1,
        position:'absolute',
        top: scale(45),
        left: indent,
        // marginHorizontal: indent,
        width:windowW - indent*2,
        height: scale(100),
        backgroundColor: colors.borderColor,
        borderRadius: scale(12),
        paddingVertical: quadrantIndent,
    },
    heartLike: {
        position: "absolute",
        bottom: 100,
        left: 200,
        zIndex: 1
      },
});

export default memo(ItemLook);
