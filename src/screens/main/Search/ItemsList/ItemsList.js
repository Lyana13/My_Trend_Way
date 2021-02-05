import React, {useRef, useState} from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Animated, FlatList } from 'react-native';
import styles, {
    colors,
    fontNames, fontSizes,
    fontWeights,
    halfIndent,
    indent,
    scale,
    startY,
} from '../../../../styles';
import {getCloser, showToast} from '../../../../utils/helpers';
import ArrowBack from '../../../../../assets/icons/arrowBack.svg';
import ItemProduct, {ITEM_VIEW_SIZE} from '../../../../components/ItemProduct';
import SETTINGS from '../../../../utils/settings';

const HEADER_HEIGHT = scale(48) + startY;
const PER_PAGE = 20;

class ItemsList extends React.Component<Props> {
    static TYPE_TRENDING = 'trending-now';
    static TYPE_NEW = 'whats-new';
    static TYPE_BRAND = 'filter';

    constructor(props) {
        super(props);

        this.state = {
            data: [],
            type: props.route.params.type + (props.route.params.type === ItemsList.TYPE_BRAND ? '?merchant_ids[]='+props.route.params.brand.toString()+'&' : '?'),
            title: props.route.params.title,
            refreshing: false,
            loadMore: true,
            isLoading: false,
            limit: 0,
        };

        this.offset = 0;
        this.loadListings();
    }

//    buildQuery = () => '&posts_per_page=' + POSTS_PER_PAGE + '&offset=' + offset;

    loadListings = () => {
        if (!this.state.isLoading && this.state.loadMore) {
            fetch(SETTINGS.REST_URL + '/products/'+ this.state.type +'offset='+this.offset.toString()+'&per_page='+PER_PAGE.toString(), {
                method: 'GET',
                headers: { Authorization: 'Bearer '+this.props.userToken },
            })
                .then(response => response.json())
                .then(result => {
                    this.offset+=PER_PAGE;
                    this.setState({isLoading: false, refreshing: false, loadMore: result.items.length === PER_PAGE, data: this.state.data.concat(result.items) });
                })
                .catch(error => showToast(`Something went wrong, please try again\n${ error.message }`) );
        }
    };

    onRefreshHandler = () => {
        if(this.state.refreshing) return;
        this.offset = 0;
        this.setState({refreshing: true, loadMore: true, data: [], limit: 0}, this.loadListings);
    };

    onItemPress = (iID, iImg ) => {
        this.props.navigation.push('Product', {id:iID, image:iImg});
    }

    renderItemLarge = ({ item }) => <ItemProduct item={item} onPress={() => this.onItemPress(item.id, item.image)} size={ITEM_VIEW_SIZE.large}/>

    render() {
        const {type, title, refreshing, data} = this.state;

        return (
            <View style={s.container}>
                <View style={s.header}>
                    <TouchableOpacity style={s.backBtn} onPress={this.props.navigation.goBack} hitSlop={{top: scale(10), bottom: scale(10), left: scale(10), right: scale(10)}}>
                        <ArrowBack width={scale(12)} height={scale(19)}/>
                    </TouchableOpacity>
                    <Text style={s.title}>{title}</Text>
                    <View style={s.emptyBox}></View>
                </View>
                <FlatList
                    // scrollEventThrottle={16}
                    nestedScrollEnabled={true}
                    removeClippedSubviews={true}
                    initialNumToRender={PER_PAGE}
                    numColumns={2}
                    contentContainerStyle={s.flatListCnt}
                    data={data}
                    extraData={this.state}
                    onRefresh={this.onRefreshHandler}
                    refreshing={refreshing}
                    onEndReached={ this.loadListings }
                    onEndReachedThreshold={0.5}
                    renderItem={this.renderItemLarge}
                    keyExtractor={(item, index) => `list-item-${index}-${item.id}`}
                />
            </View>
        );
    }
}


// const stateToProps = (state) => ({
// });
//
// const dispatchToProps = (dispatch) => ({
// });

export default ItemsList;//connect(stateToProps, dispatchToProps)(ItemsList);

const s = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column",
        backgroundColor: colors.appBg,
    },
    header: {
        flexDirection: "row",
        backgroundColor: colors.appBg,
        left: 0,
        right: 0,
        width: '100%',
        height: HEADER_HEIGHT,
        zIndex: 1,
        alignItems: 'flex-end',
        justifyContent: "space-between",
        paddingBottom: halfIndent,
        paddingHorizontal: indent,
        ...styles.shadow,
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
    flatListCnt: {
        paddingTop: indent,
        paddingHorizontal: indent,
    }
})
