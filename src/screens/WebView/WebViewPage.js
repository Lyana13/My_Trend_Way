import React from 'react'
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
} from 'react-native';
import styles, {
    colors,
    fontNames, fontSizes,
    fontWeights,
    indent,
    scale,
} from '../../styles';
import connect from 'react-redux/lib/connect/connect';
import ArrowBack from '../../../assets/icons/close.svg';
import WebView from 'react-native-webview';

const HEADER_HEIGHT = scale(81);

class WebViewPage extends React.Component<Props> {
    constructor(props) {
        super(props);
        this.state = {
            ...props.route.params,
        };
    }

    render() {
        const {url, title} = this.state;

        return (
            <View style={s.container}>
                <View style={s.header}>
                    <TouchableOpacity style={s.headerBtn} onPress={this.props.navigation.goBack} hitSlop={{top: scale(10), bottom: scale(10), left: scale(10), right: scale(10)}}>
                        <ArrowBack width={scale(20)} height={scale(20)}/>
                    </TouchableOpacity>
                    <Text style={s.title}>{title}</Text>
                    <View style={s.ampty} />
                </View>
                <WebView style={s.webView} source={{ uri: url }}/>
            </View>
        )
    }
}

const stateToProps = (state) => ({
});

const dispatchToProps = (dispatch) => ({
});

export default connect(stateToProps, dispatchToProps)(WebViewPage);

const s = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column",
        backgroundColor: colors.appBg,
    },
    header: {
        flexDirection: "row",
        backgroundColor: colors.appBg,
        width: '100%',
        height: HEADER_HEIGHT,
        zIndex: 2,
        alignItems: 'center',
        justifyContent: "space-between",
        paddingHorizontal: indent,
        // ...styles.shadow,
    },
    headerBtn: {
        height: scale(30),
        justifyContent: "center",
    },
    ampty: {
        width: scale(20),
        height: scale(20),
    },
    title: {
        fontFamily: fontNames.regular,
        fontWeight: fontWeights.bold,
        fontSize: fontSizes.cardTitle,
        textAlign: 'center',
    },
    webView: {
        flex:1,
    },
})
