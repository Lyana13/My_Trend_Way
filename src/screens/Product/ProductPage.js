import React from 'react'
import {
    Share,
    View,
    Text,
    StyleSheet,
    ScrollView,
    Image,
    TouchableOpacity,
    Linking, FlatList, Animated
} from 'react-native';
import IconGarder from '../../../assets/icons/roundGarderIcon.svg';
import IconLike from '../../../assets/icons/roundLikeInactive.svg';
import IconLikeActive from '../../../assets/icons/roundLikeActive.svg';
import IconShare from '../../../assets/icons/roundShareIcon.svg';
import styles, {
    bottomIndent,
    colors,
    fontNames, fontSizes,
    fontWeights,
    halfIndent,
    indent, quadrantIndent,
    scale,
    startY,
} from '../../styles';
import ModMap from '../../modules/map';
import connect from 'react-redux/lib/connect/connect';
import ArrowBack from '../../../assets/icons/arrowBack.svg';
import HeartFilled from '../../../assets/icons/heartFilled.svg';
import ShareToWorld from '../../../assets/icons/shareToWorld.svg';
import SETTINGS from '../../utils/settings';
import {showToast} from '../../utils/helpers';
import ItemProduct, {ITEM_VIEW_SIZE} from '../../components/ItemProduct';
import ButtonUniversal from '../../components/ButtonUniversal'
import DoubleTapLike from '../../components/DoubleTapLike';

const HEADER_HEIGHT = scale(48) + startY;
const SIMILAR = 'SIMILAR';
const STYLED_WITH = 'STYLEDWITH';


class ProductPage extends React.Component<Props> {
    constructor(props) {
        super(props);
        this.state = {
            item : props.route.params,
            curSub: 'SIMILAR',
            like: false,
            similar: [],
            styled: []
        };



        fetch(SETTINGS.REST_URL + '/products/'+props.route.params.id.toString(), {
            method: 'GET',
            headers: { Authorization: 'Bearer '+props.userToken },
        })
            .then(response => response.json())
            .then(result => this.setState({item:result}) )
            .catch(error => showToast(`Something went wrong, please try again\n${ error.message }`) );

        fetch(SETTINGS.REST_URL + '/products/'+props.route.params.id.toString()+'/similar?offset=0&limit=8', {
            method: 'GET',
            headers: { Authorization: 'Bearer '+props.userToken },
        })
            .then(response => response.json())
            .then(result => this.setState({similar:result.items}) )
            .catch(error => showToast(`Something went wrong, please try again\n${ error.message }`) );

        fetch(SETTINGS.REST_URL + '/products/'+props.route.params.id.toString()+'/looks?offset=0&limit=8', {
            method: 'GET',
            headers: { Authorization: 'Bearer '+props.userToken },
        })
            .then(response => response.json())
            .then(result => this.setState({styled:result.items}) )
            .catch(error => showToast(`Something went wrong, please try again\n${ error.message }`) );
    }

    onShare = async () => {
        try {
            const result = await Share.share({
                message: 'Download Trendway now and explore my style, as well as finding yours!\n' +
                    this.state.item.image+ '\nhttps://apps.apple.com/gb/app/trendway/id1329354780?ign-mpt=uo%3D2',
                url: this.state.item.aw_deep_link,
                title: this.state.item.title,
            });
            if (result.action === Share.sharedAction) {
                if (result.activityType) {
                    // shared with activity type of result.activityType
                } else {
                    // shared
                }
            } else if (result.action === Share.dismissedAction) {
                // dismissed
            }
        } catch (error) {
            alert(error.message);
        }
    };

