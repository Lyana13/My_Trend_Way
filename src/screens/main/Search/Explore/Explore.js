import React from 'react'
import {
    View,
    Text,
    StyleSheet,
    Image,
    TextInput,
    TouchableOpacity,
    Animated, FlatList, Keyboard, ScrollView,
} from 'react-native';
import styles, {
    colors, fontNames, fontSizes, fontWeights,
    indent, doubleIndent, halfIndent, thirdIndent, oneAndHalfIndent, quadrantIndent,
    scale,
    startY,
    windowH,
    windowW, bottomIndent, hitSlop,
} from '../../../../styles';
import {getCloser, showToast} from '../../../../utils/helpers';
import SETTINGS from '../../../../utils/settings';
import {getBrandImage} from '../../../../utils/dataGenerator';
import ItemProduct, {ITEM_VIEW_SIZE} from '../../../../components/ItemProduct';
import ArrowViewAll from '../../../../../assets/icons/arrowViewAll.svg'
import SearchIcon from '../../../../../assets/icons/searchInputArea.svg'
import ItemsList from '../ItemsList/ItemsList';
import Brand from '../../../../components/BrandLogoBtn';
import IconOutfitsActive from '../../../../../assets/icons/outfitsActive.svg';
import IconOutfits from '../../../../../assets/icons/outfits.svg';
import IconHangerActive from '../../../../../assets/icons/hangerActive.svg';
import IconHanger from '../../../../../assets/icons/hanger.svg';
import IconUserActive from '../../../../../assets/icons/ProfileActive.svg';
import IconUser from '../../../../../assets/icons/ProfileActiveBlack.svg';
import IconFilter from '../../../../../assets/icons/filterIcon.svg';
import RBSheet from 'react-native-raw-bottom-sheet';
import Filter, {initialFilter} from '../../../Filter';
import LookComposition from '../../../../components/LookComposition';

const {diffClamp} = Animated;
const SEARCH_HEIGHT = scale(44);
const HEADER_HEIGHT = SEARCH_HEIGHT + indent + startY;
const HEADER_HIDEN = HEADER_HEIGHT - startY;
const BTNS_HEIGHT = scale(45);
const ITEM_LOOK_SIZE = (windowW - indent*3) * .5;
const AnimatedBtn = Animated.createAnimatedComponent(TouchableOpacity);

const SECTION_SEARCH = 'section_search';
const SECTION_EXPLORE = 'section_explore';

const SUBSECTION_OUTFITS = 'subsection_outfits';
const SUBSECTION_DRAWER = 'subsection_drawer';
const SUBSECTION_USER = 'subsection_user';
const API_URLS = {[SUBSECTION_OUTFITS]:'/products/filter', [SUBSECTION_DRAWER]:'/looks', [SUBSECTION_USER]:'/users'};

const PER_PAGE = 20;

const Separator = (onPress, title) => (
    <View style={s.separator}>
        <Text style={s.separatorTitle}>{title}</Text>
        <Text style={s.separatorBtn} onPress={onPress} hitSlop={{top: scale(10), bottom: scale(10), left: 0, right: 0}}>View All  <ArrowViewAll width={scale(9)} height={scale(14)}/></Text>
    </View>
)

