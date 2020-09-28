import React from 'react'
import { View, Text, StyleSheet, ScrollView, SafeAreaView, ImageBackground, TextInput, Button,Image, Alert, TouchableOpacity } from 'react-native'

import IconMenu from '../assets/icons/AccountMenu.svg';
import IconClose from '../assets/icons/X.svg';
import IconNotification from '../assets/icons/Notification.svg';
import IconProfile from '../assets/icons/Profile.svg';
import IconShield from '../assets/icons/Shield.svg';

export const AccountSetting = ({title}) => {
    return (
        <View>
            <Text style={styles.title}>Settings</Text>
            <View style={styles.container}>
                <View style={styles.wrapElements} >      
                    <IconProfile width={20} height={30} />
                    <Text style={styles.txt}>Edit Profile</Text>
                    <IconMenu style={styles.elemEnd} width={20} height={30} />   
                </View>
                <View style={styles.wrapElements} >      
                    <IconShield width={20} height={30} />
                    <Text style={styles.txt}>Private Account</Text>
                    <IconMenu style={styles.elemEnd} width={20} height={30} />   
                </View>
                <View style={styles.wrapElements} >      
                    <IconClose width={20} height={30} />
                    <Text style={styles.txt}>Account</Text>
                    <IconMenu style={styles.elemEnd} width={20} height={30} />   
                </View>
                <View style={styles.wrapElements} >      
                    <IconNotification width={20} height={30} />
                    <Text style={styles.txt}>Notifications</Text>
                    <IconMenu style={styles.elemEnd} width={20} height={30} />   
                </View>
                <View style={styles.wrapElements} >      
                    <IconClose width={20} height={30} />
                    <Text style={styles.txt}>Privacy policy</Text>
                    <IconMenu style={styles.elemEnd} width={20} height={30} />   
                </View>
            </View>   
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        margin: 30,
      },
      title: {
        fontWeight: 'bold',
        fontSize: 20,
        marginLeft: 30
      },
      wrapElements: {
        flexDirection: "row",
        alignItems: 'center',
      },
      txt: {
        fontSize: 20, 
        marginLeft: 30,
        marginRight: 150,   
      },
      
      elemEnd: {
        position: 'absolute',
        marginLeft: 320
      }
})
