import { StyleSheet } from 'react-native';
import colors from './colors';
import {indent, doubleIndent} from './dimensions';

const styles = StyleSheet.create({
    shadow: {
        shadowColor: colors.shadowColor,
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: .1,
        shadowRadius: 4.65,
        elevation: 6,
    },
    shadowBottom: {
        shadowColor: colors.shadowColor,
        shadowOffset: {
            width: 0,
            height: -1,
        },
        shadowOpacity: .1,
        shadowRadius: 4.65,
        elevation: 6,
    },
    container: {
        paddingLeft: indent,
        paddingRight: indent,
    },
    fillAll: {
        flex: 1,
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    withMarginBottom: {
        marginBottom: indent,
    },
    withMarginTop: {
        marginTop: indent,
    },
    withMarginRight: {
        marginRight: indent,
    },
    withMarginLeft: {
        marginLeft: indent,
    },
    widthPaddingRight: {
        paddingRight: indent,
    },
    widthPaddingLeft: {
        paddingLeft: indent,
    },
    withVerticalMargin: {
        marginTop: indent,
        marginBottom: indent,
    },
    withVerticalPadding: {
        paddingTop: indent,
        paddingBottom: indent,
    },
    withHorizontalMargin: {
        marginRight: indent,
        marginLeft: indent,
    },
    withHorizontalPadding: {
        paddingRight: indent,
        paddingLeft: indent,
    },
    withoutMargins: {
        marginTop: 0,
        marginBottom: 0,
        marginRight: 0,
        marginLeft: 0,
    },
    withWhiteBackground: {
        backgroundColor: 'white',
    },
    withLightBackground: {
        backgroundColor: colors.darkBg,
    },
    withSecondaryTextColor: {
        color: colors.secondaryText,
    },
    withVerticalBorder: {
        borderTopWidth: StyleSheet.hairlineWidth,
        borderTopColor: colors.border,
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderBottomColor: colors.border,
    },
    stickToBottom: {
        bottom: 0,
    },
    stretchHorizontally: {
        left: 0,
        right: 0,
    },
    alignedRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    spaceBetween: {
        justifyContent: 'space-between',
    },
    withoutBorder: {
        borderTopWidth: 0,
        borderBottomWidth: 0,
        borderRightWidth: 0,
        borderLeftWidth: 0,
        shadowOpacity: 0,
    },
});

export default styles;
