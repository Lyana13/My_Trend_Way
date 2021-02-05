import {Image, StyleSheet, TouchableOpacity, View, Text} from 'react-native';
import IconNewItem from '../../assets/icons/iconLookNewItem.svg';
import {colors, fontNames, fontSizes, fontWeights, hitSlop, scale} from '../styles';
import React, {memo} from 'react';

const ItemImg = ({id, data, style, onPress, onDelete, active, imageStyle}) => (
    <>
        <TouchableOpacity style={[s.lookImageCnt, style]} disabled={!onPress} onPress={() => onPress(id)}>
            {active === id && data.image?
                <TouchableOpacity style={s.lookImageDeleteBtn} hitSlop={hitSlop} onPress={() => onDelete(id)}>
                    <View style={s.lookImageDeleteIco}/>
                </TouchableOpacity>
                :null
            }
            {data.image
                ? <Image style={[s.lookImage, imageStyle, active === id ? s.lookImageActive : null]} source={{uri: data.image}} progressiveRenderingEnabled={true}/>
                : <View style={[s.lookImage, imageStyle, active === id ? s.lookImageActive : null]}><IconNewItem width={scale(33)} height={scale(33)}/></View>
            }
        </TouchableOpacity>
    </>
)

const single = ({value, active, onPress, onDelete, style, imageStyle}) => <ItemImg id={0} data={value[0]} style={[s.singleA, style]} imageStyle={imageStyle} active={active} onPress={onPress} onDelete={onDelete} />;

const double = ({value, active, onPress, onDelete, style, imageStyle}) => (
    <>
        <ItemImg id={0} data={value[0]} style={[s.doubleA, style]} imageStyle={imageStyle} active={active} onPress={onPress} onDelete={onDelete} />
        <ItemImg id={1} data={value[1]} style={[s.doubleB, style, value[1].image ? null : s.doubleB2]} imageStyle={imageStyle} active={active} onPress={onPress} onDelete={onDelete} />
    </>
);

const triple = ({value, active, onPress, onDelete, style, imageStyle}) => (
    <>
        <ItemImg id={0} data={value[0]} style={[s.doubleA, style]} imageStyle={imageStyle} active={active} onPress={onPress} onDelete={onDelete} />
        <View style={s.rightCnt}>
            <ItemImg id={1} data={value[1]} style={[s.tripleB, style]} imageStyle={imageStyle} active={active} onPress={onPress} onDelete={onDelete} />
            <ItemImg id={2} data={value[2]} style={[s.tripleB, style]} imageStyle={imageStyle} active={active} onPress={onPress} onDelete={onDelete} />
        </View>
    </>
);

const quadruple = ({value, active, onPress, onDelete, style, imageStyle}) => (
    <>
        <ItemImg id={0} data={value[0]} style={[s.doubleA, style]} imageStyle={imageStyle} active={active} onPress={onPress} onDelete={onDelete} />
        <View style={s.rightCnt}>
            <ItemImg id={1} data={value[1]} style={[s.quadrupleB, style]} imageStyle={imageStyle} active={active} onPress={onPress} onDelete={onDelete} />
            <ItemImg id={2} data={value[2]} style={[s.quadrupleB, style]} imageStyle={imageStyle} active={active} onPress={onPress} onDelete={onDelete} />
            <ItemImg id={3} data={value[3]} style={[s.quadrupleB, style]} imageStyle={imageStyle} active={active} onPress={onPress} onDelete={onDelete} />
        </View>
    </>
);

