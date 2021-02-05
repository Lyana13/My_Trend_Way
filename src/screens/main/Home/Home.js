import React, {useRef, useState} from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Animated, FlatList } from 'react-native';
import styles, {
    colors,
    fontNames, fontSizes,
    fontWeights,
    halfIndent,
    indent,
    quadrantIndent,
    scale,
    startY, windowH,
} from '../../../styles';
import {generateLookItems} from '../../../utils/dataGenerator';
import ItemLook from '../../../components/ItemLook';
import {getCloser, showToast} from '../../../utils/helpers';
import SETTINGS from '../../../utils/settings';
import ItemProduct from '../../../components/ItemProduct';

const {diffClamp} = Animated;
const NAV_BTN_HEIGHT = scale(44);
const HEADER_HEIGHT = NAV_BTN_HEIGHT + indent + startY;
const HEADER_HIDEN = HEADER_HEIGHT - startY;
const POSTS_PER_PAGE = 30;
const AnimatedBtn = Animated.createAnimatedComponent(TouchableOpacity);

const SECTION_SUPPOSE = 'supposed';
const SECTION_FOLLOWING = 'following';
const API_URLS = {[SECTION_SUPPOSE]:'for-you', [SECTION_FOLLOWING]:'following'};

class Home extends React.Component<Props> {
    constructor(props) {
        super(props);

        this.state = {
            section: SECTION_SUPPOSE,
            [SECTION_SUPPOSE]: {
                data: [],
                refreshing: false,
                loadMore: true,
                isLoading: false,
            },
            [SECTION_FOLLOWING]: {
                data: [],
                refreshing: false,
                loadMore: true,
                isLoading: false,
            },
            // data: generateLookItems(10),
            // type: 'supposed',
            // refreshing: false,
            // loadMore: true,
            // isLoading: false,
            // limit: 0,
            // offset: 0,
        };

        this.offset = {
            [SECTION_SUPPOSE]:0,
            [SECTION_FOLLOWING]:0,
        };

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

        this.contentOffsetY = this.translateYNumber = 0;
        this.ref = null

        this.translateY.addListener(({value}) => {
            this.translateYNumber = value;
        });

        this.loadListings();
    }

    /**
     * ON SCROLL ANIMATION
     */
    handleScroll = e => {
        const {isLoading, refreshing} = this.state[this.state.section];
        this.contentOffsetY = e.nativeEvent.contentOffset.y;
        if (e.nativeEvent.contentOffset.y >= 0 && e.nativeEvent.contentOffset.y <= e.nativeEvent.contentSize.height - windowH*1.1 && !refreshing && !isLoading){
            this.scrollY.setValue(e.nativeEvent.contentOffset.y);
        }
        // if(e.nativeEvent.contentOffset.y >= 0 && e.nativeEvent.contentOffset.y <= e.nativeEvent.contentSize.height - windowH && !this.state.refreshing && !this.state.isLoading)
        //     this.scrollY.setValue(e.nativeEvent.contentOffset.y);
    };

    handleSnap = ({nativeEvent}) => {
        this.contentOffsetY = nativeEvent.contentOffset.y;
        if (!(this.translateYNumber === 0 || this.translateYNumber === -HEADER_HIDEN) && this.ref) {
            this.ref.scrollToOffset({
                offset:
                    getCloser(this.translateYNumber, -HEADER_HIDEN, 0) === -HEADER_HIDEN
                        ? this.contentOffsetY - Math.abs(this.translateYNumber)
                        : this.contentOffsetY + (HEADER_HIDEN - Math.abs(this.translateYNumber)),
            });
        }
    };

    /**
     * LOAD DATA FROM SERVER
     */
    loadListings = () => {
        const section = this.state.section;
        const {loadMore, isLoading, } = this.state[section];
        const offset = this.offset[section];
        const url = API_URLS[section];

        if (!isLoading && loadMore) {
            fetch(SETTINGS.REST_URL + '/looks/'+ url +'?offset='+offset.toString()+'&per_page='+POSTS_PER_PAGE.toString(), {
                method: 'GET',
                headers: { Authorization: 'Bearer '+this.props.userToken },
            })
                .then(response => response.json())
                .then(result => {
                    const items = result.items ? result.items : result;
                    console.log(items);
                    this.offset[section]+=POSTS_PER_PAGE;
                    this.setState({...this.state, [section]:{isLoading: false, loadMore: items.length === POSTS_PER_PAGE, refreshing: false, data: this.state[section].data.concat(items) } });
                })
                .catch(error => showToast(`Something went wrong, please try again\n${ error.message }`) );
        }
    };