    onHangerPlus = () => {
        const formData = new FormData();
        formData.append('product_id', this.props.route.params.id);

        fetch(SETTINGS.REST_URL + '/profile/drawers', {
            method: 'POST',
            headers: { Authorization: 'Bearer '+this.props.userToken, Accept: 'application/json' },
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
        //
    }

    onLikePress = () => {
        if(this.state.like) return;

        fetch(SETTINGS.REST_URL + `/products/${this.props.route.params.id}/likes`, {
            method: 'POST',
            headers: { Authorization: 'Bearer '+this.props.userToken, Accept: 'application/json' },
        })
            .then(response => response.json())
            .then(result => {
                if(result.errors){
                    showToast(`Something went wrong :\n${ result.errors.code[0] }`);
                }else{
                    this.setState({like:true});
                }
                return result;
            })
            .catch(error => {
                showToast(`Something went wrong, please try again\n${ error.message }`);
            });
    }

    onBuy = () => {
        // alert(JSON.stringify(this.state))
        Linking.canOpenURL(this.state.item.aw_deep_link).then(supported => {
            if (supported) {
                this.props.navigation.push('WebView', {url:this.state.item.aw_deep_link, title:this.state.item.merchant_name});
                // Linking.openURL(this.state.item.aw_deep_link);
            } else {
                console.log("Don't know how to open URI: " + this.state.item.aw_deep_link);
            }
        });
    }

    onSimilar = () => {
        if(this.state.curSub !== SIMILAR){
            this.setState({curSub : SIMILAR});
        }
    }

    onStyled = () => {
        if(this.state.curSub !== STYLED_WITH){
            this.setState({curSub : STYLED_WITH});
        }
    }

    onItemPress = (iID, iImg ) => this.props.navigation.push('Product', {id:iID, image:iImg});
    renderItemLarge = ({ item }) => <ItemProduct item={item} onPress={() => this.onItemPress(item.id, item.image)} size={ITEM_VIEW_SIZE.large}/>

    render() {
        const {curSub, similar, styled, item} = this.state;
        const {image, merchant_name, title, price, description} = item;

        return (
            <View style={s.container}>
                <View style={s.header}>
                    <TouchableOpacity style={s.headerBtn} onPress={this.props.navigation.goBack} hitSlop={{top: scale(10), bottom: scale(10), left: scale(10), right: scale(10)}}>
                        <ArrowBack width={scale(12)} height={scale(19)}/>
                    </TouchableOpacity>
                    <Text style={s.title}>{merchant_name}</Text>
                    <TouchableOpacity style={s.headerBtn} onPress={this.onShare} hitSlop={{top: scale(10), bottom: scale(10), left: scale(10), right: scale(10)}}>
                        <ShareToWorld width={scale(22)} height={scale(20)}/>
                    </TouchableOpacity>
                </View>

                <ScrollView style={s.scroll}>
                <DoubleTapLike onLike={this.onLikePress}>
                    <Image style={s.imgMainOne} source={{uri: image }}/>
                </DoubleTapLike>
                    <View style={{margin: scale(20)}}>
                        <Text style={s.name}>{title}</Text>
                        <Text style={s.name}>£{price}</Text>
                        <Text style={s.description}>{description}</Text>
                    </View>

                    <View style={s.subMenuWrap}>
                        <TouchableOpacity style={[s.subMenuBtn, curSub === SIMILAR ? s.subMenuBtnActive : null]} onPress={this.onSimilar} hitSlop={{top: scale(10), bottom: scale(10), left: 0, right: 0}}>
                            <Text style={[s.subMenuBtnTxt, curSub === SIMILAR ? s.subMenuBtnTxtActive : null]} >SIMILAR</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={[s.subMenuBtn, curSub === STYLED_WITH ? s.subMenuBtnActive : null]} onPress={this.onStyled} hitSlop={{top: scale(10), bottom: scale(10), left: 0, right: 0}}>
                            <Text style={[s.subMenuBtnTxt, curSub === STYLED_WITH ? s.subMenuBtnTxtActive : null]} >STYLED WITH</Text>
                        </TouchableOpacity>
                    </View>

                    <FlatList
                        nestedScrollEnabled={true}
                        removeClippedSubviews={true}
                        showsVerticalScrollIndicator={false}
                        showsHorizontalScrollIndicator={false}
                        horizontal={true}
                        initialNumToRender={8}
                        contentContainerStyle={s.itemsListCnt}
                        data={curSub === SIMILAR ? similar : styled}
                        extraData={this.state}
                        onEndReachedThreshold={0.5}
                        renderItem={this.renderItemLarge}
                        keyExtractor={(item, index) => `new-item-${index}-${item.id}`}
                    />


                </ScrollView>
                <View style={s.bottomMenu}>
                    <View style={s.optionWrap}>
                        <TouchableOpacity onPress={this.onHangerPlus}>
                            <IconGarder style={s.optionItem} width={scale(40)} height={scale(40)}/>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={this.onLikePress}>
                            {this.state.like
                                ? <IconLikeActive style={s.optionItem} width={scale(40)} height={scale(40)}/>
                                : <IconLike style={s.optionItem} width={scale(40)} height={scale(40)}/>
                            }
                        </TouchableOpacity>
                        <IconShare style={s.optionItem} width={scale(40)} height={scale(40)} opacity={.2}/>
                    </View>
                    {/* <TouchableOpacity style={s.buyBtn} onPress={this.onBuy}>
                        <Text style={s.buyBtnText}>Buy</Text>
                    </TouchableOpacity> */}

                    <ButtonUniversal title={'Buy'} onPress={this.onBuy} style={s.buyBtn} styleText={s.buyBtnText}/>
                </View>
            </View>
        )
    }
}

const stateToProps = (state) => ({
    userToken: state[ ModMap.User ].userToken,
});

const dispatchToProps = (dispatch) => ({
});

export default connect(stateToProps, dispatchToProps)(ProductPage);

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
        zIndex: 2,
        alignItems: 'flex-end',
        justifyContent: "space-between",
        paddingBottom: scale(13),
        paddingHorizontal: indent,
        ...styles.shadow,
    },
    headerBtn: {
        height: scale(30),
        justifyContent: "center",
    },
    title: {
        fontFamily: fontNames.regular,
        fontWeight: fontWeights.bold,
        fontSize: fontSizes.cardTitle,
        textAlign: 'center',
    },
    scroll:{
        zIndex:1,
    },
    imgMainOne: {
        width: '100%',
        height: scale(607),
    },
    name:{
        fontFamily: fontNames.regular,
        fontWeight: fontWeights.bold,
        fontSize: fontSizes.cardTitle,
        marginBottom: halfIndent,
    },
    description: {
        fontFamily: fontNames.regular,
        fontWeight: fontWeights.medium,
        fontSize: fontSizes.medium,
    },
    subMenuWrap: {
        flexDirection: 'row',
        margin: indent,
    },
    subMenuBtn: {
        marginRight: indent,
        paddingBottom: quadrantIndent,
    },
    subMenuBtnActive: {
        color: colors.mainText,
        borderBottomColor: colors.mainText,
        borderBottomWidth: scale(2),
    },
    subMenuBtnTxt: {
        fontFamily: fontNames.regular,
        fontWeight: fontWeights.bold,
        fontSize: fontSizes.regular,
        color: colors.subMenuInactive,
    },
    subMenuBtnTxtActive: {
        color: colors.mainText,
    },

    itemsListCnt:{
        paddingLeft: indent,
        minHeight: scale(325),
    },

    bottomMenu: {
        backgroundColor: colors.appBg,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: indent,
        paddingBottom: bottomIndent + indent,
        ...styles.shadowBottom,
    },
    optionWrap: {
        justifyContent: 'flex-start',
        flexDirection:'row',
        alignItems: 'center',
    },
    optionItem: {
        marginRight: halfIndent
    },

    buyBtn: {
        borderRadius: scale(5),
        width: scale(150),
        height: scale(44),
        overflow: 'hidden'
    },
    buyBtnText: {
        fontFamily: fontNames.regular,
        fontWeight: fontWeights.bold,
        fontSize: fontSizes.regular,
        color: colors.mainText,
        padding: halfIndent,
        textAlign: 'center'
    },
    heartLike: {
        position: "absolute",
        top: 100,
        zIndex: 122
      },
  
})
