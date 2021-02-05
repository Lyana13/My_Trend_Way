import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {colors, fontNames, halfIndent, indent, scale, startY} from '../../styles';
import React from 'react';
import {ITEM_VIEW_SIZE} from '../../components/ItemProduct';

const EmptyScreen = (props) => {
    return (
        <View style={s.container}>
            <Text style={s.title}>Coming soon</Text>
        </View>
    );
};

export default EmptyScreen;

const s = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column",
        backgroundColor: colors.appBg,
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        fontFamily: fontNames.bold,
        fontWeight: "700",
        fontSize: scale(18),
        // padding: scale(10),
        textAlign: 'center'
    },
});
