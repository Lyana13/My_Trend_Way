import React from 'react'
import { View, Text, StyleSheet, Dimensions, Button, TextInput, Image, TouchableOpacity, ImageBackground } from 'react-native'
import {barH, colors, doubleIndent, fontNames, fontSizes, halfIndent, indent, scale} from '../../../styles';
import Video from 'react-native-video';
import  {
 windowH, windowW,
} from '../../../styles';
import fontWeights from '../../../styles/fontWeights';

export default class Welcome extends React.Component<Props> {
  constructor(props) {
    super(props);
    this.state = {};
  }

  goToSingUp = () => {
    this.props.navigation.navigate('SignUp');
  };

  goToSingIn = () => {
    this.props.navigation.navigate('SignIn');
  };

  render() {
    return (
      <View>
      <Video
            source={{uri:"https://trendway.naxlabel.mobi/welcome.mp4"}}
            style={styles.backgroundVideo}
            muted={true}
            repeat={true}
            resizeMode={"cover"}
            rate={1.0}
            ignoreSilentSwitch={"obey"}
            pause={false}
          />
           <Image source={require('../../../../assets/image/text-brand.png')} style={styles.brand}/>
            <View style={styles.wrapBtn}>
              <TouchableOpacity style={styles.btnApple} onPress={this.props.loginAP}>
                <Text style={styles.textWhite}> Continue with Apple </Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.btnFacebook} onPress={this.props.loginFB}>
                <Text style={styles.textWhite}> Continue with Facebook </Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.btnSignUP} onPress={this.goToSingUp}>
                <Text style={styles.textBlack}> Sign Up </Text>
              </TouchableOpacity>

              
            </View>
          <Text style={styles.txt}>Already have an account? <Text style={styles.loginTextLink} onPress={this.goToSingIn}>Log in</Text></Text>
    </View>
    )
  }
}

const { height } = Dimensions.get("window");

const styles = StyleSheet.create({
  
  image: {
    flex: 1,
    resizeMode: "cover",
    width: '100%',
    alignItems: 'center',
  },
  brand: {
    width: scale(330),
    height: scale(36),
    resizeMode: 'stretch',
    marginTop: scale(163),
    marginLeft: scale(40)
  },
  wrapBtn: {
    marginTop: scale(200),
    paddingHorizontal: doubleIndent,
    width: '100%',
    alignItems: 'center'
  },
  btnApple: {
    backgroundColor: '#000',
    alignItems: 'center',
    width: '100%',
    padding: halfIndent,
    borderColor: "#000",
    borderWidth: scale(2),
    borderRadius: scale(5),
  },
  btnFacebook: {
    backgroundColor: '#3768B5',
    alignItems: 'center',
    width: '100%',
    padding: halfIndent,
    marginTop: indent,
    borderColor: "#3768B5",
    borderWidth: scale(2),
    borderRadius: scale(5),
  },
  btnSignUP: {
    backgroundColor: colors.appBg,
    alignItems: 'center',
    width: '100%',
    padding: halfIndent,
    marginTop: indent,
    borderColor: colors.whiteText,
    borderWidth: scale(2),
    borderRadius: scale(5),
  },
  textWhite: {
    color: colors.whiteText,
    fontSize: fontSizes.regular,
    fontFamily: fontNames.regular,
    fontWeight: fontWeights.black,
    textAlign: 'center',
  },
  textBlack: {
    color: colors.mainText,
    fontSize: fontSizes.regular,
    fontFamily: fontNames.regular,
    fontWeight: fontWeights.black,
    textAlign: 'center',
  },
  txt: {
    color: colors.whiteText,
    fontSize: fontSizes.regular,
    fontFamily: fontNames.bold,
    fontWeight: fontWeights.black,
    lineHeight: scale(40),
    textAlign: 'center',
    marginTop: indent,
  },
  loginTextLink: {
    textDecorationLine: 'underline',
    textDecorationColor: colors.whiteText,
    textDecorationStyle: 'solid',
  },
  backgroundVideo: {
    height: windowH + barH,
    width: windowW,
    position: 'absolute',
  },
});
