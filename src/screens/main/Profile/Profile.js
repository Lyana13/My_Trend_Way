import React from 'react'
import {View, Text, StyleSheet, Image, Animated, FlatList, TouchableOpacity} from 'react-native';
import RBSheet from "react-native-raw-bottom-sheet";

import IconMenu from '../../../../assets/icons/accountMenu.svg';

import IconOutfits from '../../../../assets/icons/outfits.svg';
import IconOutfitsActive from '../../../../assets/icons/outfitsActive.svg';
import IconHanger from '../../../../assets/icons/hanger.svg';
import IconHangerActive from '../../../../assets/icons/hangerActive.svg';
import IconHeart from '../../../../assets/icons/heartEmpty.svg';
import IconHeartActive from '../../../../assets/icons/heartEmptyActive.svg';
import LookInactive from '../../../../assets/icons/lookInactive.svg';

import styles, {
    barH,
    colors,
    fontNames,
    fontSizes,
    fontWeights, halfIndent,
    indent, oneAndHalfIndent, quadrantIndent,
    scale,
    startY,
    thirdIndent, windowH, windowW,
} from '../../../styles';
import {generateLookItems, getBrandImage} from '../../../utils/dataGenerator';
import ItemLook from '../../../components/ItemLook';
import SETTINGS from '../../../utils/settings';
import {getCloser, showToast} from '../../../utils/helpers';
import LookComposition from '../../../components/LookComposition';
import ItemProduct, {ITEM_VIEW_SIZE} from '../../../components/ItemProduct';
import CategoryItemBtn from '../../../components/CategoryItemBtn';

const {diffClamp} = Animated;

const USER_H = startY + halfIndent*2 + scale(25);
const AVA_H = scale(87) + halfIndent;
const BIO_H = oneAndHalfIndent + halfIndent + halfIndent + fontSizes.regular*1.33 + fontSizes.medium * 4;
const BTNS_H = scale(55);

const POSTS_PER_PAGE = 20;

const ITEM_LOOK_SIZE = (windowW - indent*3) * .5;

const SECTION_OUTFITS = 'outfits';
const SECTION_LIKED = 'liked';
const SECTION_DRAWER = 'drawer';
const API_URLS = {[SECTION_OUTFITS]:'looks', [SECTION_LIKED]:'looks-liked-by-me', [SECTION_DRAWER]:'products-by-drawers'};

class Profile extends React.Component<Props> {
    constructor(props) {
        super(props);

        this.state = {
            user: {},
            [SECTION_OUTFITS]: {
                data: [],
                refreshing: false,
                loadMore: true,
                isLoading: false,
            },
            [SECTION_LIKED]: {
                data: [],
                refreshing: false,
                loadMore: true,
                isLoading: false,
            },
            [SECTION_DRAWER]:{
                data: [],
                refreshing: false,
                loadMore: true,
                isLoading: false,
            },
            drawers:{
                data: [],
                loadMore: true,
                isLoading: false,
            },
            drawersFilter: null,
            section: SECTION_OUTFITS,
            listStartY: AVA_H + BIO_H + BTNS_H,
        };

        this.offset = {
            [SECTION_OUTFITS]:0,
            [SECTION_LIKED]:0,
            [SECTION_DRAWER]:0,
        };
        this.offsetDrawers = 0;

        this.offSetYGoal = AVA_H + BIO_H;

        this.scrollY = new Animated.Value(0);
        this.translateHeaderY = this.scrollY.interpolate({
            inputRange: [0, this.offSetYGoal],
            outputRange: [0, -(this.offSetYGoal)],
            extrapolate: 'clamp'
        });

        this.contentOffsetY = this.translateYNumber = 0;
        this.itemsList = null
        this.renderItem = this.renderItemLook;

        this.scrollY.addListener(({value}) => {
            this.translateYNumber = value;
        });

        fetch(SETTINGS.REST_URL + '/profile', {
            method: 'GET',
            headers: { Authorization: 'Bearer '+props.userToken },
        })
            .then(response => response.json())
            .then(result => {
                if(!result.image) result.image = getBrandImage(result.first_name.charAt(0) + result.last_name.charAt(0));
                this.setState({user:result});
            } )
            .catch(error => showToast(`Something went wrong, please try again\n${ error.message }`) );

        this.loadListings();
        this.loadDrawers();
    }

