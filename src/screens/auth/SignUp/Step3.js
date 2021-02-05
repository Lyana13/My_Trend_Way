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
    onTextFieldFocusOut,
    validateEmail,
    WarningMessageEmail,
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
import ModMap from '../../../modules/map';
import {regStep3} from '../../../modules/auth';

class Step3 extends React.Component<Props> {
    constructor(props) {
        super(props);
        this.state = {
            email: props.email,
            wrongEmail: false,
        };

        console.log('>>>>> THIRD sign up + ' + JSON.stringify(props))
    }

    onChangeEmail = text => this.setState({ email: text });

    onNextPress = () => {
        const {email} = this.state;
        const isEmail = validateEmail(email);

        if(isEmail) {
            this.props.regStepRequest(email)
                .then(iResp => {
                    if(iResp.errors == null) {
                        this.props.navigation.navigate('Step4');
                    }
                    console.log('>>>> THIRD RESP : ' + JSON.stringify(iResp));

                });
        }else{
            this.setState({wrongEmail:!isEmail});
        }
    }

    render() {
        const {email, wrongEmail} = this.state;

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
                                <Text style={styles.titleNumber}>3</Text>
                                <Text style={styles.titleText}>Add your{'\n'}email</Text>
                            </View>
                        </View>
                        <View>
                            <View style={styles.inputWrap}>
                                <TextInput underlineColorAndroid='transparent' style={[styles.input, wrongEmail ? styles.wrong : null]} placeholderTextColor={colors.placeholderText} selectionColor={colors.designColor1}
                                           placeholder={'Email'} textContentType={'emailAddress'} autoCompleteType={'email'} keyboardType={'email-address'} value={email}
                                           onChangeText={this.onChangeEmail} onFocus={onTextFieldFocusIn} onBlur={onTextFieldFocusOut} autoFocus/>
                                { wrongEmail
                                    ? <WarningButton message={WarningMessageEmail} style={styles.warning}/>
                                    : null
                                }
                            </View>
                            <View style={styles.dummy}/>
                        </View>

                        <TouchableOpacity style={styles.button} onPress={this.onNextPress}>
                            <Text style={styles.buttonText}>Next</Text>
                            <IconNext width={scale(12)} height={scale(19)}/>
                        </TouchableOpacity>
                    </View>
                </TouchableWithoutFeedback>
            </KeyboardAvoidingView>
        )
    }
}

const stateToProps = (state) => ({
    email: state[ModMap.Auth].userAuthData.email,
});

const dispatchToProps = (dispatch) => ({
    regStepRequest: (iEmail) => dispatch(regStep3(iEmail)),
});

export default connect(stateToProps, dispatchToProps)(Step3);

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
        fontFamily: fontNames.bold,
        fontWeight: "900",
        fontSize: scale(95),
        marginTop: scale(-5),
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
        backgroundColor: colors.inputBackground,
        color: colors.mainText,
        borderRadius: scale(12),
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
