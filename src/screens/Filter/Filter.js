import React from 'react';
import { View, Text, StyleSheet,ScrollView, TouchableOpacity} from 'react-native'

import IconClose from '../../../assets/icons/close.svg';
import CircleInactive from '../../../assets/icons/listItemCircleInactive.svg';
import CircleActive from '../../../assets/icons/listItemCircleActive.svg';
import ArrowNext from '../../../assets/icons/arrowNext.svg';
import ArrowDown from '../../../assets/icons/arrowDown.svg';

import styles, {
    barH,
    colors,
    fontNames,
    fontSizes,
    fontWeights,
    halfIndent,
    indent,
    quadrantIndent,
    scale, windowW,
} from '../../styles';
import FilterListItem from '../../components/FilterListItem';
import FilterColor from './FilterColor';

const HEADER_HEIGHT = scale(81);

export const initialFilter = { sortActive: '', categories:[], brands:[], colors:[] };

const sort = [
    {title:'For You', filter:''},
    {title:'New Items', filter:'new'},
    {title:'Price (low first)', filter:'price_asc'},
    {title:'Price (high first)', filter:'price_desc'},
]

const SortItem = ({title, filter, isActive, onPress}) => (
    <TouchableOpacity style={s.sortItemCnt} onPress={() => onPress(filter)}>
        <Text style={s.sortItemTitle}>{title}</Text>
        {isActive
            ? <CircleActive width={scale(25)} height={scale(25)} />
            : <CircleInactive width={scale(25)} height={scale(25)} />
        }
    </TouchableOpacity>
);

const SectionItem = ({title, onPress, isOpen}) => (
    <TouchableOpacity style={s.sortItemCnt} onPress={onPress}>
        <Text style={s.sortItemTitle}>{title}</Text>
        {isOpen
            ? <ArrowDown width={scale(22)} height={scale(12)}/>
            : <ArrowNext width={scale(12)} height={scale(22)}/>
        }
    </TouchableOpacity>
);

class Filter extends React.Component<Props> {

    constructor(props) {
        super(props);
        // console.log('!!! FILTER >>> onClose: ' + props.route.params.onClose );
        // console.log('!!! FILTER >>> onApply: ' + props.route.params.onApply);
        // console.log('!!! FILTER >>> active: ' + props.route.params.active);
        // console.log('!!! FILTER >>> userToken: ' + props.route.params.userToken);

        this.state = {
            title: 'Filter',
            colorIsOpen: false,
            active: {
                ...initialFilter,
                ...props.route.params.active,
            },
        };
    }

    /******
     * FILTER MAIN
     */
    onClear = () => this.setState({active : {...initialFilter}});
    onFilterApply = () => this.props.route.params.onApply(this.state.active);
    onSortItemPress = filter => this.setState({active : {...this.state.active, sortActive: filter}});
    onActiveItemPress = (iID, iArray, iName) => {
        if(iID <= 0) return;
        let newItems = this.state.active[iName].slice();
        newItems.splice(iID, 1);
        this.setState({active:{... this.state.active, [iName]:newItems}});
    }
    /******
     * BRAND
     */
    onBrandApply = (iValue) => this.setState({active : {...this.state.active, brands: iValue}})
    onBrandPress = () => this.props.navigation.push('FilterBrand', {onApply:this.onFilterApply, onChange:this.onBrandApply, active:this.state.active.brands});

    /******
     * CATEGORY
     */
    onCategoryApply = (iValue) => this.setState({active : {...this.state.active, categories: iValue}})
    onCategoryPress = () => this.props.navigation.push('FilterCategory', {onApply:this.onFilterApply, onChange:this.onCategoryApply, active:this.state.active.categories});

    /******
     * COLOR
     */
    onColorApply = (iValue) => this.setState({active : {...this.state.active, colors: iValue}})
    onColorPress = () => this.setState({colorIsOpen : !this.state.colorIsOpen});