    onRefreshHandler = () => {
        const section = this.state.section;
        if (this.state[section].refreshing) return;
        this.offset[section] = 0;
        this.setState({...this.state, [section]: {...this.state[section], refreshing: true, loadMore: true, data: []}}, this.loadListings);
    };

    showSupposedItems = () => {
        if(this.state.section === SECTION_SUPPOSE){
            // return;
            if(this.ref && this.state[this.state.section].data.length)this.ref.scrollToIndex({animated:true, index:0, viewPosition:0});
        }else {
            // if (this.ref) this.ref.scrollToIndex({animated: false, index: 0, viewPosition: 0});
            this.setState({section: SECTION_SUPPOSE});
        }
    }

    showFollowingItems = () => {
        if(this.state.section === SECTION_FOLLOWING) {
            // return;
            if(this.ref && this.state[this.state.section].data.length)this.ref.scrollToIndex({animated:true, index:0, viewPosition:0});
        }else {
            // if (this.ref) this.ref.scrollToIndex({animated: false, index: 0, viewPosition: 0});
            this.setState({section: SECTION_FOLLOWING});
        }
    };

    renderItemLook = ({item, index}) => <ItemLook item={item} userToken={this.props.userToken} navigation={this.props.navigation}/>

    render() {
        const section = this.state.section;
        const {data, refreshing} = this.state[section];
        const animStyle = {opacity: this.translateOpacity };

        return (
            <View style={s.container}>
                <Animated.View style={[s.header, {transform: [{translateY: this.translateY}]}]}>
                    <AnimatedBtn style={[s.typeBtn, animStyle, section === SECTION_SUPPOSE ? s.typeBtnSelected : null]} onPress={this.showSupposedItems}>
                        <Text style={[s.typeBtnText, section === SECTION_SUPPOSE ? s.typeBtnTextSelected : null]}>For you</Text>
                    </AnimatedBtn >
                    <AnimatedBtn style={[s.typeBtn, animStyle, section === SECTION_FOLLOWING ? s.typeBtnSelected : null]} onPress={this.showFollowingItems}>
                        <Text style={[s.typeBtnText, section === SECTION_FOLLOWING ? s.typeBtnTextSelected : null]}>Following</Text>
                    </AnimatedBtn >
                </Animated.View>
                <FlatList
                    scrollEventThrottle={16}
                    nestedScrollEnabled={true}
                    removeClippedSubviews={true}
                    initialNumToRender={20}
                    contentContainerStyle={s.flatListCnt}
                    onScroll={this.handleScroll}
                    ref={c => this.ref = c}
                    onMomentumScrollEnd={this.handleSnap}
                    data={data}
                    extraData={this.state}
                    onRefresh={this.onRefreshHandler}
                    refreshing={refreshing}
                    onEndReached={ this.loadListings }
                    onEndReachedThreshold={0.5}
                    renderItem={this.renderItemLook}
                    keyExtractor={(item, index) => `list-item-${index}-${item.id}`}
                />
            </View>
        );
    }
}

export default Home;

const s = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column",
        backgroundColor: colors.appBg,
        marginTop: startY,
    },
    header: {
        flexDirection: "row",
        position: 'absolute',
        backgroundColor: colors.appBg,
        left: 0,
        right: 0,
        top: -startY,
        width: '100%',
        height: HEADER_HEIGHT,
        zIndex: 1,
        alignItems: 'flex-end',
        justifyContent: "center",
        ...styles.shadow,
    },
    typeBtn: {
        borderRadius: scale(20),
        width: scale(100),
        height: NAV_BTN_HEIGHT,
        marginBottom: halfIndent,
        marginHorizontal: quadrantIndent,
        justifyContent: "center",
    },
    typeBtnSelected: {
        backgroundColor: colors.designColor1,
    },
    typeBtnText: {
        fontFamily: fontNames.regular,
        fontWeight: fontWeights.bold,
        fontSize: fontSizes.regular,
        textAlign: 'center'
    },
    typeBtnTextSelected: {
        fontWeight: fontWeights.black,
    },
    flatListCnt: {
        paddingTop: HEADER_HEIGHT - startY,
    }
})