    setBioHeight = ({ nativeEvent }) => {
         //nativeEvent.layout.height
        this.offSetYGoal = AVA_H + nativeEvent.layout.height;
        this.translateHeaderY = this.scrollY.interpolate({
            inputRange: [0, this.offSetYGoal],
            outputRange: [0, -(this.offSetYGoal)],
            extrapolate: 'clamp'
        });
         this.setState({listStartY : AVA_H + nativeEvent.layout.height + BTNS_H,});
    }

    /**
     * ON SCROLL ANIMATION
     */
    // handleScroll = e => {
    //     const {isLoading, refreshing} = this.state[this.state.section];
    //     this.contentOffsetY = e.nativeEvent.contentOffset.y;
    //     if (e.nativeEvent.contentOffset.y >= 0 && e.nativeEvent.contentOffset.y <= e.nativeEvent.contentSize.height - windowH*1.1 && (e.nativeEvent.contentSize.height - OFFSET_Y) > windowH && !refreshing && !isLoading){
    //         this.scrollY.setValue(e.nativeEvent.contentOffset.y);
    //     }
    // };

    // handleSnap = ({nativeEvent}) => {
    //     this.contentOffsetY = nativeEvent.contentOffset.y;
    //     if (!(this.translateYNumber === 0 || this.translateYNumber === -OFFSET_Y) && this.itemsList) {
    //         this.itemsList.scrollToOffset({
    //             offset:
    //                 getCloser(this.translateYNumber, -OFFSET_Y, 0) === -OFFSET_Y
    //                     ? this.contentOffsetY - Math.abs(this.translateYNumber)
    //                     : this.contentOffsetY + (OFFSET_Y - Math.abs(this.translateYNumber)),
    //         });
    //     }
    // };

    /**
     * LOAD DATA FROM SERVER
     */
    loadListings = () => {
        const {section, drawersFilter} = this.state;
        const {loadMore, isLoading, } = this.state[section];
        const offset = this.offset[section];
        const url = API_URLS[section];

        if (!isLoading && loadMore) {
            fetch(SETTINGS.REST_URL + '/profile/'+ url +'?offset='+offset.toString()+'&per_page='+POSTS_PER_PAGE.toString() + ((section === SECTION_DRAWER && drawersFilter) ? '&drawer_ids[]='+drawersFilter : '').toString(), {
                method: 'GET',
                headers: { Authorization: 'Bearer '+this.props.userToken },
            })
                .then(response => response.json())
                .then(result => {
                    this.offset[section]+=POSTS_PER_PAGE;
                    let items = result.items ? result.items : result;

                    if(section === SECTION_OUTFITS && items.length < POSTS_PER_PAGE){
                        items.push({});
                    }

                    this.setState({...this.state, [section]:{isLoading: false, loadMore: items.length === POSTS_PER_PAGE, refreshing: false, data: this.state[section].data.concat(items) } }, () => {
                        /**
                         * JUMP after change filter
                         */
                        if(this.itemsList && this.state[section].data.length <= POSTS_PER_PAGE && this.translateYNumber >= this.offSetYGoal) {
                            this.scrollY.setValue(0);
                            this.itemsList.scrollToOffset({offset: this.offSetYGoal, animated: false});
                            this.scrollY.setValue(this.offSetYGoal);
                        }
                    });
                })
                .catch(error => showToast(`Something went wrong, please try again\n${ error.message }`) );
        }
    };

    onRefreshHandler = (iData) => {
        const section = this.state.section;
        if (this.state[section].refreshing) return;
        this.offset[section] = 0;
        this.setState({...this.state, [section]: {...this.state[section], refreshing: true, loadMore: true, data: []}, ...iData}, this.loadListings);
    };