class Explore extends React.Component<Props> {
    constructor(props) {
        super(props);
        this.state = {
            brandsData: [],
            newData: [],
            trendingData: [],
            section: SECTION_EXPLORE,
            subSection: SUBSECTION_OUTFITS,
            [SUBSECTION_DRAWER]: {
                data: [],
                refreshing: false,
                loadMore: true,
                isLoading: false,
            },
            [SUBSECTION_OUTFITS]: {
                data: [],
                refreshing: false,
                loadMore: true,
                isLoading: false,
            },
            [SUBSECTION_USER]:{
                data: [],
                refreshing: false,
                loadMore: true,
                isLoading: false,
            },

            showBtns: false,
            search: '',
            limit: 0,
        };

        this.filter = {...initialFilter};
        this.renderItem = this.renderItemLarge;
        this.offset = {
            [SUBSECTION_DRAWER]:0,
            [SUBSECTION_OUTFITS]:0,
            [SUBSECTION_USER]:0,
        };
        this.loadListings();

        this.scrollY = new Animated.Value(0);
        this.scrollYClamped = diffClamp(this.scrollY, 0, HEADER_HEIGHT);
        this.translateY = this.scrollYClamped.interpolate({
            inputRange: [0, HEADER_HEIGHT],
            outputRange: [0, -(HEADER_HIDEN)],
            extrapolate: 'clamp'
        });
        this.translateOpacity = this.scrollYClamped.interpolate({
            inputRange: [0, HEADER_HEIGHT],
            outputRange: [1, 0],
            extrapolate: 'clamp'
        });

        this.translateYNumber = null;
        this.ref = null

        this.translateY.addListener(({value}) => {
            this.translateYNumber = value;
        });

        this.showBtns = new Animated.Value(0);
        this.translateShowBtns = this.showBtns.interpolate({
            inputRange: [0, 1],
            outputRange: [HEADER_HEIGHT, HEADER_HEIGHT+BTNS_HEIGHT],
            extrapolate: 'clamp'
        });
        this.translateHeightBtns = this.showBtns.interpolate({
            inputRange: [0, 1],
            outputRange: [0, BTNS_HEIGHT],
            extrapolate: 'clamp'
        });
        this.translateCancelBtn = this.showBtns.interpolate({
            inputRange: [0, 1],
            outputRange: [0, -50],
            extrapolate: 'clamp'
        });
        this.translateSearchWidth = this.showBtns.interpolate({
            inputRange: [0, 1],
            outputRange: ['100%', '82%'],
            extrapolate: 'clamp'
        });
        this.animattionInProcess = false;

        fetch(SETTINGS.REST_URL + '/products/trending-now?offset=0&per_page=8', {
            method: 'GET',
            headers: { Authorization: 'Bearer '+props.userToken },
        })
            .then(response => response.json())
            .then(result => this.setState({trendingData:result.items}) )
            .catch(error => showToast(`Something went wrong, please try again\n${ error.message }`) );

        fetch(SETTINGS.REST_URL + '/products/whats-new?offset=0&per_page=8', {
            method: 'GET',
            headers: { Authorization: 'Bearer '+props.userToken },
        })
            .then(response => response.json())
            .then(result => this.setState({newData:result.items}) )
            .catch(error => showToast(`Something went wrong, please try again\n${ error.message }`) );

        fetch(SETTINGS.REST_URL + '/merchants?offset=0&per_page=8&is_top=1', {
            method: 'GET',
            headers: { Authorization: 'Bearer '+props.userToken },
        })
            .then(response => response.json())
            .then(result => {
                for(let item of result.items)
                    if(!item.image) item.image = getBrandImage(item.title.replace(" ", "\n"));

                this.setState({brandsData:result.items});
            })
            .catch(error => showToast(`Something went wrong, please try again\n${ error.message }`) );

    }

    loadListings = () => {
        const {subSection, search} = this.state;
        const {loadMore, isLoading} = this.state[subSection];
        let url = SETTINGS.REST_URL + API_URLS[subSection];
        const offset = this.offset[subSection];

        if (!isLoading && loadMore) {
            url = url + '?'+ 'offset='+offset.toString()+'&per_page='+PER_PAGE.toString()+'&q='+search;

            if(subSection === SUBSECTION_OUTFITS) {
                if (this.filter.sortActive !== '') url = url + '&sort=' + this.filter.sortActive

                for (let i = 0; i < this.filter.categories.length; i++) {
                    url = url + '&category_ids[]=' + this.filter.categories[i].id;
                }

                for (let a = 0; a < this.filter.brands.length; a++) {
                    url = url + '&merchant_ids[]=' + this.filter.brands[a].id;
                }

                for (let b = 0; b < this.filter.colors.length; b++) {
                    url = url + '&colour_ids[]=' + this.filter.colors[b].id;
                }
            }

            fetch(url, {
                method: 'GET',
                headers: { Authorization: 'Bearer '+this.props.userToken },
            })
                .then(response => response.json())
                .then(result => {
                    this.offset[subSection] += PER_PAGE;
                    let items = result.items ? result.items : result;
                    console.log(result);
                    this.setState({...this.state, [subSection]: {isLoading: false, refreshing: false, loadMore: items.length === PER_PAGE, data: this.state[subSection].data.concat(items) } });
                })
                .catch(error => showToast(`Something went wrong, please try again\n${ error.message }`) );
        }
    };

