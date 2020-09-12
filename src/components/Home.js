import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

export const Home = props => {
    return (
        <View style={StyleSheet.home}>
            <Text style={StyleSheet.text}>{props.title}</Text>
            
        </View>
    )
}

const styles = StyleSheet.create({
    home: {},
    text: {}
})