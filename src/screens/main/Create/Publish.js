import React, {forwardRef, useRef, useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, ScrollView, FlatList, Image, TextInput, Keyboard} from 'react-native';
import styles, {
    bottomIndent,
    colors,
    fontNames, fontSizes,
    fontWeights,
    halfIndent,
    indent, oneAndHalfIndent,
    quadrantIndent,
    scale,
    startY, thirdIndent, windowH, windowW,
} from '../../../styles';
import IconNewItem from '../../../../assets/icons/iconLookNewItem.svg';
import ArrowBack from '../../../../assets/icons/arrowBack.svg';
import LookComposition from '../../../components/LookComposition';
import ItemProduct, {ITEM_VIEW_SIZE} from '../../../components/ItemProduct';
import IconGarder from '../../../../assets/icons/roundGarderIcon.svg';
import IconLike from '../../../../assets/icons/roundLikeInactive.svg';
import IconShare from '../../../../assets/icons/roundShareIcon.svg';
import SETTINGS from '../../../utils/settings';
import {
    onTextFieldFocusIn,
    onTextFieldFocusOut,
    showToast,
    WarningMessageEmail,
    WarningMessageFieldEmpty,
} from '../../../utils/helpers';
import t from '../../../modules/content/types';
import {isLoading} from '../../../modules/loading';
import ModMap from '../../../modules/map';
import {connect} from 'react-redux';
import WarningButton from '../../../components/WarningButton';

const SEARCH_HEIGHT = scale(44);
const HEADER_HEIGHT = SEARCH_HEIGHT + indent + startY;

class Publish extends React.Component<Props> {
    constructor(props) {
        super(props);

        this.state = {
            description: '',
            hashtags: '',
            wrongCaption: false,
            wrongHashtag: false,
        };
    }

    onChangeDescription = text => this.setState({ description: text });
    onChangeHashtags = text => this.setState({ hashtags: text });

    sendRequest = (isActive) => {
        let wrongCaption = this.state.description === '';
        let wrongHashtag = this.state.hashtags === '';
        if(wrongCaption || wrongHashtag){
            this.setState({wrongCaption, wrongHashtag});
            return;
        }

        this.props.route.params.isLoading(true);

        const formData = new FormData();
        formData.append('content', this.state.description);
        formData.append('hashtags', this.state.hashtags);
        formData.append('is_active', isActive);
        for (let i=0; i<this.props.route.params.items.length; i++){
            formData.append('products[]', this.props.route.params.items[i].id);
        }

        console.log('<<<<<<<< : ' + JSON.stringify(formData));

        fetch(SETTINGS.REST_URL + '/profile/looks', {
            method: 'POST',
            headers: { Authorization: 'Bearer '+this.props.route.params.userToken, Accept: 'application/json' },
            body: formData,
        })
            .then(response => response.json())
            .then(result => {
                this.props.route.params.isLoading(false);
                if(result.errors){
                    showToast(`Something went wrong :\n${ result.errors.code[0] }`);
                }else{
                    this.props.navigation.navigate('Main');
                }
                return result;
            })
            .catch(error => {
                this.props.route.params.isLoading(false);
                showToast(`Something went wrong, please try again\n${ error.message }`);
            });
    }

    onSave = () => this.sendRequest(0);
    onSaveShare = () => this.sendRequest(1);

    onItemPress = (iID, iImg ) => this.props.navigation.push('Product', {id:iID, image:iImg});
    renderItemSmall = ({item, index}) => <ItemProduct item={item} onPress={() => this.onItemPress(item.id, item.image)} size={ITEM_VIEW_SIZE.extraSmall}/> ;
    keyboardDismiss = () => {
        Keyboard.dismiss();
    }
    render() {
        const {description, hashtags, wrongCaption, wrongHashtag} = this.state;
        return (
            <ScrollView contentContainerStyle={s.container} scrollEnabled={false} keyboardShouldPersistTaps={"never"}>
                <View style={s.header}>
                    <TouchableOpacity style={s.backBtn} onPress={this.props.navigation.goBack} hitSlop={{top: scale(10), bottom: scale(10), left: scale(10), right: scale(10)}}>
                        <ArrowBack width={scale(12)} height={scale(19)}/>
                    </TouchableOpacity>
                    <Text style={s.title}>New post</Text>
                    <View style={s.emptyBox}></View>
                </View>
                <View style={s.descriptionCnt}>
                    <View style={s.compositionAre}>
                        <LookComposition value={this.props.route.params.items} style={{padding: scale(2)}} imageStyle={{borderRadius: scale(6),}}/>
                    </View>
                    <View style={s.inputWrapCaption}>
                        <TextInput placeholder="Write a caption…"
                                   style={[s.inputDescription, wrongCaption ? s.wrong : null]}
                                   value={description}
                                   placeholderTextColor={colors.placeholderText}
                                   selectionColor={colors.designColor1}
                                   returnKeyType={'next'}
                                   onChangeText={this.onChangeDescription}
                                   multiline={true}
                                   scrollEnabled={true}
                                   numberOfLines={5}
                                   autoFocus
                            // onFocus={onTextFieldFocusIn}
                            // onBlur={onTextFieldFocusOut}
                        />
                        { wrongCaption
                            ? <WarningButton message={WarningMessageFieldEmpty} style={s.warning}/>
                            : null
                        }
                    </View>
                </View>
                <Text style={s.subTitle}>Hashtags</Text>
                <View style={s.inputWrap}>
                    <TextInput placeholder="Add hashtags to your outfit"
                               style={[s.inputHashtags, wrongHashtag ? s.wrong : null]}
                               value={hashtags}
                               placeholderTextColor={colors.placeholderText}
                               selectionColor={colors.designColor1}
                               returnKeyType={'next'}
                               onChangeText={this.onChangeHashtags}
                        // onFocus={onTextFieldFocusIn}
                        // onBlur={onTextFieldFocusOut}
                    />
                    { wrongHashtag
                        ? <WarningButton message={WarningMessageFieldEmpty} style={s.warning}/>
                        : null
                    }
                </View>
                <Text style={s.subTitle}>Products</Text>
                <View style={s.itemsListCnt}>
                    <FlatList
                        // nestedScrollEnabled={true}
                        // removeClippedSubviews={true}
                        showsVerticalScrollIndicator={false}
                        showsHorizontalScrollIndicator={false}
                        horizontal={true}
                        // initialNumToRender={6}
                        // style={s.itemsList}
                        // contentContainerStyle={s.itemsListCnt}
                        data={this.props.route.params.items}
                        extraData={this.state}
                        renderItem={this.renderItemSmall}
                        keyExtractor={(item, index) => `trending-item-${index}-${item.id}`}
                    />
                </View>
                <View style={s.bottomMenu}>
                    <TouchableOpacity style={s.saveBtn} onPress={this.onSave}>
                        <Text style={s.saveBtnText}>Save</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={s.saveShareBtn} onPress={this.onSaveShare}>
                        <Text style={s.saveShareBtnText}>Save & Share</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        );
    }
}