const fivefold = ({value, active, onPress, onDelete, style, imageStyle}) => (
    <>
        <View style={s.fivefoldCntA}>
            <ItemImg id={0} data={value[0]} style={[s.fivefoldA, style]} imageStyle={imageStyle} active={active} onPress={onPress} onDelete={onDelete} />
            <ItemImg id={4} data={value[4]} style={[s.fivefoldB, style]} imageStyle={imageStyle} active={active} onPress={onPress} onDelete={onDelete} />
        </View>
        <View style={s.rightCnt}>
            <ItemImg id={1} data={value[1]} style={[s.quadrupleB, style]} imageStyle={imageStyle} active={active} onPress={onPress} onDelete={onDelete} />
            <ItemImg id={2} data={value[2]} style={[s.quadrupleB, style]} imageStyle={imageStyle} active={active} onPress={onPress} onDelete={onDelete} />
            <ItemImg id={3} data={value[3]} style={[s.quadrupleB, style]} imageStyle={imageStyle} active={active} onPress={onPress} onDelete={onDelete} />
        </View>
    </>
);

const sixfold = ({value, active, onPress, onDelete, style, imageStyle}) => (
    <>
        <View style={s.fivefoldCntA}>
            <ItemImg id={0} data={value[0]} style={[s.fivefoldA, style]} imageStyle={imageStyle} active={active} onPress={onPress} onDelete={onDelete} />
            <View style={s.sixfoldCntB}>
                <ItemImg id={5} data={value[5]} style={[s.sixfoldB, style]} imageStyle={imageStyle} active={active} onPress={onPress} onDelete={onDelete} />
                <ItemImg id={4} data={value[4]} style={[s.sixfoldB, style]} imageStyle={imageStyle} active={active} onPress={onPress} onDelete={onDelete} />
            </View>
        </View>
        <View style={s.rightCnt}>
            <ItemImg id={1} data={value[1]} style={[s.quadrupleB, style]} imageStyle={imageStyle} active={active} onPress={onPress} onDelete={onDelete} />
            <ItemImg id={2} data={value[2]} style={[s.quadrupleB, style]} imageStyle={imageStyle} active={active} onPress={onPress} onDelete={onDelete} />
            <ItemImg id={3} data={value[3]} style={[s.quadrupleB, style]} imageStyle={imageStyle} active={active} onPress={onPress} onDelete={onDelete} />
        </View>
    </>
);

const SwitchCase = (props) => {
    switch(props.value.length) {
        case 1:
            return single(props);
        case 2:
            return double(props);
        case 3:
            return triple(props);
        case 4:
            return quadruple(props);
        case 5:
            return fivefold(props);
        default:
            return sixfold(props);
    }
}
// {value, active, onPress, onDelete, style}
export default memo(SwitchCase);

const s = StyleSheet.create({
    lookImageCnt: {
        padding: scale(5),
        // overflow: 'hidden',
        width: '100%',
        height: '100%',
    },

    lookImage:{
        width: '100%',
        height: '100%',
        borderRadius: scale(12),
        backgroundColor: colors.createLookArea,
        justifyContent: 'center',
        alignItems: 'center',
    },

    lookImageActive: {
        borderWidth: scale(2),
        borderColor: colors.designColor1,
    },

    lookImageDeleteBtn: {
        width: scale(23),
        height: scale(23),
        borderRadius: scale(12),
        backgroundColor: colors.designColor1,
        position: 'absolute',
        zIndex: 1,
        right: scale(-2),
        top: scale(-2),
        alignItems: 'center',
        justifyContent: 'center',
    },

    lookImageDeleteIco: {
        backgroundColor: colors.blackTitles,
        width: scale(12),
        height: scale(2),
    },

    rightCnt: {
        width: '40%',
        height: '100%',
    },

    singleA: {
        width: '100%',
        height: '100%',
    },

    doubleA: {
        width: '60%',
    },
    doubleB: {
        width: '40%',
    },

    doubleB2: {
        height: '80%',
        marginTop: '10%'
    },

    tripleB: {
        height: '50%',
    },

    quadrupleB: {
        height: '33.3333333%',
    },

    fivefoldCntA: {
        width: '60%',
        height: '100%',
    },
    fivefoldA: {
        height: '66.6666666%',
    },
    fivefoldB: {
        height: '33.3333333%',
    },

    sixfoldCntB: {
        width: '100%',
        height: '33.3333333%',
        flexDirection: 'row',
    },
    sixfoldB: {
        width: '50%',
    },
});
