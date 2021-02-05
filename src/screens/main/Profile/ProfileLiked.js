import React from 'react'
import { View, Text, StyleSheet, ScrollView, SafeAreaView, ImageBackground, TextInput, Button,Image, Alert, TouchableOpacity } from 'react-native'

import IconMenu from '../../../../assets/icons/AccountMenu.svg';
import IconLine from '../../../../assets/oldIcons/Line.svg';
import IconOutfits from '../../../../assets/icons/Outfits.svg';
import IconCreate from '../../../../assets/icons/Create.svg';
import IconHeart from '../../../../assets/oldIcons/heart-regular.svg';

import IconHome from '../../../../assets/icons/Home.svg';
import IconSearch from '../../../../assets/icons/Search.svg';
import IconNotification from '../../../../assets/icons/Notification.svg';
import IconProfile from '../../../../assets/icons/Profile.svg';
import {colors, indent, scale} from '../../../styles';

export const ProfileLiked = ({title}) => {
    return (
        <ScrollView style={styles.container}>
            <View style={styles.nickname} >
                <View></View>
                <Text style={styles.nicknameText}>Rachel.j97</Text>
                <IconMenu width={20} height={30} />
            </View>
            <View style={styles.info} >
                <Image style={styles.goBAck} source={require('../../../../assets/image/photo.jpg')} />
                <IconLine  width={50} height={60} />
            <View >
                <Text style={styles.textProfile}>22 Outfits</Text>
                <Text style={styles.textProfile}>333 Followers</Text>
                <Text style={styles.textProfile}>222 Following</Text>
            </View>
            </View>
            <View style={styles.infoWrap}>
                <Text style={styles.nicknameText}>Rachel Jackson</Text>
                <Text>22</Text>
                <Text>London</Text>
                <Text>Wishing it was always summer xx</Text>
            </View>
            <View style={styles.categories}>
                <IconOutfits  width={scale(44)} height={scale(23)} />
                <IconHeart  width={scale(44)} height={scale(25)} />
                <IconCreate  width={scale(44)} height={scale(22)} />
            </View>
            <View>
                <View style={styles.example}>
                    <Image style={styles.exampleImg} source={require('../../../../assets/image/example.jpeg')} />
                    <Image style={styles.exampleImg} source={require('../../../../assets/image/example.jpeg')} />
                </View>
                <View style={styles.example}>
                    <Image style={styles.exampleImg} source={require('../../../../assets/image/example.jpeg')} />
                    <Image style={styles.exampleImg} source={require('../../../../assets/image/example.jpeg')} />
                </View>
                <View style={styles.example}>
                    <Image style={styles.exampleImg} source={require('../../../../assets/image/example.jpeg')} />
                    <Image style={styles.exampleImg} source={require('../../../../assets/image/example.jpeg')} />
                </View>
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    ontainer: {
        flex: 1,
        flexDirection: "column",
        backgroundColor: colors.appBg,
        padding: indent
    },

      nickname: {
        flexDirection: "row",
        justifyContent: 'space-between',
        alignItems: 'center',

      },
      nicknameText: {
        fontWeight: 'bold',
         fontSize: 18,
         marginTop:15,
         marginBottom: 20
      },
      info: {
        flexDirection: 'row',
        alignItems:'center',
        justifyContent: 'space-evenly',
        paddingLeft: 80,
        paddingRight: 80
      },
      textProfile: {
        fontSize: 17,
      },
      infoWrap: {
          paddingBottom: 15,
          paddingTop: 10
      },
      categories: {
          flexDirection: 'row',
          justifyContent: 'space-evenly',
          alignItems:'center',
      },

      example: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems:'center',
    },
    exampleImg: {
        maxWidth: scale(200),
        maxHeight: scale(200),
        margin: 7
    },
    bottomBar: {
        justifyContent: 'space-around',
        flexDirection:'row',
        alignItems: 'center',
        padding: 15,
        backgroundColor: colors.white,
    }
})
