import React, {forwardRef} from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import IonIcons from '../../components/IonIcons';
import colors from '../../styles/colors';
import Home from './Home';
import Search from './Search';
import Create from './Create';
import Profile from './Profile';
import EmptyScreen from '../emptyScreen/EmptyScreen'
import {StyleSheet} from 'react-native';
import styles, {bottomIndent, halfIndent, indent, scale, startY} from '../../styles';

import { View, Text, TouchableOpacity } from 'react-native';

function MyTabBar({ state, descriptors, navigation }) {
    const focusedOptions = descriptors[state.routes[state.index].key].options;

    if (focusedOptions.tabBarVisible === false) {
        return null;
    }

    const onCreatePress = () => {
        navigation.navigate('Create');
    };

    return (
        <View style={s.barCnt} >
            {state.routes.map((route, index) => {
                const { options } = descriptors[route.key];
                // const label =
                //     options.tabBarLabel !== undefined
                //         ? options.tabBarLabel
                //         : options.title !== undefined
                //         ? options.title
                //         : route.name;

                const isFocused = state.index === index;

                const onPress = () => {
                    const event = navigation.emit({
                        type: 'tabPress',
                        target: route.key,
                        canPreventDefault: true,
                    });

                    if (!isFocused && !event.defaultPrevented) {
                        navigation.navigate(route.name);
                    }
                };

                const onLongPress = () => {
                    navigation.emit({
                        type: 'tabLongPress',
                        target: route.key,
                    });
                };

                return (
                    [
                        <TouchableOpacity
                            key={`tab-bar-item-${route.name}-${route.key}-${index}`}
                            accessibilityRole="button"
                            accessibilityState={isFocused ? { selected: true } : {}}
                            accessibilityLabel={options.tabBarAccessibilityLabel}
                            testID={options.tabBarTestID}
                            onPress={onPress}
                            onLongPress={onLongPress}
                            style={s.btnCnt}
                        >
                            <IonIcons name={route.name} focused={isFocused} />
                        </TouchableOpacity>,
                        (route.name === 'Search'
                            ?<TouchableOpacity
                                key={`tab-bar-item-Create-CreateKey-${index}`}
                                onPress={onCreatePress}
                                style={s.btnCnt}
                            >
                                <IonIcons name={'Create'} focused={false} />
                            </TouchableOpacity>
                            :null
                        )
                    ]
                );
            })}
        </View>
    );
}

const Tab = createBottomTabNavigator();

const MainNavigator = (data) => {

    return (
        <Tab.Navigator
            tabBar={props => <MyTabBar {...props} />}
            screenOptions={({ route }) => ({
                headerShown: false,
                gestureEnabled: true,
                tabBarIcon: ({ focused, color, size }) => {
                    return <IonIcons name={route.name} focused={focused} size={size} color={color} />;
                },
            })}
            tabBarOptions={{
                showLabel: false,
                keyboardHidesTabBar: true,
                activeTintColor: colors.designColor1,
                inactiveTintColor: colors.normalIcon,
            }}
        >
            <Tab.Screen name="Home" component={Home}/>
            <Tab.Screen name="Search" component={Search}/>
            {/*<Tab.Screen name="Create" component={() => null}/>*/}
            <Tab.Screen name="Activity" component={EmptyScreen}/>
            <Tab.Screen name="Profile" component={Profile}/>
        </Tab.Navigator>
    )
}

// const Connected = connect(state => ({ value: state }), null, null, { forwardRef: true })(MainNavigator);
export default MainNavigator;

const s = StyleSheet.create({
    barCnt: {
        flexDirection: 'row',
        paddingBottom: bottomIndent + halfIndent,
        backgroundColor: colors.appBg,
        ...styles.shadowBottom,
    },
    btnCnt:{ flex: 1 },
});
