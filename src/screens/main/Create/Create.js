import React, {useRef, useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Animated, FlatList, Image, TextInput} from 'react-native';
import styles, {
    colors,
    fontNames, fontSizes,
    fontWeights,
    halfIndent,
    indent,
    quadrantIndent,
    scale,
    startY, thirdIndent, windowH, windowW,
} from '../../../styles';
import {getCloser, showToast} from '../../../utils/helpers';
import IconClose from '../../../../assets/icons/close.svg';
import IconSearch from '../../../../assets/icons/searchInputArea.svg';
import IconLiked from '../../../../assets/icons/heartEmpty.svg';
import SETTINGS from '../../../utils/settings';
import Filter, {initialFilter} from '../../Filter';
import ItemProduct, {ITEM_VIEW_SIZE} from '../../../components/ItemProduct';
import CategoryItemBtn from '../../../components/CategoryItemBtn';
import SearchIcon from '../../../../assets/icons/searchInputArea.svg';
import IconFilter from '../../../../assets/icons/filterIcon.svg';
import LookComposition from '../../../components/LookComposition';

const {diffClamp} = Animated;
const SEARCH_HEIGHT = scale(44);
const HEADER_HEIGHT = SEARCH_HEIGHT + indent + startY;
const OFFSET_Y = HEADER_HEIGHT + windowW - SEARCH_HEIGHT;
const LIST_Y = HEADER_HEIGHT + windowW + SEARCH_HEIGHT*2 + indent
const PER_PAGE = 30;
const AnimatedBtn = Animated.createAnimatedComponent(TouchableOpacity);

class Create extends React.Component<Props> {
    constructor(props) {
        super(props);

        this.state = {
            type: 'supposed',
            products: {
                data: [],
                refreshing: false,
                loadMore: true,
                isLoading: false,
            },
            liked: {
                data: [],
                refreshing: false,
                loadMore: true,
                isLoading: false,
            },
            categories:{
                data: [],
                loadMore: true,
                isLoading: false,
            },
            filter:{...initialFilter},
            items: [{}],
            activeItem: 0,
            search: '',
        };

        this.offsetProducts = 0;
        this.offsetLiked = 0;
        this.offsetCategories = 0;
        // this.filter = {...initialFilter};

        this.scrollY = new Animated.Value(0);
        this.scrollYClamped = diffClamp(this.scrollY, 0, OFFSET_Y);
        this.translateY = this.scrollYClamped.interpolate({
            inputRange: [0, OFFSET_Y],
            outputRange: [0, -OFFSET_Y],
            extrapolate: 'clamp'
        });
        this.translateControlsY = this.scrollYClamped.interpolate({
            inputRange: [0, OFFSET_Y],
            outputRange: [0, -SEARCH_HEIGHT],
            extrapolate: 'clamp'
        });
        this.translateFadeOut = this.scrollYClamped.interpolate({
            inputRange: [0, OFFSET_Y],
            outputRange: [1, 0],
            extrapolate: 'clamp'
        });
        this.translateFadeIn = this.scrollYClamped.interpolate({
            inputRange: [0, OFFSET_Y],
            outputRange: [0, 1],
            extrapolate: 'clamp'
        });


        this.contentOffsetY = this.translateYNumber = 0;
        this.itemsList = null

        this.translateY.addListener(({value}) => {
            this.translateYNumber = value;
        });

        this.loadCategories();
        this.loadProducts();
    }


    /**
     * ON SCROLL ANIMATION
     */
    handleScroll = e => {
        this.contentOffsetY = e.nativeEvent.contentOffset.y;
        if (e.nativeEvent.contentOffset.y >= 0 && e.nativeEvent.contentOffset.y <= e.nativeEvent.contentSize.height - windowH*1.1 && !this.state.products.refreshing && !this.state.products.isLoading){
            this.scrollY.setValue(e.nativeEvent.contentOffset.y);
        }
    };

    handleSnap = ({nativeEvent}) => {
        this.contentOffsetY = nativeEvent.contentOffset.y;
        if (!(this.translateYNumber === 0 || this.translateYNumber === -OFFSET_Y) && this.itemsList) {
            this.itemsList.scrollToOffset({
                offset:
                    getCloser(this.translateYNumber, -OFFSET_Y, 0) === -OFFSET_Y
                        ? this.contentOffsetY - Math.abs(this.translateYNumber)
                        : this.contentOffsetY + (OFFSET_Y - Math.abs(this.translateYNumber)),
            });
        }
    };

