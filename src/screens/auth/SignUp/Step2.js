import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity,
    Platform, TouchableWithoutFeedback, Keyboard, KeyboardAvoidingView,
} from 'react-native';
import IconDown from '../../../../assets/icons/arrowDown.svg';
import connect from 'react-redux/lib/connect/connect';
import { WarningMessagePhoneNumber } from '../../../utils/helpers';
import IconBack from '../../../../assets/icons/arrowBackT.svg';
import {
    colors,
    doubleIndent,
    fontNames,
    halfIndent,
    indent,
    scale,
    startY,
    thirdIndent,
    tripleIndent,
} from '../../../styles';
import WarningButton from '../../../components/WarningButton';
import IconNext from '../../../../assets/icons/arrowNext.svg';
import PhoneInput from 'react-native-phone-number-input';
import OtpInputs from 'react-native-otp-inputs';
import ModMap from '../../../modules/map';
import {regStep2_1, regStep2_2} from '../../../modules/auth';

class Step2 extends React.Component<Props> {
    constructor(props) {
        super(props);

        this.state = {
            phone: props.phoneNum,
            formattedPhone: '+'+props.phone,
            countryCode: props.countryCode,
            code: props.code.toString(),
            wrongPhone: false,
            wrongOtp: false,
            onVerification: false,
        };

        console.log('>>>>> SECOND sign up + ' + JSON.stringify(props))
    }

    onChangePhone = text => this.setState({ phone: text });
    onChangeFormattedPhone = text => this.setState({ formattedPhone: text });
    onChangeOtp = text => this.setState({ code: text });

    onNextPress = () => {
        const {formattedPhone, code} = this.state;
        const isOtp = code.length>=6;

        if(isOtp) {
            this.props.regStep2Request(formattedPhone.replace('+',''), Number(code))
                .then(iResp => {
                    console.log('>>>> SECOND 2 RESP : ' + JSON.stringify(iResp));
                    if(iResp.errors == null) {
                        this.props.navigation.navigate('Step3');
                    }
                });
        }else{
            this.setState({wrongOtp:!isOtp});
        }
    }

    sendToVerification = () => {
        const {phone, formattedPhone} = this.state;
        const isPhone = this.phoneInput.isValidNumber(phone);
        const countryCode = this.phoneInput.getCountryCode();

        if(isPhone) {
            this.props.regStep1Request(formattedPhone.replace('+',''), phone, countryCode)
                .then(iResp => {
                    console.log('>>>> SECOND 1 RESP : ' + JSON.stringify(iResp));
                    if(iResp.errors == null) {
                        this.setState({onVerification:true, countryCode:countryCode});
                    }
                });
        }else{
            this.setState({wrongPhone:!isPhone});
        }
    }

    onBackPress = () => {
        if(this.state.onVerification){
            this.setState({onVerification:false});
        }else {
            this.props.navigation.goBack();
        }
    }

