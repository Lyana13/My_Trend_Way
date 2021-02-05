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

class FilterCategory extends React.Component<Props> {

    constructor(props) {
        super(props);

        this.state = {
            title: 'Category',
            active: props.route.params.active,
            data: [],
            loadMore: true,
            isLoading: false,
        };

        this.offset = 0;
        this.loadListings();
    }

    loadListings = () => {
        if (!this.state.isLoading && this.state.loadMore) {
            fetch(SETTINGS.REST_URL + '/categories?offset='+this.offset.toString()+'&per_page=30', {
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

    renderListItem = ({item}) => (<FilterListItem id={item.id} title={item.title} onPress={() => this.onItemPress(item)}  isActive={this.isActive(item.id)} />)

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

export default FilterCategory;

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
})
