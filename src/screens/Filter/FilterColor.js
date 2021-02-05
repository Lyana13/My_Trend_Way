import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native'
import {colors, halfIndent, indent, scale} from '../../styles';

const colorsList = [
    {id:3, title:'Black', color:'#000000'},
    {id:48, title:'Dark Blue', color:'#002474'},
    {id:21, title:'Dark Purple', color:'#56009A'},
    {id:4, title:'Brown', color:'#7C4C00'},
    {id:14, title:'Green', color:'#097100'},

    {id:15, title:'Grey', color:'#707070'},
    {id:13, title:'Blue', color:'#2147E6'},
    {id:12, title:'Purple', color:'#B455FF'},
    {id:8, title:'Gold', color:'#FFB100'},
    {id:7, title:'Red', color:'#FF0000'},

    {id:11, title:'White', color:'#ffffff'},
    {id:64, title:'Light Blue', color:'#00B1FF'},
    {id:9, title:'Pink', color:'#FF60E6'},
    {id:44, title:'Nude', color:'#FFDBBC'},
    {id:43, title:'Yellow', color:'#FFF845'},
];

const ColorItem = ({item, isActive, onPress}) => (
    <TouchableOpacity style={[s.item, {backgroundColor:item.color, borderWidth:item.color==='#ffffff' ? scale(1) : 0}, isActive ? s.itemActive : null]} onPress={onPress} />
);

class FilterColor extends React.Component<Props> {
    static get MODE_FULL() { return 'mode_full'; }
    static get MODE_SELECTED() { return 'mode_selected'; }

    constructor(props) {
        super(props);
        console.log('>>>> COLORS : ' + props.mode);
        this.state = {
            active: props.active,
            mode: props.mode ? props.mode : FilterColor.MODE_FULL,
        };
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if(prevState.active !== this.state.active) {
            this.props.onChange(this.state.active);
        }

        if(prevProps.mode !== this.props.mode){
            this.setState({mode:this.props.mode});
        }

        if(prevProps.active.length !== this.props.active.length){
            this.setState({active:this.props.active});
        }
    }

    isActive = iID => this.state.active.findIndex(item => item.id === iID) !== -1;

    onItemPress = ({id, color}) => {
        const containID = this.state.active.findIndex(item => item.id === id);

        let newItems = this.state.active.slice();
        if(containID === -1){
            newItems.push({id:id, color:color});
        }else{
            newItems.splice(containID, 1);
        }

        this.setState({active:newItems});
    }

    render() {
        const {mode, active} = this.state;
        return (
            <View style={s.container}>
                {
                    mode === FilterColor.MODE_FULL
                    ? colorsList.map((item, index) => <ColorItem item={item} onPress={() => this.onItemPress(item)} isActive={this.isActive(item.id)}  key={`color-list-item-${index}-key`}/>)
                    : active.map((item, index) => <ColorItem item={item} onPress={() => this.onItemPress(item)} key={`color-active-item-${index}-key`}/>)
                }
            </View>
        )
    }
}

export default FilterColor;

const s = StyleSheet.create({
    container: {
        flexDirection: "row",
        flexWrap: 'wrap',
        justifyContent: "space-between",
        width: '100%',
        backgroundColor: colors.lightGray,
        borderRadius: scale(8),
    },
    item: {
        backgroundColor: colors.subMenuInactive,
        width: scale(52),
        height: scale(52),
        margin: halfIndent,
        borderRadius: scale(10),
    },
    itemActive:{
        borderWidth: scale(4),
        borderColor: colors.designColor1
    },
})
