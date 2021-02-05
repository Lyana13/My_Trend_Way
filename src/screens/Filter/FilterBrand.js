import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity, FlatList} from 'react-native';

import ArrowBack from '../../../assets/icons/arrowBack.svg';

import styles, {
    barH,
    colors,
    fontNames,
    fontSizes,
    fontWeights,
    indent,
    scale,
} from '../../styles';
import SETTINGS from '../../utils/settings';
import {getBrandImage} from '../../utils/dataGenerator';
import {showToast} from '../../utils/helpers';
import Brand from '../../components/BrandLogoBtn';
import FilterListItem from '../../components/FilterListItem';

const HEADER_HEIGHT = scale(81);

class FilterBrand extends React.Component<Props> {

    constructor(props) {
        super(props);

        this.state = {
            title: 'Brand',
            active: props.route.params.active,
            topData: [],
            data: [],
            loadMore: true,
            isLoading: false,
            limit: 0,
        };

        fetch(SETTINGS.REST_URL + '/merchants?offset=0&per_page=6&is_top=1', {
            method: 'GET',
            headers: { Authorization: 'Bearer '+props.route.params.userToken },
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
            fetch(SETTINGS.REST_URL + '/merchants?offset='+this.offset.toString()+'&per_page=30', {
                method: 'GET',
                headers: { Authorization: 'Bearer '+ this.props.route.params.userToken },
            })
                .then(response => response.json())
                .then(result => {
                    this.offset+=1;
                    this.setState({isLoading: false, loadMore: result.length === 30, data: this.state.data.concat(result.items) });
                })
                .catch(error => showToast(`Something went wrong, please try again\n${ error.message }`) );
        }
    };

    componentDidUpdate(prevProps, prevState, snapshot) {
        if(prevState.active !== this.state.active){
            this.props.route.params.onChange(this.state.active);
        }
    }

    onClear = () => this.setState({active:[]});

    isActive = (iID) => {
        const containID = this.state.active.findIndex(item => item.id === iID);
        return containID !== -1;
    }

    onItemPress = ({id, title}) => {
        const containID = this.state.active.findIndex(item => item.id === id);
        let newItems = this.state.active.slice();
        if(containID === -1){
            newItems.push({id:id, title:title});
        }else{
            newItems.splice(containID, 1);
        }
        this.setState({active:newItems});
    }

    renderBrandLogo = item => <Brand item={item} onPress={() => this.onItemPress(item)} style={[s.brandLogoBtn, this.isActive(item.id) ? s.brandLogoBtnActive : null]}/>
    renderListItem = ({item}) => (<FilterListItem id={item.id} title={item.title} onPress={() => this.onItemPress(item)}  isActive={this.isActive(item.id)} />)

    renderTopBrandsArea = () => (
        <>
            <Text style={s.topBrandsTitle}>My Favourites</Text>
            <View style={s.topBrandsCnt}>
                {this.state.topData.map( obj => this.renderBrandLogo(obj) ) }
            </View>
        </>
    )

    render() {
        const {title, data} = this.state;

        return(
            <View style={s.container}>
                <View style={s.header}>
                    <TouchableOpacity style={s.backBtn} onPress={this.props.navigation.goBack} hitSlop={{top: scale(10), bottom: scale(10), left: scale(10), right: scale(10)}}>
                        <ArrowBack width={scale(20)} height={scale(20)}/>
                    </TouchableOpacity>
                    <Text style={s.title}>{title}</Text>
                    <Text style={s.clearBtn} onPress={this.onClear} hitSlop={{top: scale(15), bottom: scale(15), left: 0, right: 0}}>Clear</Text>
                </View>
                <FlatList
                    ListHeaderComponent={this.renderTopBrandsArea}
                    nestedScrollEnabled={true}
                    removeClippedSubviews={true}
                    initialNumToRender={30}
                    contentContainerStyle={s.flatListCnt}
                    data={data}
                    extraData={this.state}
                    onEndReached={ this.loadListings }
                    onEndReachedThreshold={0.5}
                    renderItem={this.renderListItem}
                    keyExtractor={(item, index) => `list-brand-item-${index}-${item.id}`}
                />
                <TouchableOpacity style={s.applyBtn} onPress={this.props.route.params.onApply}>
                    <Text style={s.titleApplyBtn}>Filter</Text>
                </TouchableOpacity>
            </View>
        )
    }
}

export default FilterBrand;

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
        alignItems: 'center',
        justifyContent: "space-between",
        paddingHorizontal: indent,
        // ...styles.shadow,
    },
    title: {
        fontFamily: fontNames.regular,
        fontWeight: fontWeights.black,
        fontSize: fontSizes.cardTitle,
        textAlign: 'center',
        flex: 0.7,
    },
    backBtn: {
        width: scale(12),
        height: scale(30),
        justifyContent: "center",
        flex: 0.15,
    },
    clearBtn: {
        fontFamily: fontNames.regular,
        fontWeight: fontWeights.black,
        fontSize: fontSizes.cardTitle,
        textAlign: 'right',
        color: colors.designColor1,
        flex: 0.15,
    },
    applyBtn:{
        height: scale(57),
        marginHorizontal: indent,
        backgroundColor: colors.designColor1,
        justifyContent: "center",
        alignItems: 'center',
        borderRadius: scale(4),
        marginBottom: barH,
    },
    titleApplyBtn:{
        fontFamily: fontNames.regular,
        fontWeight: fontWeights.black,
        fontSize: fontSizes.regular,
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
        width: '100%',
    },
    brandLogoBtn: {
        width: scale(110),
        height: scale(110),
        marginHorizontal: 0,
        marginBottom: indent,
    },
    brandLogoBtnActive: {
        borderWidth: scale(2),
        borderColor: colors.designColor1,
    },
})
