import React from 'react'
import {
    View,
    Text,
    StyleSheet,
    Platform,
    TextInput,
    KeyboardAvoidingView,
    TouchableOpacity,
    TouchableWithoutFeedback,
    Keyboard,
} from 'react-native';
import connect from 'react-redux/lib/connect/connect';
import {
    colors,
    doubleIndent, fontNames, fontWeights,
    halfIndent,
    indent,
    scale,
    startY, thirdIndent,
    tripleIndent,
} from '../../../styles';
import IconBack from '../../../../assets/icons/arrowBackT.svg';
import IconNext from '../../../../assets/icons/arrowNext.svg';
import WarningButton from '../../../components/WarningButton';
import { onTextFieldFocusIn, onTextFieldFocusOut, validateFirstLastName,
    WarningMessageFillField,
} from '../../../utils/helpers';
import {regStep1} from '../../../modules/auth';
import ModMap from '../../../modules/map';

class Step1 extends React.Component<Props> {
    constructor(props) {
        super(props);

        this.state = {
            firstName: props.first_name,
            lastName: props.last_name,
            wrongFirstName: false,
            wrongLastName: false,
        };

        console.log('>>>>> FIRST sign up + ' + JSON.stringify(props))
    }

    onChangeFirstName = text => this.setState({ firstName: text });
    onChangeLastName = text => this.setState({ lastName: text });

    onNextPress = () => {
        const {firstName, lastName} = this.state;
        const isFirstName = validateFirstLastName(firstName);
        const isLastName = validateFirstLastName(lastName);

        if(isFirstName && isLastName) {
            this.props.regStepRequest(firstName, lastName)
                .then(iResp => {
                    console.log('>>>> FIRST RESP : ' + JSON.stringify(iResp));
                    this.props.navigation.navigate('Step2');
                });
        }else{
            this.setState({wrongFirstName:!isFirstName, wrongLastName:!isLastName});
        }
    }

    render() {
        const {firstName, lastName, wrongFirstName, wrongLastName} = this.state;

        return (
            // <KeyboardAwareScrollView style={styles.wrapper} contentContainerStyle={styles.container}>
            <KeyboardAvoidingView behavior={Platform.OS == "ios" ? "padding" : "height"} style={styles.wrapper} >
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <View style={styles.container}>
                        <View>
                            <TouchableOpacity style={styles.goBackBtn} onPress={this.props.navigation.goBack}>
                                <IconBack width={scale(9)} height={scale(14)}/>
                                <Text style={styles.backBtnTxt}>Go back</Text>
                            </TouchableOpacity>
                            <View style={styles.titleWrap}>
                                <Text style={styles.titleNumber}>1</Text>
                                <Text style={styles.titleText}>Create an{'\n'}account</Text>
                            </View>
                        </View>
                        <View>
                            <View style={styles.inputWrap}>
                                <TextInput underlineColorAndroid='transparent' style={[styles.input, wrongFirstName ? styles.wrong : null]} placeholderTextColor={colors.placeholderText} selectionColor={colors.designColor1}
                                           placeholder={'First Name'} textContentType={'name'} autoCompleteType={'name'} value={firstName}
                                           onChangeText={this.onChangeFirstName} onFocus={onTextFieldFocusIn} onBlur={onTextFieldFocusOut} autoFocus/>
                                { wrongFirstName
                                    ? <WarningButton message={WarningMessageFillField} style={styles.warning}/>
                                    : null
                                }
                            </View>
                            <View style={styles.inputWrap}>
                                <TextInput underlineColorAndroid='transparent' style={[styles.input, wrongLastName ? styles.wrong : null]} placeholderTextColor={colors.placeholderText} selectionColor={colors.designColor1}
                                           placeholder={'Surname'} textContentType={'familyName'} autoCompleteType={'name'} value={lastName}
                                           onChangeText={this.onChangeLastName} onFocus={onTextFieldFocusIn} onBlur={onTextFieldFocusOut}/>
                                { wrongLastName
                                    ? <WarningButton message={WarningMessageFillField} style={styles.warning}/>
                                    : null
                                }
                            </View>
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
    first_name: state[ModMap.Auth].userAuthData.first_name,
    last_name: state[ModMap.Auth].userAuthData.last_name,
});

const dispatchToProps = (dispatch) => ({
    regStepRequest: (iFirst, iLast) => dispatch(regStep1(iFirst, iLast)),
});

export default connect(stateToProps, dispatchToProps)(Step1);

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
        marginRight: scale(-5),
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
        borderWidth: scale(1),
        backgroundColor: colors.inputBackground,
        color: colors.mainText,
        borderRadius: scale(12),
        width: '100%',
        paddingHorizontal: indent,
        fontSize: scale(16),
        fontFamily: fontNames.bold,
        fontWeight: fontWeights.bold,
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