    loadDrawers = () => {
        if (!this.state.drawers.isLoading && this.state.drawers.loadMore) {
            fetch(SETTINGS.REST_URL + '/drawers?offset='+this.offsetDrawers.toString()+'&per_page=30', {
                method: 'GET',
                headers: { Authorization: 'Bearer '+ this.props.userToken },
            })
                .then(response => response.json())
                .then(result => {
                    this.offsetDrawers+=30;
                    this.setState({drawers:{...this.state.drawers, isLoading: false, loadMore: result.length === 30, data: this.state.drawers.data.concat(result.items) }} );
                })
                .catch(error => showToast(`Something went wrong, please try again\n${ error.message }`) );
        }
    };
// {
//     "id": 2564,
//     "first_name": "Queenie",
//     "last_name": "Howell",
//     "email": "labadie.jalen@example.com",
//     "phone": "30143947986",
//     "username": "jmarks",
//     "link": "http:\/\/www.schuppe.com\/fugiat-perspiciatis-corporis-illum-eos",
//     "bio": "Id nostrum est quia at. Debitis similique excepturi facere in numquam ullam sint. Quod consectetur hic aliquid sequi. Debitis ut est saepe exercitationem nihil eum enim.",
//     "instagram": "http:\/\/www.cronin.com\/rerum-odit-minus-quos-voluptates",
//     "image": null
// }

    onOutfitsPress = () => {
        this.renderItem = this.renderItemLook;
        this.offset[this.state.section] = 0;
        this.setState({section:SECTION_OUTFITS, [this.state.section]:{data: [], refreshing: false, loadMore: true, isLoading: false} }, this.loadListings);
    }
    onHeartPress = () => {
        this.renderItem = this.renderItemLook;
        this.offset[this.state.section] = 0;
        this.setState({section:SECTION_LIKED, [this.state.section]:{data: [], refreshing: false, loadMore: true, isLoading: false} }, this.loadListings);
    }
    onHangerPress = () => {
        this.renderItem = this.renderItemSmall;
        this.offset[this.state.section] = 0;
        this.setState({section:SECTION_DRAWER, [this.state.section]:{data: [], refreshing: false, loadMore: true, isLoading: false} }, this.loadListings);
    }

    onItemPress = (iID, iImg) => this.props.navigation.push('Product', {id:iID, image:iImg});

    onMenuPress = () => {
        if(this.bottomSheet) this.bottomSheet.open();
    };

    renderItemSmall = ({item, index}) => <ItemProduct item={item} onPress={() => this.onItemPress(item.id, item.image)} size={ITEM_VIEW_SIZE.small}/> ;
    renderItemLook = ({item, index}) => {
        return item.products
            ? <View style={s.lookItem}>
                {item.is_active === 0 ?
                    <LookInactive width={scale(26)} height={scale(26)} style={s.lookInactive}/>
                    :null
                }
                <LookComposition value={item.products} style={{padding: scale(2.5)}} imageStyle={{borderRadius: scale(6),}}/>
            </View>
            : <TouchableOpacity style={[s.lookItem, s.lookEmpty]} onPress={() => this.props.navigation.navigate('Create')}>
                <Text style={s.lookEmptyPlus}>+</Text>
                <Text style={s.lookEmptyTitle}>Create</Text>
            </TouchableOpacity>
    }

