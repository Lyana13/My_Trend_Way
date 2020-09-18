import React from 'react'
import { View, Text, StyleSheet,ImageBackground, TextInput, Button,Image, Alert, TouchableOpacity } from 'react-native'
import IconCalendar from '../assets/icons/IconCalendar.png';

export const SignIn = ({title}) => {
    const [value, onChangeText] = React.useState('EMAIL');

    return (
       
        <View style={styles.container} >
            
            <TouchableOpacity  style={styles.tinyLogo} onPress={() => { console.log('You tapped the Decrypt button!'); }} onPress={() => Alert.alert('Button with adjusted color pressed')}>
                <Image source={require('../assets/icons/IconCalendar.png')} />
            </TouchableOpacity >
    
                <Text style={styles.welcome}>Welcome Back</Text>
                <TextInput placeholder = "     Email" style={styles.input} onChangeText={text => onChangeText(text)} />
                <TextInput placeholder = "     Password" style={styles.input} />
                
                <View style={{ padding: 15, textAlign: 'center' }} >
                    <TouchableOpacity style={styles.button} onPress={() => { console.log('You tapped the Decrypt button!'); }} onPress={() => Alert.alert('Button with adjusted color pressed')}>
                        <Text style={styles.text}> Sign In </Text>
                    </TouchableOpacity>
                    <Text style={styles.forgotPass}>Forgot password?</Text>
                </View> 
                
        </View>
  
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column"
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
    tinyLogo: {
        width: 50,
        height: 50,
      },
    welcome: {
       fontSize: 30,
       fontWeight: 'bold',
    },
    input: {
        height: 55,
        borderColor: '#fff',
        borderWidth: 1,
        backgroundColor: '#F2F2F2',
        color: '#000',
        margin: 15,
        borderRadius: 12,
        width: 330,
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

  button: {
        alignItems: 'center',
        backgroundColor: "#26FBDA",
        width: 330,
        padding: 15,
        borderColor: "#FFFFFF",
        borderWidth: 2,
        borderRadius: 12,
      },
})