    render() {
        const {wrongPhone, wrongOtp, phone, code, formattedPhone, countryCode, onVerification} = this.state;
        return (
            <KeyboardAvoidingView behavior={Platform.OS == "ios" ? "padding" : "height"} style={styles.wrapper} >
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <View style={styles.container}>
                        <View>
                            <TouchableOpacity style={styles.goBackBtn} onPress={this.onBackPress}>
                                <IconBack width={scale(9)} height={scale(14)}/>
                                <Text style={styles.backBtnTxt}>Go back</Text>
                            </TouchableOpacity>
                            <View style={styles.titleWrap}>
                                <Text style={styles.titleNumber}>2</Text>
                                <Text style={styles.titleText}>Mobile{'\n'}number</Text>
                            </View>
                        </View>
                        <View>
                            {onVerification
                                ?   <View>
                                    <Text style={styles.otpTitleText}>Please type the verification code sent to{'\n'}{formattedPhone}</Text>
                                        <OtpInputs
                                            defaultValue={code}
                                            style={styles.otpWrap}
                                            inputStyles={[styles.otpInput, wrongOtp ? styles.wrong : null]}
                                            inputContainerStyles={styles.otpInputContainer}
                                            ref={c => this.otp = c}
                                            handleChange={this.onChangeOtp}
                                            numberOfInputs={6}
                                        />
                                    </View>
                                :   <View>
                                        <PhoneInput
                                            ref={c => this.phoneInput = c}
                                            defaultValue={phone}
                                            defaultCode={countryCode}
                                            onChangeText={this.onChangePhone}
                                            onChangeFormattedText={this.onChangeFormattedPhone}
                                            containerStyle={[styles.phoneCnt, wrongPhone ? styles.wrong : null]}
                                            textContainerStyle={styles.phoneTextCnt}
                                            textInputStyle={styles.phoneText}
                                            codeTextStyle={styles.phoneCodeText}
                                            flagButtonStyle={styles.phoneFlag}
                                            autoFocus
                                            renderDropdownImage={<IconDown width={scale(19)} height={scale(12)}/>}
                                        />
                                        { wrongPhone
                                            ? <WarningButton message={WarningMessagePhoneNumber} style={styles.warning}/>
                                            : null
                                        }
                                    </View>
                            }
                            <View style={styles.dummy}/>
                        </View>

                        <TouchableOpacity style={styles.button} onPress={onVerification ? this.onNextPress : this.sendToVerification}>
                            {onVerification
                                ?   <>
                                        <Text style={styles.buttonText}>Next</Text>
                                        <IconNext width={scale(12)} height={scale(19)}/>
                                    </>
                                :   <Text style={styles.buttonText}>Verify</Text>
                            }
                        </TouchableOpacity>
                    </View>
                </TouchableWithoutFeedback>
            </KeyboardAvoidingView>
        )
    }
}

const stateToProps = (state) => ({
    phone: state[ModMap.Auth].userAuthData.phone,
    phoneNum: state[ModMap.Auth].userAuthTmp.phoneNum,
    countryCode: state[ModMap.Auth].userAuthTmp.countryCode,
    code: state[ModMap.Auth].userAuthData.code,
});

const dispatchToProps = (dispatch) => ({
    regStep1Request: (iPhone, iNumber, iCountry) => dispatch(regStep2_1(iPhone, iNumber, iCountry)),
    regStep2Request: (iPhone, iCode) => dispatch(regStep2_2(iPhone, iCode)),
});

export default connect(stateToProps, dispatchToProps)(Step2);

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
    },
    titleText: {
        fontSize: scale(45),
        lineHeight: scale(35),
        paddingTop: scale(17),
        fontFamily: fontNames.bold,
        fontWeight: '900',
    },
    otpTitleText: {
        fontSize: scale(18),
        textAlign: 'center',
        fontWeight: '900',
        fontFamily: fontNames.bold,
        marginBottom: indent,
        color: colors.placeholderText
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
    otpWrap: {
        marginBottom: indent,
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        // backgroundColor: '#00ffff',
    },
    otpInput: {
        fontFamily: fontNames.bold,
        fontWeight: '900',
        textAlign: 'center',
        fontSize: scale(20),
        color: colors.mainText,
        width: scale(35),
        height: scale(55),
        borderColor: colors.inputBorder,
        borderWidth: 1,
        borderRadius: scale(12),
        backgroundColor: colors.inputBackground,
        paddingHorizontal: halfIndent,
    },
    otpInputContainer: {},

    phoneCnt:{
        marginBottom: indent,
        width: '100%',
        borderWidth: 1,
        borderRadius: scale(12),
        borderColor: colors.inputBorder,
        backgroundColor: colors.inputBackground,
    },
    phoneTextCnt:{
        height: scale(55),
        borderTopRightRadius: scale(12),
        borderBottomRightRadius: scale(12),
        backgroundColor: colors.inputBackground,
    },
    phoneText:{
        fontSize: scale(16),
        fontFamily: fontNames.bold,
        fontWeight: '900',
        paddingTop: scale(10),
        height: scale(90),
    },
    phoneCodeText:{
        fontSize: scale(16),
        fontFamily: fontNames.bold,
        fontWeight: '900',
        // height: scale(55),
        // backgroundColor: '#00ffff'
    },
    phoneFlag:{
        // width: scale(70),
        // height: scale(55),
        borderTopLeftRadius: scale(12),
        borderBottomLeftRadius: scale(12),
        // backgroundColor: '#00ffff'
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

    dummy: {
        marginBottom: indent,
        height: scale(55),
        width: '100%',
        paddingHorizontal: indent,
    },

    button: {
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'center',
        backgroundColor: colors.inputBackground,
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