    /**
     * DRAWER LIST
     */
    isActive = (iID) => {
        // const containID = this.state.drawersFilter.findIndex(item => item.id === iID);
        // return containID !== -1;
        return this.state.drawersFilter === iID;
    }
    onDrawerItemPress = ({id, title}) => {
        // const containID = this.state.drawersFilter.findIndex(item => item.id === id);
        // let newItems = this.state.drawersFilter.slice();
        // if(containID === -1){
        //     newItems.push({id:id, title:title});
        // }else{
        //     newItems.splice(containID, 1);
        // }
        // this.onRefreshHandler({drawersFilter:newItems});
        this.onRefreshHandler({drawersFilter:this.state.drawersFilter === id ? null : id });
    }
    renderDrawerBtn = ({ item }) => <CategoryItemBtn id={item.id} title={item.title} onPress={() => this.onDrawerItemPress(item)}  isActive={this.isActive(item.id)} />
    drawersList = () => {
        return this.state.section === SECTION_DRAWER
            ? <FlatList
                nestedScrollEnabled={true}
                removeClippedSubviews={true}
                showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}
                horizontal={true}
                initialNumToRender={10}
                style={s.drawersList}
                contentContainerStyle={s.drawersCnt}
                data={this.state.drawers.data}
                extraData={this.state}
                onEndReached={this.loadDrawers}
                onEndReachedThreshold={0.5}
                renderItem={this.renderDrawerBtn}
                keyExtractor={(item, index) => `btn-drawers-${index}-${item.id}`}
            />
            : null
    }

    render() {
        const {type, section, user, listStartY} = this.state;
        const {data, refreshing} = this.state[section];
        const {first_name, last_name, username, bio, image, followers_count, following_count, looks_count} = user;

        return (
            <View style={s.container} >
                <View style={s.nicknameWrap}>
                    <View style={s.emptyBox}/>
                    <Text style={s.nicknameText}>{username}</Text>
                    <TouchableOpacity onPress={this.onMenuPress}>
                        <IconMenu width={22} height={20}/>
                    </TouchableOpacity>
                </View>
                <Animated.View style={[s.topCnt, {transform: [{translateY: this.translateHeaderY}]}]}>
                    <View style={s.infoWrap}>
                        <Image style={s.avatar} source={{uri: image }} progressiveRenderingEnabled={true}/>
                        <View style={s.separatedLine}/>
                        <View style={s.infoFollowWrap}>
                            <Text style={s.infoFollowText}>{looks_count} Outfits</Text>
                            <Text style={s.infoFollowText}>{followers_count} Followers</Text>
                            <Text style={s.infoFollowText}>{following_count} Following</Text>
                        </View>
                    </View>
                    <View style={s.nameBioWrap} onLayout={this.setBioHeight}>
                        <Text style={s.nameText}>{first_name} {last_name}</Text>
                        <Text style={s.bioText} numberOfLines={3}>{bio}</Text>
                    </View>
                    <View style={s.buttonsWrap}>
                        { section === SECTION_OUTFITS
                            ?
                            <IconOutfitsActive width={scale(44)} height={scale(23)}/>
                            :
                            <TouchableOpacity onPress={this.onOutfitsPress}>
                                <IconOutfits width={scale(44)} height={scale(23)}/>
                            </TouchableOpacity>
                        }
                        { section === SECTION_LIKED
                            ?
                            <IconHeartActive width={scale(44)} height={scale(25)}/>
                            :
                            <TouchableOpacity onPress={this.onHeartPress}>
                                <IconHeart width={scale(44)} height={scale(25)}/>
                            </TouchableOpacity>
                        }
                        { section === SECTION_DRAWER
                            ?
                            <IconHangerActive width={scale(44)} height={scale(22)}/>
                            :
                            <TouchableOpacity onPress={this.onHangerPress}>
                                <IconHanger width={scale(44)} height={scale(22)}/>
                            </TouchableOpacity>
                        }
                    </View>
                </Animated.View>
                <Animated.FlatList
                    key={'flat-list-'+section+'key'}
                    scrollEventThrottle={16}
                    // nestedScrollEnabled={true}
                    // scrollEnabled={enableScrollViewScroll}
                    removeClippedSubviews={true}
                    initialNumToRender={POSTS_PER_PAGE}
                    numColumns={section === SECTION_DRAWER ? 3 : 2}
                    onScroll={Animated.event(
                        [{nativeEvent: {contentOffset: {y: this.scrollY}}}],
                        {useNativeDriver: true},
                    )}
                    // onMomentumScrollEnd={this.handleSnap}
                    scrollToOverflowEnabled={true}
                    ref={c => this.itemsList = c}
                    data={data}
                    extraData={this.state}
                    ListHeaderComponent={this.drawersList()}
                    // ListHeaderComponentStyle={{height: listStartY}}
                    columnWrapperStyle={s.columnWrapLook}
                    contentContainerStyle={[s.flatListCnt, {paddingTop: listStartY + indent}]}
                    style={s.flatList}
                    // onRefresh={this.onRefreshHandler}
                    // refreshing={refreshing}
                    onEndReached={ this.loadListings }
                    onEndReachedThreshold={0.5}
                    renderItem={this.renderItem}
                    keyExtractor={(item, index) => `list-${section}-${index}-${item.id}`}
                />
                <RBSheet
                    ref={ref => { this.bottomSheet = ref }}
                    height={450}
                    openDuration={250}
                    closeOnDragDown
                    animationType={'fade'}
                    customStyles={{
                        mask: { backgroundColor: "transparent" },
                        container: { elevation: 100, borderTopLeftRadius: scale(12), borderTopRightRadius: 10 }
                    }}
                >
                </RBSheet>
            </View>
        )
    }
}

