

import React from 'react'
import { View, Text, StyleSheet,ImageBackground, TextInput, Button,Image, Alert, TouchableOpacity } from 'react-native'
import IconCalendar from '../assets/icons/angle-left-solid.svg';
import {colors, scale} from '../styles';

export const ForgotPassword2 = ({title}) => {
    const [value, onChangeText] = React.useState('EMAIL');

    return (
        <View style={styles.container} >
          <View style={styles.flexAlign} >
            <TouchableOpacity  onPress={() => { console.log('You tapped the Decrypt button!'); }} onPress={() => Alert.alert('Button with adjusted color pressed')}>
              <Image style={styles.goBAck} source={require('../assets/icons/IconCalendar.png')} />
            </TouchableOpacity >
            <Text style={{fontWeight: "bold", fontSize: 17 }}>Go back</Text>
          </View> 
          <View style={styles.flexAlignNumber} >

            <Text style={styles.welcome}>Your email is{'\n'}on its way.</Text>
            <Text style={{width: 370, marginTop: 20}}>An email has just been sent to you with instruction on tow to reset your password.</Text>
          </View>

          <View style={{ flex: 1, justifyContent: 'flex-end', padding: 15}} >
          <Text style={{textAlign: "center", margin: 20}}>If you reset password please reset</Text>
            <TouchableOpacity style={styles.buttonNext} onPress={() => { console.log('You tapped the Decrypt button!'); }} onPress={() => Alert.alert('Button with adjusted color pressed')}>
              <Text style={styles.text}> Resend </Text>
              
            </TouchableOpacity>
          </View> 
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column"
      },
      flexAlign: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 30,
      },
      flexAlignNumber: {
        flex: 0, 
        flexDirection: 'column',
        alignItems: 'center',
        marginTop: 30,
        marginLeft: 30,
        marginBottom: 40
      },
      image: {
        flex: 1,
        resizeMode: "cover",
        justifyContent: "center"
      },
      text: {
        color: "grey",
        fontSize: 30,
        fontWeight: "bold"
      },
      goBAck: {
        width: scale(15),
        height: scale(15),
        paddingLeft: 0,
        marginLeft: 30
      },
    welcome: {
       fontSize: 40,
       fontWeight: 'bold',
       color: colors.black,
       marginRight: 120
    },
    text: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    forgotPass: {
        fontSize: 15,
        textDecorationLine: 'underline',
        margin: 25,
        marginHorizontal: 80
    },
  
      image: {
        flex: 1,
        resizeMode: "cover",
        justifyContent: "center"
      },

  buttonNext: {
      flex: 0,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: "#26FBDA",
        width: scale(380),
        padding: 15,
        borderRadius: 12,
      },
})