    onRefreshHandler = (iData) => {
        const subSection = this.state.subSection;
        if (this.state[subSection].refreshing) return;
        this.offset[subSection] = 0;
        this.setState({...this.state, [subSection]: {...this.state[subSection], refreshing: true, loadMore: true, data: []}, ...iData}, this.loadListings);
    };


    onChangeSearch = text => {
        if(this.searchTime) clearTimeout(this.searchTime)
        this.searchTime = setTimeout(this.onRefreshHandler, 500, { search: text})
        // this.setState({ search: text});
    }

    onFocusSearch = e => {
        this.setState({section: SECTION_SEARCH, showBtns:true});
        Animated.timing(this.showBtns, { toValue: 1, useNativeDriver: false }).start();
    }

    onBlurSearch = ({nativeEvent}) => {
        // this.setState({section: nativeEvent.text.length === 0 ? SECTION_EXPLORE : SECTION_SEARCH});
        // if(nativeEvent.text.length === 0){
        //     Animated.timing(this.showBtns, { toValue: 0, useNativeDriver: false}).start(() => this.setState({showBtns: false}));
        //     this.animattionInProcess = true;
        //     Animated.timing(this.scrollY, { toValue: this.scrollY.__getValue() > HEADER_HEIGHT ? this.scrollY.__getValue() - HEADER_HEIGHT : 0, useNativeDriver: false}).start(() => {
        //         this.scrollY.setValue(0);
        //         this.animattionInProcess = false;
        //     });
        // }
    }

    onCancelPress = () => {
        Keyboard.dismiss();
        this.setState({section:SECTION_EXPLORE, search:''});
        Animated.timing(this.showBtns, { toValue: 0, useNativeDriver: false}).start(() => this.setState({showBtns: false}));
            this.animattionInProcess = true;
            Animated.timing(this.scrollY, { toValue: this.scrollY.__getValue() > HEADER_HEIGHT ? this.scrollY.__getValue() - HEADER_HEIGHT : 0, useNativeDriver: false}).start(() => {
                this.scrollY.setValue(0);
                this.animattionInProcess = false;
            });
    }

    handleScroll = e => {
        // Keyboard.dismiss();
        if(e.nativeEvent.contentOffset.y >= 0 && e.nativeEvent.contentOffset.y <= e.nativeEvent.contentSize.height - windowH && !this.animattionInProcess)
            this.scrollY.setValue(e.nativeEvent.contentOffset.y);
    };

    handleSnap = ({nativeEvent}) => {
        const offsetY = nativeEvent.contentOffset.y;
        if ( !( this.translateYNumber === 0 ||
            this.translateYNumber === -(HEADER_HIDEN) )
        ) {
            if (this.ref) {
                // this.ref.scrollToOffset({
                //     offset:
                //         getCloser(this.translateYNumber, -HEADER_HIDEN, 0) === -HEADER_HIDEN
                //             ? offsetY + HEADER_HIDEN
                //             : offsetY - HEADER_HIDEN,
                // });
            }
        }
    };

    showAllBrands = () => this.props.navigation.push('BrandsList');

    showAllNew = () => this.props.navigation.push('ItemsList', {type:ItemsList.TYPE_NEW, title:'Whats New'});

    showAllTrending = () => this.props.navigation.push('ItemsList', {type:ItemsList.TYPE_TRENDING, title:'Trending Now'});

    onBrandPress = (iID, iTitle) => this.props.navigation.push('ItemsList', {type:ItemsList.TYPE_BRAND, title:iTitle, brand:iID});

    onItemPress = (iID, iImg ) => this.props.navigation.push('Product', {id:iID, image:iImg});

    renderBrand = ({ item }) => <Brand item={item} onPress={() => this.onBrandPress(item.id, item.title)}/>
    renderItemMedium = ({ item }) => <ItemProduct item={item} onPress={() => this.onItemPress(item.id, item.image)} size={ITEM_VIEW_SIZE.medium}/>
    renderItemLarge = ({ item }) => <ItemProduct item={item} onPress={() => this.onItemPress(item.id, item.image)} size={ITEM_VIEW_SIZE.large}/>
    renderItemLook = ({item, index}) => <View style={s.lookItem}><LookComposition value={item.products} style={{padding: 2}} imageStyle={{borderRadius: scale(6),}}/></View>

