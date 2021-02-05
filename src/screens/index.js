import React, {forwardRef} from 'react';
import {Animated} from 'react-native';
import { createSwitchNavigator } from '@react-navigation/compat';
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';
import Product from './Product/ProductPage';
import Welcome from './auth/Welcome';
import SignIn from './auth/SignIn';
import SignUp from './auth/SignUp';
import Main from './main';
import ItemsList from './main/Search/ItemsList';
import LoadingScreen from './auth/LoadingScreen';
import {connect} from 'react-redux';
import {ModMap} from '../modules';
import Create from './main/Create';
import Filter from './Filter/';
import WebViewPage from './WebView/WebViewPage';

const Stack = createStackNavigator();

// const config = {
//     animation: 'spring',
//     config: {
//         stiffness: 1000,
//         damping: 500,
//         mass: 3,
//         overshootClamping: true,
//         restDisplacementThreshold: 0.01,
//         restSpeedThreshold: 0.01,
//     },
// };
//
// const forSlide = ({ current, next, inverted, layouts: { screen } }) => {
//     const progress = Animated.add(
//         current.progress.interpolate({
//             inputRange: [0, 1],
//             outputRange: [0, 1],
//             extrapolate: 'clamp',
//         }),
//         next
//             ? next.progress.interpolate({
//                 inputRange: [0, 1],
//                 outputRange: [0, 1],
//                 extrapolate: 'clamp',
//             })
//             : 0
//     );
//
//     return {
//         cardStyle: {
//             transform: [
//                 {
//                     translateX: Animated.multiply(
//                         progress.interpolate({
//                             inputRange: [0, 1, 2],
//                             outputRange: [
//                                 screen.width, // Focused, but offscreen in the beginning
//                                 0, // Fully focused
//                                 screen.width * -0.3, // Fully unfocused
//                             ],
//                             extrapolate: 'clamp',
//                         }),
//                         inverted
//                     ),
//                 },
//             ],
//         },
//         containerStyle: {
//             zIndex: next ? 1 : 2,
//         },
//     };
// };
//
// const horizontalAnimation = {
//     transitionSpec: {
//         open: config,
//         close: config,
//     },
//     gestureDirection: 'horizontal-inverted',
//     cardStyleInterpolator: forSlide,
// };

const CoverScreens = (data) => (
    <Stack.Navigator screenOptions={({ route, navigation }) => ({headerShown: false, gestureEnabled: true })} >
        <Stack.Screen name="Main" component={Main} />
        <Stack.Screen name="Create" component={Create} options={{gestureDirection: 'horizontal-inverted'}}/>
        <Stack.Screen name="Product" component={Product} />
    </Stack.Navigator>
);

const MainNavigator = (data) => {
console.log('!!! MAIN NAVI : ' + JSON.stringify(data));
    const isAuth = data.userToken === '' || data.userToken === null;
    const transition = isAuth ? null : TransitionPresets.ModalPresentationIOS;

    return (
        data.isLoading ? (
            <LoadingScreen/>
        ) : (
            <Stack.Navigator
                screenOptions={({ route, navigation }) => ({
                        headerShown: false,
                        gestureEnabled: true,
                        cardOverlayEnabled: true,
                        headerStatusBarHeight:
                            navigation
                                .dangerouslyGetState()
                                .routes.findIndex((r) => r.key === route.key) > 0
                                ? 0
                                : undefined,
                        ...transition,
                })}
                mode = {isAuth ? 'card' : "modal"}
            >
                {isAuth ? (
                <>
                    <Stack.Screen name="Welcome" component={Welcome}/>
                    <Stack.Screen name="SignIn" component={SignIn}/>
                    <Stack.Screen name="SignUp" component={SignUp} />
                    {/*<Stack.Screen name="ResetPassword" component={ResetPassword} />*/}
                </>
                ) : (
                <>
                    <Stack.Screen name="CoverScreens" component={CoverScreens}/>
                    <Stack.Screen name="Filter" component={Filter}/>
                    <Stack.Screen name="WebView" component={WebViewPage}/>
                    {/*<Stack.Screen name="ItemsList" component={ItemsList} />*/}
                    {/*<Stack.Screen name="Profile" component={ProfileScreen} />*/}
                </>
                )}
            </Stack.Navigator>
        )
    )
}
//initialRouteName={'Main'}
//options={horizontalAnimation}
//options={{ transitionSpec: { open: config, close: config, }, }}
const Connected = connect(state => ({ isLoading: state[ModMap.User].gettingToken,  userToken:state[ModMap.User].userToken}), null, null, { forwardRef: true })(MainNavigator);
export default Connected;
// export default forwardRef((props, ref) =>
//     <Connected {...props} ref={ref} />
// );
