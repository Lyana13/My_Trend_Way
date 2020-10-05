

import React from 'react'
import { View, Text, StyleSheet,ImageBackground, TextInput, Button,Image, Alert, TouchableOpacity } from 'react-native'
import IconHeart from '../assets/icons/heart-regular.svg';

export const SentToEmail = ({title}) => {
    const [value, onChangeText] = React.useState('EMAIL');

    return (
        <View style={styles.container} >
           <View style={styles.flexAlignNumber} >
          <Image source={require('../assets/image/text-brand.png')} style={styles.brand} />
            <Text style={styles.title}>WE'VE GOT YOU!</Text>
            <Text style={{width: 320, marginTop: 20}}>You recently ewquested a password feset for you Trendway account.Just click the link to reset it.</Text>
          </View>
          <View >
            <TouchableOpacity style={styles.buttonNext} onPress={() => { console.log('You tapped the Decrypt button!'); }} onPress={() => Alert.alert('Button with adjusted color pressed')}>
              <Text style={styles.text}> RESET PASSWORD </Text>
              
            </TouchableOpacity>
   
          </View > 
            <Text style={{textAlign: 'center', marginBottom: 80}}>Thank's {'\n'}TRENDWAY team</Text>
            <View style={{flex: 0, justifyContent: 'space-evenly', flexDirection: "row"}}>
            <IconHeart  width={30} height={60} />
            <IconHeart  width={30} height={60} />
            <IconHeart  width={30} height={60} />
            </View>
            <View style={{flex: 0, justifyContent: 'space-evenly', flexDirection: "row"}}>
            <IconHeart  width={30} height={60} />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column",
        backgroundColor: "#777"
      },
      brand: {
        width: 320,
        height: 35,
        marginTop: 30,
        marginLeft: 10
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
        fontSize: 10,
        fontWeight: "bold",
      },
      goBAck: {
        width: 15,
        height: 15,
        paddingLeft: 0,
        marginLeft: 30
      },
    title: {
       fontSize: 30,
       fontWeight: 'bold',
       color: "#000",
      marginTop: 50
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
      backgroundColor: "#26FBDA",
        width: 380,
        padding: 15,
        borderRadius: 12,
        marginLeft: 25,
        marginBottom: 40
      },
})