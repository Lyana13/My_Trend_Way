import React, {useRef, useState} from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Animated, FlatList } from 'react-native';
import styles, {
    colors,
    fontNames, fontSizes,
    fontWeights,
    halfIndent,
    indent, bbAreaHeight,
    scale,
    startY, windowH, doubleIndent, tripleIndent, barH,
} from '../../../../styles';
import {getCloser, showToast} from '../../../../utils/helpers';
import ArrowBack from '../../../../../assets/icons/arrowBack.svg';
import Brand from '../../../../components/BrandLogoBtn';
import SETTINGS from '../../../../utils/settings';
import {getBrandImage} from '../../../../utils/dataGenerator';
import ItemsList from '../ItemsList/ItemsList';
import AlphaScrollFlatList from 'alpha-scroll-flat-list';

const HEADER_HEIGHT = scale(48) + startY;

class BrandsList extends React.Component<Props> {
    static TYPE_TRENDING = 'trending-now';
    static TYPE_NEW = 'whats-new';
    static TYPE_BRAND = 'filter';

    constructor(props) {
        super(props);

        this.state = {
            topData: [],
            data: [],
            title: 'BRANDS',
            refreshing: false,
            loadMore: true,
            isLoading: false,
            limit: 0,
        };

        fetch(SETTINGS.REST_URL + '/merchants?offset=0&per_page=6&is_top=1', {
            method: 'GET',
            headers: { Authorization: 'Bearer '+props.userToken },
        })
            .then(response => response.json())
            .then(result => {
                for(let item of result.items)
                    if(!item.image) item.image = getBrandImage(item.title.replace(" ", "\n"));

                this.setState({topData:result.items});
            })
            .catch(error => showToast(`Something went wrong, please try again\n${ error.message }`) );

        this.offset = 0;
        this.loadListings();
    }

    loadListings = () => {
        if (!this.state.isLoading && this.state.loadMore) {
            fetch(SETTINGS.REST_URL + '/merchants?offset='+this.offset.toString()+'&per_page=100', {
                method: 'GET',
                headers: { Authorization: 'Bearer '+this.props.userToken },
            })
                .then(response => response.json())
                .then(result => {
                    this.offset+=1;
                    this.setState({isLoading: false, loadMore: result.length === 100, refreshing: false, data: this.state.data.concat(result.items) });
                })
                .catch(error => showToast(`Something went wrong, please try again\n${ error.message }`) );
        }
    };

    onRefreshHandler = () => {
        if(this.state.refreshing) return;
        this.offset = 0;
        this.setState({refreshing: true, loadMore: true, data: [], limit: 0}, this.loadListings);
    };


    onBrandPress = (iID, iTitle) => this.props.navigation.push('ItemsList', {type:ItemsList.TYPE_BRAND, title:iTitle, brand:iID});
    renderBrandLogo = item => <Brand item={item} onPress={() => this.onBrandPress(item.id, item.title)} style={s.brandLogoBtn}/>
    renderBrandText = ({item}) => (<Text onPress={() => this.onBrandPress(item.id, item.title)} style={s.brandTextBtn}>{item.title}</Text>)

    topBrandsArea = () => (
        <View>
            <Text style={s.topBrandsTitle}>My Favourites</Text>
            <View style={s.topBrandsCnt}>
                {this.state.topData.map( obj => this.renderBrandLogo(obj) ) }
            </View>
        </View>
    )

    render() {
        const {title, refreshing, data} = this.state;

        return (
            <View style={s.container}>
                <View style={s.header}>
                    <TouchableOpacity style={s.backBtn} onPress={this.props.navigation.goBack} hitSlop={{top: scale(10), bottom: scale(10), left: scale(10), right: scale(10)}}>
                        <ArrowBack width={scale(12)} height={scale(19)}/>
                    </TouchableOpacity>
                    <Text style={s.title}>{title}</Text>
                    <View style={s.emptyBox}></View>
                </View>
                <AlphaScrollFlatList
                    ListHeaderComponent={this.topBrandsArea}
                    nestedScrollEnabled={true}
                    removeClippedSubviews={true}

                    contentContainerStyle={s.flatListCnt}
                    data={data.sort((prev, next) => prev.title.localeCompare(next.title))}
                    extraData={this.state}
                    onEndReached={ this.loadListings }
                    onEndReachedThreshold={0.5}
                    renderItem={this.renderBrandText}
                    keyExtractor={(item, index) => `list-item-${index}-${item.id}`}
                    scrollKey={'title'}
                    reverse={false}
                    itemHeight={scale(25)}
                    scrollBarContainerStyle={{height:'50%', top:'25%'}}
                    style={{height: windowH - HEADER_HEIGHT - bbAreaHeight + barH}}
                    scrollBarPointerContainerStyle={{right:scale(30), bottom:(windowH - HEADER_HEIGHT - bbAreaHeight + barH) * .25}}
                    scrollBarFontSizeMultiplier={.7}
                    activeColor={colors.designColor1}
                />


            </View>
        );
    }
}
// <FlatList
//     ListHeaderComponent={this.topBrandsArea}
//     nestedScrollEnabled={true}
//     removeClippedSubviews={true}
//     initialNumToRender={30}
//     contentContainerStyle={s.flatListCnt}
//     data={data}
//     extraData={this.state}
//     // onRefresh={this.onRefreshHandler}
//     // refreshing={refreshing}
//     onEndReached={ this.loadListings }
//     onEndReachedThreshold={0.5}
//     renderItem={this.renderBrandText}
//     keyExtractor={(item, index) => `list-item-${index}-${item.id}`}
// />



// const stateToProps = (state) => ({
// });
//
// const dispatchToProps = (dispatch) => ({
// });


export default BrandsList;//connect(stateToProps, dispatchToProps)(ItemsList);

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
    },
    topBrandsTitle: {
        fontFamily: fontNames.regular,
        fontWeight: fontWeights.black,
        fontSize: fontSizes.cardTitle,
        marginBottom: indent,
    },
    topBrandsCnt: {
        flexDirection: "row",
        flexWrap: 'wrap',
        justifyContent: "space-between",
        width: '96.5%',
    },
    brandLogoBtn: {
        width: scale(110),
        height: scale(110),
        marginHorizontal: 0,
        marginBottom: indent,
    },
    brandTextBtn: {
        width: '100%',
        fontFamily: fontNames.regular,
        fontWeight: fontWeights.bold,
        fontSize: fontSizes.cardTitle,
        paddingVertical: halfIndent,
    }
})