    /**
     * LOAD DATA FROM SERVER
     */
        //TODO : move logic to redux
    loadCategories = () => {
        if (!this.state.categories.isLoading && this.state.categories.loadMore) {
            fetch(SETTINGS.REST_URL + '/categories?offset='+this.offsetCategories.toString()+'&per_page=30', {
                method: 'GET',
                headers: { Authorization: 'Bearer '+ this.props.route.params.userToken },
            })
                .then(response => response.json())
                .then(result => {
                    this.offsetCategories+=30;
                    this.setState({categories:{...this.state.categories, isLoading: false, loadMore: result.length === 30, data: this.state.categories.data.concat(result.items) }} );
                })
                .catch(error => showToast(`Something went wrong, please try again\n${ error.message }`) );
        }
    };

    loadProducts = () => {
        if (!this.state.products.isLoading && this.state.products.loadMore) {
            let url = SETTINGS.REST_URL + '/products/filter?'+ 'offset='+this.offsetProducts.toString()+'&per_page='+PER_PAGE.toString()+'&q='+this.state.search;

            if(this.state.filter.sortActive !== '') url = url + '&sort='+this.state.filter.sortActive;
            for (let i=0; i<this.state.filter.categories.length; i++) url = url + '&category_ids[]=' + this.state.filter.categories[i].id;
            for (let a=0; a<this.state.filter.brands.length; a++) url = url + '&merchant_ids[]=' + this.state.filter.brands[a].id;
            for (let b=0; b<this.state.filter.colors.length; b++) url = url + '&colour_ids[]=' + this.state.filter.colors[b].id;

            fetch(url, {
                method: 'GET',
                headers: { Authorization: 'Bearer '+this.props.route.params.userToken },
            })
                .then(response => response.json())
                .then(result => {
                    this.offsetProducts+=PER_PAGE;
                    this.setState({products : {...this.state.products, isLoading: false, refreshing: false, loadMore: result.items.length === PER_PAGE, data: this.state.products.data.concat(result.items) }}, () => {
                        /**
                         * JUMP after change filter
                         */
                        if(this.itemsList && this.offsetProducts === PER_PAGE && this.translateYNumber === -OFFSET_Y) {
                            this.scrollY.setValue(0);
                            this.itemsList.scrollToOffset({offset: OFFSET_Y, animated: false});
                            this.scrollY.setValue(OFFSET_Y);
                        }
                    });
                })
                .catch(error => showToast(`Something went wrong, please try again\n${ error.message }`) );
        }
    };

    onRefreshHandler = (iData) => {
        if (this.state.products.refreshing) return;
        this.offsetProducts = 0;
        this.setState({products : {...this.state.products, refreshing: true, loadMore: true, data: []}, ...iData}, this.loadProducts);
    };

    isActive = (iID) => {
        const containID = this.state.filter.categories.findIndex(item => item.id === iID);
        return containID !== -1;
    }

    onClosePress = () => this.props.navigation.navigate('Main');
    onSearchPress = () => this.itemsList.scrollToOffset({offset: this.contentOffsetY+(OFFSET_Y+this.translateYNumber)});
    onLikedPress = () => {

    }

    onCategoryItemPress = ({id, title}) => {
        const containID = this.state.filter.categories.findIndex(item => item.id === id);
        let newItems = this.state.filter.categories.slice();
        if(containID === -1){
            newItems = [{id:id, title:title}];
            // newItems.push({id:id, title:title});
        }else{
            newItems.splice(containID, 1);
        }
        this.onRefreshHandler({filter:{...this.state.filter, categories:newItems}});
    }

    onProductItemPress = (id, image) => {
        let newItems = this.state.items.slice();
        if(!newItems[this.state.activeItem]) newItems.push({});

        newItems[this.state.activeItem].id = id;
        newItems[this.state.activeItem].image = image;

        let newActive = this.state.activeItem;

        if(newItems.length < 6 && newActive === newItems.length-1) {
            newItems.push({});
            // newActive+=1;
        }
        // else if(newItems.length === 6){
            newActive = newItems.length-1;
        // }

        this.setState({items: newItems, activeItem:newActive}, () => {
            if(this.translateYNumber !== 0)
                this.itemsList.scrollToOffset({offset: this.contentOffsetY+this.translateYNumber})
        });
    }

    getItemLayout = (data, index) => ({length: scale(181)+halfIndent, offset: (scale(181)+halfIndent) * index, index});
    renderItemSmall = ({item, index}) => <ItemProduct item={item} onPress={() => this.onProductItemPress(item.id, item.image)} size={ITEM_VIEW_SIZE.small}/> ;
    renderCategoryBtn = ({ item }) => <CategoryItemBtn id={item.id} title={item.title} onPress={() => this.onCategoryItemPress(item)}  isActive={this.isActive(item.id)} />
    onLookItemPress = id => {
        if(this.state.activeItem === id){
            this.setState({activeItem: this.state.items.length - 1});
        } else {
            this.setState({activeItem: id});
        }
    }