export default Profile;

const s = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column",
        backgroundColor: colors.appBg,
    },
    topCnt: {
        position: 'absolute',
        backgroundColor: colors.appBg,
        left: 0,
        right: 0,
        width: '100%',
        top:USER_H,
        zIndex: 1,
    },
    nicknameWrap: {
        paddingTop: startY + halfIndent,
        flexDirection: "row",
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor:colors.appBg,
        paddingHorizontal: oneAndHalfIndent,
        paddingBottom: halfIndent,
        zIndex:3,
    },
    nicknameText: {
        fontWeight: fontWeights.black,
        fontSize: fontSizes.regular,
        fontFamily: fontNames.regular,
        color:colors.mainText,
    },
    emptyBox:{
        width:scale(22),
        height:scale(22),
    },
    avatar:{
        width:scale(87),
        height:scale(87),
        borderRadius:scale(44),
    },

    infoWrap: {
        flexDirection: 'row',
        alignItems:'center',
        justifyContent: 'center',
        backgroundColor:colors.appBg,
        zIndex:2,
        paddingBottom: halfIndent,
        ...styles.shadow,
    },
    separatedLine: {
        width:scale(2),
        height:scale(47),
        backgroundColor:colors.mainText,
        marginHorizontal:indent,
    },
    infoFollowWrap: {

    },
    infoFollowText: {
        fontWeight: fontWeights.regular,
        fontSize: fontSizes.medium,
        fontFamily: fontNames.regular,
        color:colors.mainText,
    },

    nameBioWrap: {
        paddingHorizontal: oneAndHalfIndent,
        paddingTop: oneAndHalfIndent,
        paddingBottom: halfIndent,
        backgroundColor:colors.appBg,
        zIndex:1,
    },
    nameText: {
        fontWeight: fontWeights.black,
        fontSize: fontSizes.regular,
        fontFamily: fontNames.regular,
        color:colors.mainText,
        marginBottom: halfIndent,
    },
    bioText: {
        fontWeight: fontWeights.medium,
        fontSize: fontSizes.medium,
        fontFamily: fontNames.regular,
        color:colors.mainText,
    },

    flatList:{
        height: windowH,
        width: '100%',
    },
    flatListCnt:{
        paddingVertical: indent,
        overflow: 'visible',
    },
    columnWrapLook:{
        paddingHorizontal:halfIndent,
    },
    lookItem: {
        width:ITEM_LOOK_SIZE,
        height:ITEM_LOOK_SIZE,
        flexDirection: 'row',
        marginBottom: halfIndent,
        marginHorizontal: halfIndent,
        backgroundColor: colors.lightGray,
        borderRadius: scale(8),
        padding: scale(2.5),
    },
    lookInactive:{
        position: 'absolute',
        top: scale(3),
        right: scale(3),
        zIndex: 1,
    },
    lookEmpty: {
        flexDirection: 'column',
        borderRadius: scale(8),
        backgroundColor: colors.designColor1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    lookEmptyPlus:{
        fontWeight: fontWeights.black,
        fontSize: scale(40),
        fontFamily: fontNames.regular,
        marginBottom: -scale(12),
    },
    lookEmptyTitle:{
        fontWeight: fontWeights.medium,
        fontSize: fontSizes.input,
        fontFamily: fontNames.regular,
    },


    buttonsWrap: {
        paddingHorizontal: oneAndHalfIndent,
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems:'center',
        height:scale(55),
        backgroundColor: colors.appBg,
        ...styles.shadow,
    },

    drawersList: {
        // position: 'absolute'
    },
    drawersCnt: {
        marginBottom: indent,
        paddingHorizontal: thirdIndent,
    },

    example: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems:'center',
    },
    exampleImg: {
        maxWidth: 200,
        maxHeight: 200,
        margin: 7
    },
    bottomBar: {
        justifyContent: 'space-around',
        flexDirection:'row',
        alignItems: 'center',
        padding: 15,
        backgroundColor: '#fff',
    }
})
