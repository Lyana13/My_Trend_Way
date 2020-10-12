import React from 'react'
import { View, Text, StyleSheet, ScrollView, SafeAreaView, ImageBackground, TextInput, Button,Image, Alert, TouchableOpacity } from 'react-native'

import IconMenu from '../assets/icons/AccountMenu.svg';
import IconClose from '../assets/icons/X.svg';
import {colors, scale} from '../styles';

export const EditProfile = ({title}) => {
    return (
       
        <SafeAreaView >
        <ScrollView >
        <View>
            <View style={styles.container}>
            <View style={styles.nickname} >
                <IconClose width={20} height={30} />
                <Text style={{ fontWeight: 'bold',
         fontSize: 18}}>Edit Profile</Text>
                <IconMenu width={20} height={30} />
            </View>
            <View style={styles.info} >
                <Image style={styles.imgProfile} source={require('../assets/image/photo.jpg')} />
                <Text style={styles.textProfile}>Change photo</Text>
            <View>
            </View>
            </View>
            <View style={styles.infoWrap}>
                <Text style={styles.nicknameText}>Name</Text>
                <TextInput placeholder = "Rachel Jackson" style={styles.input} onChangeText={text => onChangeText(text)} />
            </View>
            <View style={styles.infoWrap}>
                <Text style={styles.nicknameText}>Username</Text>
                <TextInput placeholder = "Rachel.j97" style={styles.input} onChangeText={text => onChangeText(text)} />
            </View>
            <View style={styles.infoWrap}>
                <Text style={styles.nicknameText}>Bio</Text>
                <TextInput placeholder = "22 Hertforshire" style={styles.input} onChangeText={text => onChangeText(text)} />
            </View>
            <View style={styles.infoWrap}>
                <Text style={styles.nicknameText}>Link</Text>
                <TextInput placeholder = "Rachel Jackson" style={styles.input} onChangeText={text => onChangeText(text)} />
            </View>
            <View style={styles.infoWrap}>
                <Text style={styles.nicknameText}>Instagram</Text>
                <TextInput placeholder = "Rachel Jackson" style={styles.input} onChangeText={text => onChangeText(text)} />
            </View>
            </View>   
        </View>
        </ScrollView >
        </SafeAreaView >
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        margin: 30,
      },

      nickname: {
        flexDirection: "row",
        justifyContent: 'space-between',
        alignItems: 'center',
      
      },
      nicknameText: {
        fontWeight: 'bold',
         fontSize: 18,
         marginLeft: 18,
         marginBottom: 10,
      },
      info: {
        alignItems:'center',
        paddingLeft: 80,
        paddingRight: 80
      },
      textProfile: {
        fontSize: 17,
        color: "#26FBDA",
      },
      imgProfile: {
        margin: 10
      },
      infoWrap: {
          paddingTop: 10
      },
      input: {
        height: scale(55),
        borderColor: '#fff',
        borderWidth: 1,
        backgroundColor: '#F2F2F2',
        color: '#000',
        borderRadius: 12,
        width: scale(330),  
        padding: 20
    },

})
