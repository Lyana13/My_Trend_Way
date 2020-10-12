import React from 'react'
import { View, Text, StyleSheet, ScrollView, SafeAreaView, ImageBackground, TextInput, Button,Image, Alert, TouchableOpacity } from 'react-native'

import IconMenu from '../assets/icons/AccountMenu.svg';
import IconBack from '../assets/icons/Back.svg';
import IconNotification from '../assets/icons/Notification.svg';
import IconProfile from '../assets/icons/Profile.svg';
import IconShield from '../assets/icons/Shield.svg';
import {colors, scale} from '../styles';

export const NewPassword = ({title}) => {
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
                <View style={styles.wrapElements} >
                    <Text style={styles.txt}>Change Password</Text>
                    <IconMenu style={styles.elemEnd} width={20} height={30} />   
                </View>
                <TextInput placeholder = "     Current" style={styles.input} onChangeText={text => onChangeText(text)} /> 
                  <TextInput placeholder = "     New Password" style={styles.input} onChangeText={text => onChangeText(text)} />   
                  <TextInput placeholder = "     Confirm New Password" style={styles.input} onChangeText={text => onChangeText(text)} />  
                  <TouchableOpacity style={styles.buttonNext} onPress={() => { console.log('You tapped the Decrypt button!'); }} onPress={() => Alert.alert('Button with adjusted color pressed')}>
              <Text style={styles.text}>Save</Text>
            </TouchableOpacity>

                <View style={styles.wrapElements} >
                    <Text style={styles.txt}>Language</Text>
                    <IconMenu style={styles.elemEnd} width={20} height={30} />   
                </View>
                <TextInput placeholder = "   English" style={styles.input} onChangeText={text => onChangeText(text)} />  
                  <TouchableOpacity style={styles.buttonNext} onPress={() => { console.log('You tapped the Decrypt button!'); }} onPress={() => Alert.alert('Button with adjusted color pressed')}>
              <Text style={styles.text}>Change</Text>
            </TouchableOpacity>

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
    text: {
        color: "#fff",
        fontSize: 18,
        fontWeight: "bold"
    },
    buttonNext: {
        marginTop: 20,
        flex: 0,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: "#000",
        width: scale(330),
        padding: 13,
        borderRadius: 12,
    },
})
