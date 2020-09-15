import React from 'react'
import { View, Text, StyleSheet, Button, TextInput, Image, TouchableOpacity, ImageBackground } from 'react-native'

export const Welcome = props => {
    return (
    <ImageBackground source={require('../assets/image/home.jpeg')} style={styles.image}>

<Image source={require('../assets/image/text-brand.png')} style={styles.brand} />
        <View style={styles.home}>
          <View style={styles.wrapBtn}>
          <TouchableOpacity style={styles.btnApple} onPress={() => { console.log('You tapped the Decrypt button!'); }} onPress={() => Alert.alert('Button with adjusted color pressed')}>
            <Text style={styles.textWhite}> Continue with Apple </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.btnFacebook} onPress={() => { console.log('You tapped the Decrypt button!'); }} onPress={() => Alert.alert('Button with adjusted color pressed')}>
            <Text style={styles.textWhite}> Continue with Facebook </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.btnSignUP} onPress={() => { console.log('You tapped the Decrypt button!'); }} onPress={() => Alert.alert('Button with adjusted color pressed')}>
            <Text style={styles.textBlack}> Sign Up </Text>
          </TouchableOpacity>
          </View>
          <Text style={styles.txt}>Already have an account? Log in</Text>
        </View>
        </ImageBackground>
    )
}

const styles = StyleSheet.create({
  home: {
    flex: 1,
    width: '100%'
  },
  btnApple: {
    backgroundColor: '#000',
    alignItems: 'center',
    width: 300,
    padding: 10,
    borderColor: "#000",
    borderWidth: 2,
    borderRadius: 5,
  },
  btnFacebook: {
    backgroundColor: '#3768B5',
    alignItems: 'center',
    width: 300,
    padding: 10,
    marginTop: 20,
    borderColor: "#3768B5",
    borderWidth: 2,
    borderRadius: 5,
  },
  btnSignUP: {
    backgroundColor: '#fff',
    alignItems: 'center',
    width: 300,
    padding: 10,
    marginTop: 20,
    borderColor: "#FFFFFF",
    borderWidth: 2,
    borderRadius: 5,
  },
  textWhite: {
    color: "#fff",
    fontSize: 20,
    textAlign: 'center',
    fontWeight: 'bold',
  }, 
  textBlack: {
    color: "#000",
    fontSize: 20,
    textAlign: 'center',
    fontWeight: 'bold'
  }, 
  wrapBtn: {
    marginTop: 320,
    textAlign: 'center',
    margin: 40,
    borderBottomColor: '#737373',
  },
 
  brand: {
    width: 300,
    height: 50,
    resizeMode: 'stretch',
    marginTop: 120,
    marginLeft: 50,
  },
  txt: {
    color: '#fff',
    fontSize: 17,
    textAlign: 'center',
    fontWeight: 'bold'
  },
  image: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
    width: 400,
  },
});