    onFilterPress = () => {
        this.props.navigation.push('Filter', {onClose:this.onFilterClosePress, onApply:this.onFilterApplyPress, active:this.filter})
        // if(this.bottomSheet) this.bottomSheet.open();
    }

    onFilterClosePress = () => {
        // if(this.bottomSheet) this.bottomSheet.close();
        this.props.navigation.navigate({name: 'Explore'});
    }

    onFilterApplyPress = (iValue) => {
        this.filter = iValue;
        // if(this.bottomSheet) this.bottomSheet.close();
        this.props.navigation.navigate({name: 'Explore'});
        this.onRefreshHandler();
    }

    onOutfitsPress = () => {
        this.renderItem = this.renderItemLarge;
        this.offset[this.state.subSection] = 0;
        this.setState({subSection:SUBSECTION_OUTFITS}, this.loadListings);
    }
    onDrawerPress = () => {
        this.renderItem = this.renderItemLook;
        this.offset[this.state.subSection] = 0;
        this.setState({subSection:SUBSECTION_DRAWER}, this.loadListings);
    }
    onUserPress = () => {
        this.renderItem = this.renderItemSmall;
        this.offset[this.state.subSection] = 0;
        this.setState({subSection:SUBSECTION_USER}, this.loadListings);
    }

    render() {
        const {section, subSection, showBtns, brandsData, newData, trendingData} = this.state;
        const {refreshing, data} = this.state[subSection];
        return (
            <ScrollView contentContainerStyle={s.container} scrollEnabled={false} keyboardShouldPersistTaps={"never"}  >
                <Animated.View style={[s.header, {transform: [{translateY: this.translateY}]}, { height: this.translateShowBtns }]}>
                    <Animated.View style={[s.inputWrap, {opacity: this.translateOpacity }]}>
                        <Animated.View style={[s.inputCnt, {width:this.translateSearchWidth}]}
                            //section === SECTION_SEARCH ? {width:'90%'} : null
                        >
                            <SearchIcon with={scale(22)} height={scale(22)}/>
                            <TextInput placeholder="Search"
                                   style={s.input}
                                   placeholderTextColor={colors.placeholderText}
                                   selectionColor={colors.designColor1}
                                   clearButtonMode={'always'}
                                   returnKeyType={'search'}
                                   onChangeText={this.onChangeSearch}
                                   onFocus={this.onFocusSearch}
                                   onBlur={this.onBlurSearch}
                                   // onFocus={onTextFieldFocusIn}
                                   // onBlur={onTextFieldFocusOut}
                            />

                        </Animated.View>
                        <Animated.Text style={[s.cancelBtn]} hitSlop={hitSlop} onPress={this.onCancelPress}> Cancel </Animated.Text>
                    </Animated.View>
                    {showBtns
                        ? <Animated.View
                            style={[s.menuWrap, {opacity: this.showBtns }, {height: this.translateHeightBtns}]}
                            // , section === SECTION_SEARCH ? {width:'90%'} : null
                        >
                            <View style={s.emptyBox}/>
                            <View style={s.menuBtnsWrap}>
                                {subSection === SUBSECTION_DRAWER
                                    ?
                                    <IconOutfitsActive width={scale(21)} height={scale(23)}/>
                                    :
                                    <TouchableOpacity onPress={this.onDrawerPress}>
                                        <IconOutfits width={scale(21)} height={scale(23)}/>
                                    </TouchableOpacity>
                                }
                                {subSection === SUBSECTION_OUTFITS
                                    ?
                                    <IconHangerActive width={scale(30)} height={scale(25)}/>
                                    :
                                    <TouchableOpacity onPress={this.onOutfitsPress}>
                                        <IconHanger width={scale(30)} height={scale(25)}/>
                                    </TouchableOpacity>
                                }
                                {subSection === SUBSECTION_USER
                                    ?
                                    <IconUserActive width={scale(24)} height={scale(23)}/>
                                    :
                                    <TouchableOpacity onPress={this.onUserPress}>
                                        <IconUser width={scale(24)} height={scale(23)}/>
                                    </TouchableOpacity>
                                }
                            </View>
                            {subSection === SUBSECTION_OUTFITS
                                ?<TouchableOpacity style={s.filterBtn} onPress={this.onFilterPress} hitSlop={{top: scale(10), bottom: scale(10), left: scale(10), right: scale(10)}}>
                                    <IconFilter width={scale(20)} height={SEARCH_HEIGHT}/>
                                </TouchableOpacity>
                                :<View style={s.emptyBox}/>
                            }
                        </Animated.View>
                        : null
                    }
                </Animated.View>
                {
                    section === SECTION_EXPLORE ?

                        <Animated.ScrollView
                            onScroll={this.handleScroll}
                            ref={c => this.ref = c}
                            onMomentumScrollEnd={this.handleSnap}
                            scrollEventThrottle={16}
                            contentContainerStyle={s.scrollCnt}
                        >
                            <Image style={s.imgMainOne}
                                   source={require('../../../../../assets/image/MainPicture.png')}/>

                            {Separator(this.showAllBrands, 'Top Brands')}

                            <FlatList
                                nestedScrollEnabled={true}
                                removeClippedSubviews={true}
                                showsVerticalScrollIndicator={false}
                                showsHorizontalScrollIndicator={false}
                                horizontal={true}
                                initialNumToRender={8}
                                contentContainerStyle={s.brandsListCnt}
                                data={brandsData}
                                extraData={this.state}
                                onEndReachedThreshold={0.5}
                                renderItem={this.renderBrand}
                                keyExtractor={(item, index) => `brand-item-${index}-${item.id}`}
                            />

                            {Separator(this.showAllNew, 'Whats New')}

                            <FlatList
                                nestedScrollEnabled={true}
                                removeClippedSubviews={true}
                                showsVerticalScrollIndicator={false}
                                showsHorizontalScrollIndicator={false}
                                horizontal={true}
                                initialNumToRender={8}
                                contentContainerStyle={s.itemsListCnt}
                                data={newData}
                                extraData={this.state}
                                onEndReachedThreshold={0.5}
                                renderItem={this.renderItemLarge}
                                keyExtractor={(item, index) => `new-item-${index}-${item.id}`}
                            />

                            {Separator(this.showAllTrending, 'Trending Now')}

                            <FlatList
                                nestedScrollEnabled={true}
                                removeClippedSubviews={true}
                                showsVerticalScrollIndicator={false}
                                showsHorizontalScrollIndicator={false}
                                horizontal={true}
                                initialNumToRender={8}
                                contentContainerStyle={s.itemsListCnt}
                                data={trendingData}
                                extraData={this.state}
                                onEndReachedThreshold={0.5}
                                renderItem={this.renderItemMedium}
                                keyExtractor={(item, index) => `trending-item-${index}-${item.id}`}
                            />

                        </Animated.ScrollView>
                        :
                        <>
                            <Animated.View style={{height: this.translateHeightBtns}}/>
                            <FlatList
                                scrollEventThrottle={16}
                                nestedScrollEnabled={true}
                                removeClippedSubviews={true}
                                initialNumToRender={20}
                                numColumns={2}
                                contentContainerStyle={s.flatListCnt}
                                onScroll={this.handleScroll}
                                data={data}
                                extraData={this.state}
                                onRefresh={this.onRefreshHandler}
                                refreshing={refreshing}
                                onEndReached={ this.loadListings }
                                onEndReachedThreshold={0.5}
                                renderItem={this.renderItem}
                                keyboardShouldPersistTaps={"never"}
                                keyExtractor={(item, index) => `list-item-${index}-${item.id}`}
                            />
                        </>
                }
            </ScrollView>
        )
    }
}

