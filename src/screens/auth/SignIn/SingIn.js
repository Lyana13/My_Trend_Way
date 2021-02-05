import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Platform,
  TouchableWithoutFeedback, Keyboard, KeyboardAvoidingView,
} from 'react-native';
import IconBack from '../../../../assets/icons/arrowBack.svg';
import {
  colors,
  scale,
  indent,
  doubleIndent,
  startY,
  fontNames,
  fontWeights,
} from '../../../styles';
import IconEye from '../../../../assets/icons/eye.svg';
import IconEyeCrossed from '../../../../assets/icons/eye-crossed.svg';
import {
  onTextFieldFocusIn, onTextFieldFocusOut,
  validateEmail,
  validatePassword,
  WarningMessageEmail,
  WarningMessagePass,
} from '../../../utils/helpers';
import WarningButton from '../../../components/WarningButton';
import ButtonUniversal from '../../../components/ButtonUniversal'

export default class SingIn extends React.Component<Props> {
  state = {
    email: '',
    password: '',
    error: null,
    hidePass: true,
    wrongEmail: false,
    wrongPass: false,
  };

  handleLogin = () => {
    const {email, password} = this.state;
    const isEmail = validateEmail(email);
    const isPass = validatePassword(password);
    if(isEmail && isPass){
      this.props.login(email, password)
          .then(iResp => {
            console.log('>>>> FIRST RESP : ' + JSON.stringify(iResp));
          });
    }else{
      this.setState({wrongEmail:!isEmail, wrongPass:!isPass});
    }
  };

  onChangeEmail = text => this.setState({ email: text });
  onChangePassword = text => this.setState({ password: text });
  showPass = () => this.setState({ hidePass: (!this.state.hidePass) });

  goToForgot = () => {
    // console.log('>>>>>> GO TO FORGOT <<<<<< ')
    this.props.navigation.navigate('Forgot');
  };

  render() {
    const {email, password, error, hidePass, wrongEmail, wrongPass} = this.state;
    return (
        <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={styles.wrapper} >
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={styles.container}>
              <View>
                <TouchableOpacity style={styles.goBackBtn} onPress={this.props.navigation.goBack}>
                  <IconBack width={scale(12)} height={scale(19)}/>
                </TouchableOpacity >

                <Text style={styles.mainTitle}>Welcome{'\n'}Back</Text>
              </View>
              <View>
                <View style={styles.inputWrap}>
                  <TextInput underlineColorAndroid='transparent' style={[styles.input, wrongEmail ? styles.wrong : null]} placeholderTextColor={colors.placeholderText} selectionColor={colors.designColor1}
                             placeholder={'Email'} textContentType={'emailAddress'} autoCompleteType={'email'} keyboardType={'email-address'}
                             onChangeText={this.onChangeEmail} onFocus={onTextFieldFocusIn} onBlur={onTextFieldFocusOut} autoFocus/>
                  { wrongEmail
                      ? <WarningButton message={WarningMessageEmail} style={styles.warning}/>
                      : null
                  }
                </View>

                <View style={styles.inputWrap}>
                  <TextInput underlineColorAndroid='transparent' style={[styles.input, wrongPass ? styles.wrong : null]} placeholderTextColor={colors.placeholderText} selectionColor={colors.designColor1}
                             placeholder={'Password'} textContentType={'password'} autoCompleteType={'password'} secureTextEntry={hidePass}
                             onChangeText={this.onChangePassword} onFocus={onTextFieldFocusIn} onBlur={onTextFieldFocusOut}
                             allowFontScaling={true} />
                  {wrongPass
                      ? <WarningButton message={WarningMessagePass} style={styles.warning}/>
                      : null
                  }
                  <TouchableOpacity activeOpacity={0.8} style={[styles.inputIco, wrongPass ? styles.inputIcoWithWrong : null]} onPress={this.showPass}>
                    {hidePass
                        ? <IconEye width={scale(16)} height={scale(16)} fill={colors.placeholderText}/>
                        : <IconEyeCrossed width={scale(24)} height={scale(24)} style={{marginBottom: 1}} fill={colors.placeholderText}/>
                    }
                  </TouchableOpacity>
                </View>


                {/* <TouchableOpacity style={styles.button} onPress={this.handleLogin}>
                  <Text style={styles.buttonText}> Sign In </Text>
                </TouchableOpacity> */}
            <View style={styles.c}>
                <ButtonUniversal title={'Sign In'} onPress={this.handleLogin} style={styles.button} styleText={styles.buttonText}/>
                </View>
              </View>

              <View>
                <Text style={styles.forgotPass} onPress={this.goToForgot}>Forgot password?</Text>
              </View>
            </View>
          </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    )
  }
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: colors.appBg,
  },
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: 'space-between',
    padding: doubleIndent,
    paddingTop: startY + indent,
  },
  goBackBtn: {
    width: scale(40),
    height: scale(40),
    marginHorizontal:scale(-14),
    marginVertical:scale(-10),
    alignItems: 'center',
    justifyContent: 'center',
  },
  mainTitle: {
    fontFamily: fontNames.bold,
    fontWeight: "900",
    fontSize: scale(45),
    lineHeight: scale(35),
    paddingTop: scale(17),
    marginTop: doubleIndent,
    marginLeft: doubleIndent,
  },
  inputWrap:{
    marginBottom: indent,
  },
  input: {
    fontFamily: fontNames.bold,
    fontWeight: fontWeights.black,
    height: scale(55),
    borderColor: colors.inputBorder,
    borderWidth: 1,
    backgroundColor: colors.inputBackground,
    color: colors.mainText,
    borderRadius: scale(12),
    width: '100%',
    paddingHorizontal: indent,
    fontSize: scale(16),
  },
  wrong: {
    borderWidth: 1,
    borderColor: colors.warning,
  },
  warning: {
    position: 'absolute',
    right: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputIco: {
    width: scale(55),
    height: scale(55),
    position: 'absolute',
    right: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputIcoWithWrong: {
    right: scale(30),
  },
  c: {
    borderRadius: scale(22),
  },
  button: {
    // backgroundColor: colors.grayText,
    width: '100%',
    borderRadius: scale(12),
    height: scale(55),
    overflow: 'hidden'
  },
  buttonText: {
    color: colors.mainText,
    fontSize: scale(22),
    fontFamily: fontNames.bold,
    fontWeight: "900",

   textAlign: 'center'
  },
  forgotPass: {
    fontFamily: fontNames.regular,
    fontSize: scale(18),
    textDecorationLine: 'underline',
    width: '100%',
    textAlign: 'center',
    textAlignVertical: 'center',
  },
});