    render() {
        const {title, active, colorIsOpen} = this.state;
        const {sortActive, categories, brands, colors} = active;
        const {onClose,} = this.props.route.params;

            return(
            <View style={s.container}>
                <View style={s.header}>
                    <TouchableOpacity style={s.backBtn} onPress={onClose} hitSlop={{top: scale(10), bottom: scale(10), left: scale(10), right: scale(10)}}>
                        <IconClose width={scale(20)} height={scale(20)}/>
                    </TouchableOpacity>
                    <Text style={s.title}>{title}</Text>
                    <Text style={s.clearBtn} onPress={this.onClear} hitSlop={{top: scale(15), bottom: scale(15), left: 0, right: 0}}>Clear</Text>
                </View>
                <ScrollView contentContainerStyle={s.scrollCnt}>
                    <Text style={s.titleSection} key={'sort-by-title'}>Sort by</Text>
                    { sort.map( (data, index) => <SortItem filter={data.filter} title={data.title} isActive={sortActive === data.filter} onPress={this.onSortItemPress} key={`sort-item-${index}-key`}/> ) }
                    <Text style={s.titleSection} key={'filter-by-title'}>Filter By</Text>
                    <SectionItem title={'Category'} onPress={this.onCategoryPress} key={'category-section-key'}/>
                    { categories.map( (data, index) => <FilterListItem id={index} title={data.title} isActive style={s.activeItem} onPress={() => this.onActiveItemPress(index, categories,'categories')}  key={`categories-item-${index}-key`}/> ) }
                    <SectionItem title={'Brand'} onPress={this.onBrandPress} key={'brand-section-key'}/>
                    { brands.map( (data, index) => <FilterListItem id={index} title={data.title} isActive style={s.activeItem} onPress={() => this.onActiveItemPress(index, brands,'brands')} key={`brands-item-${index}-key`}/> ) }
                    <SectionItem title={'Color'} onPress={this.onColorPress} isOpen={colorIsOpen} key={'color-section-key'}/>
                    <FilterColor onChange={this.onColorApply} active={colors} mode={colorIsOpen ? FilterColor.MODE_FULL : FilterColor.MODE_SELECTED}/>
                </ScrollView>
                <TouchableOpacity style={s.applyBtn} onPress={this.onFilterApply}>
                    <Text style={s.titleApplyBtn}>Filter</Text>
                </TouchableOpacity>
            </View>
        )
    }
}

export default Filter;

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
        flex: 0.5,
    },
    backBtn: {
        width: scale(12),
        height: scale(30),
        justifyContent: "center",
        flex: 0.25,
    },
    clearBtn: {
        fontFamily: fontNames.regular,
        fontWeight: fontWeights.black,
        fontSize: fontSizes.cardTitle,
        textAlign: 'right',
        color: colors.designColor1,
        flex: 0.25,
    },
    emptyBox: {
        width: scale(12),
    },
    scrollCnt: {
        paddingHorizontal: indent,
        backgroundColor: colors.appBg,
        paddingBottom: indent,
    },
    titleSection: {
        fontFamily: fontNames.regular,
        fontWeight: fontWeights.black,
        fontSize: fontSizes.cardTitle,
        textAlign: 'left',
        marginTop: indent,
        marginBottom: halfIndent,
    },
    sortItemCnt:{
        width: '100%',
        flexDirection: "row",
        justifyContent: "space-between",
        paddingVertical: quadrantIndent,
        marginBottom: halfIndent,
    },
    sortItemTitle:{
        fontFamily: fontNames.regular,
        fontWeight: fontWeights.regular,
        fontSize: fontSizes.cardTitle,
        textAlign: 'left',
        color: colors.filterItemTitle,
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
    activeItem:{
        width: windowW-indent,
        borderRadius: scale(10),
        borderWidth: scale(1),
        backgroundColor: colors.lightGray,
        borderColor: colors.borderColor,
        marginHorizontal: - halfIndent,
        paddingHorizontal: halfIndent,
        marginBottom: halfIndent,
    },
});