    onLookItemDelete = id => {
        let newItems = this.state.items.slice();
        newItems.splice(id, 1);
        if(newItems[newItems.length-1].image) newItems.push({});

        this.setState({items: newItems, activeItem: newItems.length - 1});
    }

    onFilterPress = () => {
        // if(this.bottomSheet) this.bottomSheet.open();
        this.props.navigation.push('Filter', {onClose:this.onFilterClosePress, onApply:this.onFilterApplyPress, active:this.state.filter});
    }

    onFilterClosePress = () => {
        // if(this.bottomSheet) this.bottomSheet.close();
        this.props.navigation.navigate({name: 'Create'});
    }

    onFilterApplyPress = (iValue) => {
        // if(this.bottomSheet) this.bottomSheet.close();
        this.props.navigation.navigate({name: 'Create'});
        this.onRefreshHandler({filter:iValue});
    }

    onChangeSearch = text => {
        if(this.searchTime) clearTimeout(this.searchTime)
        this.searchTime = setTimeout(this.onRefreshHandler, 500, { search: text})
        // this.onRefreshHandler({ search: text});
    }

    onNextPress = () => {
        let newItems = this.state.items.slice();
        if(!newItems[newItems.length - 1].id) newItems.splice(newItems.length - 1, 1);
        this.props.navigation.push('PublishLook', {items:newItems});
    }

    render() {
        const {products, liked, categories, items, filter, activeItem} = this.state;
        const fadeOutStyle = {opacity: this.translateFadeOut, transform: [{translateY: this.translateControlsY}]};
        const fadeInStyle = {opacity: this.translateFadeIn, transform: [{translateY: this.translateControlsY}]};

        return (
            <View style={s.container}>
                <Animated.View style={[s.topCnt, {transform: [{translateY: this.translateY}]}]}>
                    <View style={s.header}>
                        <TouchableOpacity style={s.backBtn} onPress={this.onClosePress}
                                          hitSlop={{top: scale(10), bottom: scale(10), left: scale(10), right: scale(10)}}>
                            <IconClose width={scale(20)} height={scale(20)}/>
                        </TouchableOpacity>
                        <Text style={s.title}>Create</Text>
                        <Text style={[s.nextBtn, items.length <= 1 ? s.nextBtnDisabled : null]} onPress={items.length <= 1 ? null : this.onNextPress}
                              hitSlop={{top: scale(15), bottom: scale(15), left: 0, right: 0}}>Next</Text>
                    </View>
                    <Animated.View style={[s.wrapImages, {opacity: this.translateFadeOut}]}>
                        <LookComposition value={items} onPress={this.onLookItemPress} onDelete={this.onLookItemDelete} active={activeItem}/>
                    </Animated.View>

                    <View style={s.controlsCnt}>
                        <Animated.View style={[s.subMenuCnt, fadeOutStyle]}>
                            <TouchableOpacity style={s.subMenuBtn} onPress={this.onSearchPress}
                                              hitSlop={{top: scale(10), bottom: scale(10), left: scale(10), right: scale(10)}}>
                                <IconSearch width={scale(23)} height={scale(23)} fill={colors.normalIcon} opacity={1}/>
                            </TouchableOpacity>
                            <TouchableOpacity style={s.subMenuBtn} onPress={this.onLikedPress}
                                              hitSlop={{top: scale(10), bottom: scale(10), left: scale(10), right: scale(10)}}>
                                <IconLiked width={scale(28)} height={scale(25)}/>
                            </TouchableOpacity>
                        </Animated.View>

                        <Animated.View style={[s.searchCnt, fadeInStyle]}>
                            <View style={s.inputCnt}>
                                <SearchIcon with={scale(22)} height={scale(22)}/>
                                <TextInput placeholder="Search"
                                           style={s.input}
                                           placeholderTextColor={colors.placeholderText}
                                           selectionColor={colors.designColor1}
                                           clearButtonMode={'always'}
                                           returnKeyType={'search'}
                                           onChangeText={this.onChangeSearch}
                                    // onFocus={onTextFieldFocusIn}
                                    // onBlur={onTextFieldFocusOut}
                                />
                            </View>
                            <TouchableOpacity style={s.filterBtn} onPress={this.onFilterPress} hitSlop={{top: scale(10), bottom: scale(10), left: scale(10), right: scale(10)}}>
                                <IconFilter width={scale(20)} height={SEARCH_HEIGHT}/>
                            </TouchableOpacity>
                        </Animated.View>
                    </View>

                    <FlatList
                        nestedScrollEnabled={true}
                        removeClippedSubviews={true}
                        showsVerticalScrollIndicator={false}
                        showsHorizontalScrollIndicator={false}
                        horizontal={true}
                        initialNumToRender={10}
                        contentContainerStyle={s.categoryCnt}
                        data={categories.data}
                        extraData={this.state}
                        onEndReached={ this.loadCategories }
                        onEndReachedThreshold={0.5}
                        renderItem={this.renderCategoryBtn}
                        keyExtractor={(item, index) => `new-item-${index}-${item.id}`}
                    />
                </Animated.View>
                <Animated.FlatList
                    scrollEventThrottle={16}
                    // nestedScrollEnabled={true}
                    removeClippedSubviews={true}
                    getItemLayout={this.getItemLayout}
                    initialNumToRender={PER_PAGE}
                    numColumns={3}
                    onScroll={this.handleScroll}
                    onMomentumScrollEnd={this.handleSnap}
                    scrollToOverflowEnabled={true}
                    ref={c => this.itemsList = c}
                    data={products.data}
                    extraData={this.state}
                    ListHeaderComponent={<View/>}
                    ListHeaderComponentStyle={s.listHeader}
                    style={[s.flatList]}//, {transform: [{translateY: this.translateY}]}
                    contentContainerStyle={s.flatListCnt}
                    // onRefresh={this.onRefreshHandler}
                    // refreshing={products.refreshing}
                    onEndReached={ this.loadProducts }
                    onEndReachedThreshold={0.5}
                    renderItem={this.renderItemSmall}
                    keyExtractor={(item, index) => `list-item-${index}-${item.id}`}
                />
            </View>
        );
    }
}

