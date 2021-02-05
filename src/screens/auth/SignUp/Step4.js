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
    colors,
    doubleIndent,
    fontNames,
    halfIndent,
    indent,
    scale,
    startY, thirdIndent,
    tripleIndent,
} from '../../../styles';
import {onTextFieldFocusIn, onTextFieldFocusOut, validateUserName, WarningMessageUserNameField} from '../../../utils/helpers';
import IconBack from '../../../../assets/icons/arrowBackT.svg';
import WarningButton from '../../../components/WarningButton';
import IconNext from '../../../../assets/icons/arrowNext.svg';
import ModMap from '../../../modules/map';
import {regStep3, regStep4} from '../../../modules/auth';

class Step4 extends React.Component<Props> {
    constructor(props) {
        super(props);
        this.state = {
            userName: props.username,
            wrongUserName: false,
        };

        console.log('>>>>> FOURTH sign up + ' + JSON.stringify(props))
    }

    onChangeUserName = text => this.setState({ userName: text });

    onNextPress = () => {
        const {userName} = this.state;
        const isUserName = validateUserName(userName);

        if(isUserName) {
            this.props.regStepRequest(userName)
                .then(iResp => {
                    if(iResp.errors == null) {
                        this.props.navigation.navigate('Step5');
                    }
                    console.log('>>>> FOURTH RESP : ' + JSON.stringify(iResp));
                });
        }else{
            this.setState({wrongUserName:!isUserName});
        }
    }
    render() {
        const {userName, wrongUserName} = this.state;

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
                                <Text style={styles.titleNumber}>4</Text>
                                <Text style={styles.titleText}>Choose a{'\n'}username</Text>
                            </View>
                        </View>
                        <View>
                            <View style={styles.inputWrap}>
                                <TextInput underlineColorAndroid='transparent' style={[styles.input, wrongUserName ? styles.wrong : null]} placeholderTextColor={colors.placeholderText} selectionColor={colors.designColor1}
                                           placeholder={'Username'} textContentType={'username'} autoCompleteType={'username'} keyboardType={'default'} value={userName}
                                           onChangeText={this.onChangeUserName} onFocus={onTextFieldFocusIn} onBlur={onTextFieldFocusOut} autoFocus/>
                                { wrongUserName
                                    ? <WarningButton message={WarningMessageUserNameField} style={styles.warning}/>
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
    username: state[ModMap.Auth].userAuthData.username,
});

const dispatchToProps = (dispatch) => ({
    regStepRequest: (iUsername) => dispatch(regStep4(iUsername)),
});

export default connect(stateToProps, dispatchToProps)(Step4);

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
