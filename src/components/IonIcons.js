import React, {memo} from 'react';
import {StyleSheet, View} from 'react-native';
import {bottomIndent, colors, halfIndent, scale} from '../styles';
import IconHome from '../../assets/icons/Home.svg';
import IconSearch from '../../assets/icons/Search.svg';
import IconCreate from '../../assets/icons/Create.svg';
import IconNotification from '../../assets/icons/Notification.svg';
import IconProfile from '../../assets/icons/Profile.svg';

import IconHomeActive from '../../assets/icons/HomeActive.svg';
import IconSearchActive from '../../assets/icons/SearchActive.svg';
import IconCreateActive from '../../assets/icons/CreateActive.svg';
import IconNotificationActive from '../../assets/icons/NotificationActive.svg';
import IconProfileActive from '../../assets/icons/ProfileActive.svg';

function IonIcons({name, focused, size, color} = iProps) {
    let Icon;
    if(name === 'Home')
        Icon = focused ? IconHomeActive : IconHome;
    else if(name === 'Search')
        Icon = focused ? IconSearchActive : IconSearch;
    else if(name === 'Create')
        Icon = focused ? IconCreateActive : IconCreate;
    else if(name === 'Activity')
        Icon = focused ? IconNotificationActive : IconNotification;
    else if(name === 'Profile')
        Icon = focused ? IconProfileActive : IconProfile;

    return(
        <View style={s.cnt}>
            <Icon style={s.icon} height={scale(25)}/>
            <View style={focused && name !== 'Create' ? s.activeLine : s.inactiveLine}/>
        </View>
    );
}

const s = StyleSheet.create({
    icon: {
        marginTop: 8,
    },
    cnt: {
        marginTop: halfIndent,
        alignItems: 'center',
    },
    activeLine: {
        width: scale(30),
        height: scale(2),
        backgroundColor: colors.designColor1,
        marginTop: halfIndent,
    },
    inactiveLine: {
        width: scale(30),
        height: scale(20),
        backgroundColor: colors.appBg,
        marginTop: halfIndent,
    }
});

export default memo(IonIcons);