export default Create;

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
        zIndex: 1,
        ...styles.shadow,
    },
    header: {
        flexDirection: "row",
        backgroundColor: colors.appBg,
        width: '100%',
        height: HEADER_HEIGHT,
        zIndex: 1,
        alignItems: 'flex-end',
        justifyContent: "space-between",
        paddingHorizontal: indent,
        paddingBottom: halfIndent,
    },
    title: {
        fontFamily: fontNames.regular,
        fontWeight: fontWeights.black,
        fontSize: fontSizes.cardTitle,
        textAlign: 'center',
        flex: 0.5,
    },
    backBtn: {
        width: scale(12),
        height: scale(30),
        justifyContent: "center",
        flex: 0.25,
    },
    nextBtn: {
        fontFamily: fontNames.regular,
        fontWeight: fontWeights.black,
        fontSize: fontSizes.cardTitle,
        textAlign: 'right',
        color: colors.designColor1,
        flex: 0.25,
    },
    nextBtnDisabled: {
        color: colors.subMenuInactive,
    },

    wrapImages: {
        padding: scale(7.5),
        width: windowW,
        height: windowW,
        flexDirection: 'row',
        backgroundColor: colors.lightGray,
    },


    controlsCnt:{
        height: SEARCH_HEIGHT,
        overflow: 'hidden',
        marginVertical: quadrantIndent,
    },
    subMenuCnt: {
        flexDirection: 'row',
        justifyContent: "center",
        alignItems: 'center',
        height: SEARCH_HEIGHT,
    },
    subMenuBtn: {
        marginHorizontal: indent,
    },
    searchCnt: {
        paddingHorizontal: indent,
        flexDirection: 'row',
        backgroundColor: colors.appBg,
        width: '100%',
        height: SEARCH_HEIGHT,
        zIndex: 1,
        alignItems: 'center',
        justifyContent: "space-between",
    },
    inputCnt: {
        width: '90%',
        height: '100%',
        borderColor: colors.borderColor,
        borderWidth: scale(2),
        borderRadius: scale(12),
        backgroundColor: colors.lightGray,
        paddingHorizontal: halfIndent,
        flexDirection: 'row',
        alignItems: "center",
    },
    input: {
        height: SEARCH_HEIGHT,
        flex:1,
        marginLeft: halfIndent,
        color: colors.mainText,
        fontSize: fontSizes.medium,
        fontFamily: fontNames.bold,
        fontWeight: fontWeights.bold,
    },
    filterBtn:{
        // marginBottom: halfIndent,
    },

    categoryCnt: {
        marginVertical: quadrantIndent,
        marginBottom: halfIndent,
        paddingHorizontal: thirdIndent,
    },
    categoryBtn: {

    },


    flatList:{
        height: windowH,
        width: '100%'
    },
    listHeader: {
        height:LIST_Y,
        width:'100%',
    },
    flatListCnt: {
        paddingHorizontal: halfIndent,
    }

})
