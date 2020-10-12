import React from 'react'
import { View, Text, StyleSheet, ScrollView, SafeAreaView, ImageBackground, TextInput, Button,Image, Alert, TouchableOpacity } from 'react-native'

import IconMenu from '../assets/icons/AccountMenu.svg';
import IconBack from '../assets/icons/Back.svg';
import IconNotification from '../assets/icons/Notification.svg';
import IconProfile from '../assets/icons/Profile.svg';
import IconShield from '../assets/icons/Shield.svg';
import {colors, scale} from '../styles';

export const AccountDetails = ({title}) => {
    return (
        <View style={styles.container}>
            <View style={styles.wrapTitle}>
                <IconBack width={20} height={20} />
                <Text style={styles.title}>Account</Text>
            </View>
           
            <View style={styles.container}>
                <View style={styles.wrapElements}>
                    <Text style={styles.txt}>Email and Phone</Text>
                    <IconMenu style={styles.elemEnd} width={20} height={30} />   
                </View>
               
                  <TextInput placeholder = "     Rachel.j97@gmail.com" style={styles.input} onChangeText={text => onChangeText(text)} /> 
                  <TextInput placeholder = "     07573452266" style={styles.input} onChangeText={text => onChangeText(text)} />   
            
                <View style={styles.wrapElements} >
                    <Text style={styles.txt}>Change Password</Text>
                    <IconMenu style={styles.elemEnd} width={20} height={30} />   
                </View>
                <View style={styles.wrapElements} >
                    <Text style={styles.txt}>Language</Text>
                    <IconMenu style={styles.elemEnd} width={20} height={30} />   
                </View>
                <View style={styles.wrapElements} >
                    <Text style={styles.txt}>Help</Text>
                    <IconMenu style={styles.elemEnd} width={20} height={30} />   
                </View>
            </View>   
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        margin: 10,
      },
      title: {
        fontWeight: 'bold',
        fontSize: 18,
        marginLeft: 120,
      },
      wrapTitle: {
        flexDirection: "row",
        alignItems: 'center',
        marginTop: 30
      },
      wrapElements: {
        flexDirection: "row",
        alignItems: 'center',
        marginTop: 40,
      },
      txt: {
        fontSize: 18, 
        marginRight: 30,
        marginRight: 150,   
      },
      
      elemEnd: {
        position: 'absolute',
        marginLeft: 300
      },
      input: {
        height: scale(55),
        borderColor: '#fff',
        borderWidth: 1,
        backgroundColor: '#F2F2F2',
        color: '#000',
        borderRadius: 12,
        width: scale(330),
        marginTop: 15 
    },
    inputWrap: {
      margin: 10
    },
})