export default Explore;

const s = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column",
        backgroundColor: colors.appBg,
        marginTop: startY,
    },
    header: {
        paddingHorizontal: indent,
        position: 'absolute',
        flexDirection: 'column',
        backgroundColor: colors.appBg,
        left: 0,
        right: 0,
        top: -startY,
        width: '100%',
        height: HEADER_HEIGHT,
        zIndex: 1,
        // alignItems: 'flex-end',
        justifyContent: "flex-end",
        ...styles.shadow,
    },
    inputWrap: {
        width: '100%',
        height: SEARCH_HEIGHT,
        flexDirection: 'row',
        alignItems: "center",
        marginBottom: halfIndent,
        overflow: 'hidden',
        justifyContent: 'space-between'
    },
    inputCnt: {
        width: '100%',
        height: '100%',//SEARCH_HEIGHT,
        // flex:1,
        borderColor: colors.borderColor,
        borderWidth: scale(2),
        borderRadius: scale(12),
        backgroundColor: colors.lightGray,
        paddingHorizontal: halfIndent,
        // marginBottom: halfIndent,
        flexDirection: 'row',
        alignItems: "center",
    },
    cancelBtn: {
        // marginLeft: halfIndent,
        fontSize: fontSizes.medium,
        fontFamily: fontNames.regular,
        fontWeight: fontWeights.bold,
        textAlign: 'right',
    },
    input: {
        height: SEARCH_HEIGHT,
        flex:1,
        marginLeft: halfIndent,
        // borderColor: colors.borderColor,
        // borderWidth: scale(2),
        // backgroundColor: colors.searchField,
        color: colors.mainText,
        // borderRadius: scale(12),
        // width: '100%',
        // paddingHorizontal: indent,
        // marginBottom: halfIndent,
        fontSize: fontSizes.medium,
        fontFamily: fontNames.bold,
        fontWeight: fontWeights.bold,
    },
    menuWrap: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-between',
        overflow: 'hidden',
    },
    emptyBox:{
        width:scale(22),
        height:scale(22),
    },
    menuBtnsWrap: {
        flexDirection: 'row',
        width: '50%',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    filterBtn:{
        width:scale(22),
        // marginBottom: halfIndent,
    },
    buttonsWrap: {
        paddingHorizontal: oneAndHalfIndent,
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems:'center',
        height:scale(55),
        backgroundColor: colors.appBg,
        // ...styles.shadow,
    },
    scrollCnt: {
        paddingTop: HEADER_HEIGHT - startY,
        alignItems: "center",
        borderRadius: scale(12),
        overflow: 'hidden',
    },

    imgMainOne: {
        marginTop: indent,
        width: windowW - doubleIndent,
        height: scale(257),
        borderRadius: 10,
    },
    separator: {
        width: '100%',
        paddingHorizontal: indent,
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignItems: "center",
        marginTop: indent,
        marginBottom: halfIndent,
    },
    separatorTitle: {
        fontSize: fontSizes.cardTitle,
        fontFamily: fontNames.regular,
        fontWeight: fontWeights.black,
    },
    separatorBtn: {
        fontSize: fontSizes.input,
        fontFamily: fontNames.regular,
        fontWeight: fontWeights.medium,
    },
    separatorBtnArrow: {
        fontSize: fontSizes.cardTitle,
        fontFamily: fontNames.bold,
        fontWeight: fontWeights.bold,
    },

    brandsListCnt: {
        paddingHorizontal: thirdIndent,
        height: scale(100),
    },
    itemsListCnt:{
        paddingLeft: indent,
        minHeight: scale(325),
    },
    flatListCnt: {
        // paddingTop: indent,
        paddingTop: HEADER_HEIGHT - startY + indent,
        paddingHorizontal: indent,
    },
    lookItem: {
        width:ITEM_LOOK_SIZE,
        height:ITEM_LOOK_SIZE,
        flexDirection: 'row',
        marginBottom: halfIndent,
        marginRight: indent,
    },
})


// {
//     section === SECTION_SEARCH
//         ? <View style={s.buttonsWrap}>
//             { section === SUBSECTION_OUTFITS
//                 ?
//                 <IconOutfitsActive width={scale(40)} height={scale(21)}/>
//                 :
//                 <TouchableOpacity onPress={this.onOutfitsPress}>
//                     <IconOutfits width={scale(40)} height={scale(21)}/>
//                 </TouchableOpacity>
//             }
//             { section === SUBSECTION_DRAWER
//                 ?
//                 <IconHangerActive width={scale(40)} height={scale(23)}/>
//                 :
//                 <TouchableOpacity onPress={this.onHangerPress}>
//                     <IconHanger width={scale(40)} height={scale(23)}/>
//                 </TouchableOpacity>
//             }
//             { section === SUBSECTION_USER
//                 ?
//                 <IconUserActive width={scale(40)} height={scale(24)}/>
//                 :
//                 <TouchableOpacity onPress={this.onHeartPress}>
//                     <IconUser width={scale(40)} height={scale(24)}/>
//                 </TouchableOpacity>
//             }
//         </View>
//         : null
// }
