import React from 'react'
import { View, Text, StyleSheet, Dimensions,TextInput, Image, TouchableOpacity, ImageBackground } from 'react-native'
import Video from 'react-native-video';
import {colors, scale} from '../styles';

export const Welcome = props => {
    return (
    // <ImageBackground source={require('../assets/image/home.jpeg')} style={styles.image}>

    // <Image source={require('../assets/image/text-brand.png')} style={styles.brand} />
        <View>
          <Video
                // source={{uri:"http://trendway.naxlabel.mobi/welcome.mp4"}}
                source={require("../assets/welcome.mp4")}
                onLoad={function (obj) {
                  //alert(JSON.stringify(obj))
                }}
                onReadyForDisplay={function () {
                  //alert("ready for display")
                }}
                onProgress={function (obj) {
                  alert(JSON.stringify(obj))
                }}
                style={styles.backgroundVideo}
                muted={true}
                repeat={true}
                resizeMode={"cover"}
                rate={1.0}
                ignoreSilentSwitch={"obey"}
                pause={false}
              />
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
        // </ImageBackground>
    )
}

const { height } = Dimensions.get("window");

const styles = StyleSheet.create({
  backgroundVideo: {
    height: height,
    position: 'absolute',
    top: 0,
    left: 0,
    alignItems: 'stretch',
    bottom: 0,
    right: 0,
    zIndex: 3000000
    },
  image: {
    flex: 1,
    resizeMode: "cover",
    width: scale(500),
  },
  brand: {
    width: scale(300),
    height: scale(40),
    resizeMode: 'stretch',
    marginTop: 100,
    marginLeft: 100
  },
  wrapBtn: {
    marginTop: 200,
    flex: 0,
    alignItems: 'center'
  },
  btnApple: {
    backgroundColor: colors.black,
    alignItems: 'center',
    width: scale(300),
    padding: scale(10),
    borderColor: "#000",
    borderWidth: 2,
    borderRadius: 5,
  },
  btnFacebook: {
    backgroundColor: colors.darkBlue,
    alignItems: 'center',
    width: scale(300),
    padding: 10,
    marginTop: 20,
    borderColor: colors.darkBlue,
    borderWidth: 2,
    borderRadius: 5,
  },
  btnSignUP: {
    backgroundColor: '#fff',
    alignItems: 'center',
    width: scale(300),
    padding: 10,
    marginTop: 20,
    borderColor: colors.white,
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
    color: colors.black,
    fontSize: 20,
    textAlign: 'center',
    fontWeight: 'bold'
  }, 
  txt: {
    color: colors.white,
    fontSize: 17,
    textAlign: 'center',
    fontWeight: 'bold',
    marginTop: 20
  },
});