export default Publish;

const s = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column",
        backgroundColor: colors.appBg,
    },
    header: {
        flexDirection: "row",
        backgroundColor: colors.appBg,
        width: '100%',
        height: HEADER_HEIGHT,
        zIndex: 1,
        alignItems: 'flex-end',
        justifyContent: "space-between",
        paddingBottom: halfIndent,
        paddingHorizontal: indent,

    },
    backBtn: {
        width: scale(12),
        height: scale(30),
        justifyContent: "center",
    },
    emptyBox: {
        width: scale(12),
    },
    title: {
        fontFamily: fontNames.bold,
        fontWeight: fontWeights.black,
        fontSize: fontSizes.cardTitle,
        textAlign: 'center',
    },
    descriptionCnt:{
        flexDirection: "row",
        backgroundColor: colors.appBg,
        width: '100%',
        padding: indent,
        ...styles.shadow,
    },
    compositionAre:{
        width: scale(113),
        height: scale(113),
        flexDirection: "row",
        marginRight: indent,
    },
    inputDescription: {
        // flex:1,
        width: '100%',
        height: '100%',//scale(113),
        backgroundColor: colors.borderColor,
        color: colors.mainText,
        borderRadius: scale(12),
        paddingHorizontal: halfIndent,
        fontSize: fontSizes.input,
        fontFamily: fontNames.bold,
        fontWeight: fontWeights.bold,
    },
    subTitle: {
        fontFamily: fontNames.bold,
        fontWeight: fontWeights.black,
        fontSize: fontSizes.regular,
        textAlign: 'left',
        color: colors.filterItemTitle,
        marginHorizontal: oneAndHalfIndent,
        marginVertical: indent
    },
    inputHashtags: {
        width: '100%',
        height: '100%',
        backgroundColor: colors.borderColor,
        color: colors.mainText,
        borderRadius: scale(12),
        paddingHorizontal: halfIndent,
        fontSize: fontSizes.input,
        fontFamily: fontNames.bold,
        fontWeight: fontWeights.bold,
    },
    inputWrapCaption: {
        flex:1,
        height: scale(113),
    },
    inputWrap : {
        height: scale(47),
        marginHorizontal: indent,
    },
    wrong: {
        borderWidth: 1,
        borderColor: colors.warning,
    },
    warning: {
        position: 'absolute',
        right: 0,
        top: scale(-4),
        justifyContent: 'center',
        alignItems: 'center',
    },
    itemsList:{
        // marginHorizontal: indent,
        // backgroundColor: colors.borderColor,
        // borderRadius: scale(12),
        // height: scale(100),
    },
    itemsListCnt:{
        marginHorizontal: indent,
        height: scale(100),
        backgroundColor: colors.borderColor,
        borderRadius: scale(12),
        paddingVertical: quadrantIndent,
    },
    saveBtn: {
        backgroundColor: colors.normalIcon,
        borderRadius: scale(5),
        width: scale(165)
    },
    saveBtnText: {
        fontFamily: fontNames.regular,
        fontWeight: fontWeights.bold,
        fontSize: fontSizes.regular,
        color: colors.whiteText,
        padding: halfIndent,
        textAlign: 'center'
    },
    saveShareBtn: {
        backgroundColor: colors.designColor1,
        borderRadius: scale(5),
        width: scale(165)
    },
    saveShareBtnText: {
        fontFamily: fontNames.regular,
        fontWeight: fontWeights.bold,
        fontSize: fontSizes.regular,
        color: colors.mainText,
        padding: halfIndent,
        textAlign: 'center'
    },

    bottomMenu: {
        flex:1,
        backgroundColor: colors.appBg,
        flexDirection: 'row',
        alignItems: 'flex-end',
        justifyContent: 'space-between',
        padding: indent,
        paddingBottom: bottomIndent + indent,
    },
})
