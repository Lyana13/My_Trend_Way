import React from 'react'
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    TouchableWithoutFeedback,
    KeyboardAvoidingView, Platform, Keyboard,
} from 'react-native';
import connect from 'react-redux/lib/connect/connect';
import {
    onTextFieldFocusIn,
    onTextFieldFocusOut, validatePassword, validatePasswordConfirmation,
    WarningMessagePass, WarningMessagePassConf,
} from '../../../utils/helpers';
import IconBack from '../../../../assets/icons/arrowBackT.svg';
import {
    colors,
    doubleIndent,
    fontNames,
    halfIndent,
    indent,
    scale,
    startY, thirdIndent,
    tripleIndent,
} from '../../../styles';
import WarningButton from '../../../components/WarningButton';
import IconNext from '../../../../assets/icons/arrowNext.svg';
import IconEye from '../../../../assets/icons/eye.svg';
import IconEyeCrossed from '../../../../assets/icons/eye-crossed.svg';
import ModMap from '../../../modules/map';
import {regStep5} from '../../../modules/auth';

class Step5 extends React.Component<Props> {
    constructor(props) {
        super(props);
        this.state = {
            password: props.password,
            passwordConf: props.password_confirmation,
            wrongPass: false,
            wrongPassConf: false,
            hidePass: true,
        };

        console.log('>>>>> FIFTH sign up + ' + JSON.stringify(props))
    }

    onNextPress = () => {
        const {password, passwordConf} = this.state;
        const isPass = validatePassword(password);
        const isPassConf = validatePasswordConfirmation(passwordConf , password);

        if(isPass && isPassConf) {
            this.props.regStepRequest(password, passwordConf)
                .then(iResp => {
                    if(iResp.errors == null) {
                        this.props.navigation.navigate('Home');
                    }
                    console.log('>>>> FIFTH RESP : ' + JSON.stringify(iResp));
                });
        }else{
            this.setState({wrongPass:!isPass, wrongPassConf:!isPassConf});
        }
    }

    onChangePassword = text => this.setState({ password: text });
    onChangePasswordConf = text => this.setState({ passwordConf: text });
    showPass = () => this.setState({ hidePass: (!this.state.hidePass) });

    render() {
        const {password, passwordConf, hidePass, wrongPass, wrongPassConf} = this.state;

        return (
            <KeyboardAvoidingView behavior={Platform.OS == "ios" ? "padding" : "height"} style={styles.wrapper} >
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <View style={styles.container}>
                        <View>
                            <TouchableOpacity style={styles.goBackBtn} onPress={this.props.navigation.goBack}>
                                <IconBack width={scale(9)} height={scale(14)}/>
                                <Text style={styles.backBtnTxt}>Go back</Text>
                            </TouchableOpacity>
                            <View style={styles.titleWrap}>
                                <Text style={styles.titleNumber}>5</Text>
                                <Text style={styles.titleText}>Choose a{'\n'}password</Text>
                            </View>
                        </View>
                        <View>
                            <View style={styles.inputWrap}>
                                <TextInput underlineColorAndroid='transparent' style={[styles.input, wrongPass ? styles.wrong : null]} placeholderTextColor={colors.placeholderText} selectionColor={colors.designColor1}
                                           placeholder={'Password'} textContentType={'password'} autoCompleteType={'password'} secureTextEntry={hidePass} value={password}
                                           onChangeText={this.onChangePassword} onFocus={onTextFieldFocusIn} onBlur={onTextFieldFocusOut} autoFocus
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
                            <View style={styles.inputWrap}>
                                <TextInput underlineColorAndroid='transparent' style={[styles.input, wrongPassConf ? styles.wrong : null]} placeholderTextColor={colors.placeholderText}
                                           placeholder={'Confirm Password'} textContentType={'password'} autoCompleteType={'password'} secureTextEntry={hidePass} value={passwordConf}
                                           onChangeText={this.onChangePasswordConf} onFocus={this.onTextFieldFocusIn} onBlur={this.onTextFieldFocusOut}
                                           allowFontScaling={true} />
                                { wrongPassConf
                                    ? <WarningButton message={WarningMessagePassConf} style={styles.warning}/>
                                    : null
                                }
                            </View>
                        </View>

                        <TouchableOpacity style={styles.button} onPress={this.onNextPress}>
                            <Text style={styles.buttonText}>Complete Sign Up</Text>
                            <IconNext width={scale(12)} height={scale(19)}/>
                        </TouchableOpacity>
                    </View>
                </TouchableWithoutFeedback>
            </KeyboardAvoidingView>
        )
    }
}

const stateToProps = (state) => ({
    password: state[ModMap.Auth].userAuthData.password,
    password_confirmation: state[ModMap.Auth].userAuthData.password_confirmation,
});

const dispatchToProps = (dispatch) => ({
    regStepRequest: (iPass, iPassConf) => dispatch(regStep5(iPass, iPassConf)),
});

export default connect(stateToProps, dispatchToProps)(Step5);

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        backgroundColor: colors.appBg,
    },
    container: {
        flex: 1,
        flexDirection: "column",
        justifyContent: 'space-between',
        padding: indent+thirdIndent,
        paddingTop: startY + indent,
    },
    goBackBtn: {
        height: scale(40),
        alignSelf: 'flex-start',
        marginVertical:scale(-10),
        flexDirection: 'row',
        alignItems: 'center',
    },
    backBtnTxt: {
        fontFamily: fontNames.bold,
        fontWeight: "900",
        fontSize: scale(20),
        marginHorizontal: halfIndent,
    },
    titleWrap: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: doubleIndent,
        marginLeft: indent,
    },
    titleNumber: {
        color: colors.titleNumber,
        fontWeight: "bold",
        fontSize: scale(95),
        lineHeight: scale(95),
        paddingTop: scale(10),
        // marginRight: scale(-5),
    },
    titleText: {
        fontSize: scale(45),
        lineHeight: scale(35),
        paddingTop: scale(17),
        fontFamily: fontNames.bold,
        fontWeight: '900',
    },
    inputWrap:{
        marginBottom: indent,
    },
    input: {
        height: scale(55),
        borderColor: colors.inputBorder,
        borderWidth: 1,
        borderRadius: scale(12),
        backgroundColor: colors.inputBackground,
        color: colors.mainText,
        width: '100%',
        paddingHorizontal: indent,
        fontSize: scale(16),
        fontFamily: fontNames.bold,
        fontWeight: '700',
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
    button: {
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'center',
        backgroundColor: colors.designColor1,
        width: '100%',
        borderRadius: scale(12),
        height: scale(55),
    },
    buttonText: {
        color: colors.mainText,
        fontSize: scale(20),
        fontFamily: fontNames.bold,
        fontWeight: '900',
        textAlignVertical: 'center',
        marginRight: halfIndent,
    },
})
