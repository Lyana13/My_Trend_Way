

import React from 'react'
import { View, Text, StyleSheet,ImageBackground,Animated, TextInput, Button,Image, Alert, TouchableOpacity} from 'react-native'
import IconHeart from '../assets/icons/heart-regular.svg';
import IconInsta from '../assets/icons/insta.svg';
import IconFacebook from '../assets/icons/fb.svg';
import IconFAppStore from '../assets/icons/appStore.svg';
import IconTrendwayText from '../assets/icons/Trendway.svg';
import {colors, scale} from '../styles';

export const SendToEmail = ({title}) => {
    const [value, onChangeText] = React.useState('EMAIL');
    const position = new Animated.ValueXY({x:0,y:0})
    Animated.timing(position,{
      toValue:{x:200,y:500},
      duration:2000
    }).start()
    return (
        
         
              <View style={styles.container} >
                 <View style={{
            flex: 1,
          }}>
            <Animated.View style={{
              height: 80,
              width: 80,
              backgroundColor: "red",
              transform:[
                  {translateX:position.x},
                  {translateY:position.y}
              ]
            }}>
              </Animated.View>
       </View>
           <View style={styles.flexAlignNumber} >
             <IconTrendwayText width={300} height={60}/>
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
            <IconFacebook  width={15} height={60} />
            <IconInsta  width={40} height={60} />
            <IconHeart  width={30} height={60} />
            </View>
            <View style={{flex: 0, justifyContent: 'space-evenly', flexDirection: "row"}}>
            <IconFAppStore  width={150} height={100} />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column"
      },
     
      flexAlignNumber: {
        flex: 0, 
        flexDirection: 'column',
        alignItems: 'center',
        marginTop: 30,
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
        width: scale(15),
        height: scale(15),
        paddingLeft: 0,
        marginLeft: 30
      },
    title: {
       fontSize: 30,
       fontWeight: 'bold',
       color: colors.black,
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
      backgroundColor: colors.mainBlue,
        width: scale(370),
        padding: 15,
        borderRadius: 12,
        marginBottom: 40
      },
})