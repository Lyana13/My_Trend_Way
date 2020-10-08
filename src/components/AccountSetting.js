import React from 'react'
import { View, Text, StyleSheet, ScrollView, SafeAreaView, ImageBackground, TextInput, Button,Image, Alert, TouchableOpacity } from 'react-native'

import IconForward from '../assets/icons/forward.svg';
import IconClose from '../assets/icons/X.svg';
import IconNotification from '../assets/icons/Notification.svg';
import IconProfile from '../assets/icons/Profile.svg';
import IconShield from '../assets/icons/Shield.svg';
import IconEmail from '../assets/icons/Email.svg';
import IconCircle from '../assets/icons/circle.svg';
import Lock from '../assets/icons/Lock.svg';

import BottomSheet from 'reanimated-bottom-sheet';
import Animated from 'react-native-reanimated';

export const AccountSetting = ({title}) => {
    renderInner = () => (
        <Text>YETEYETKU</Text>
    );

    renderHeader = () => (
        <View style={styles.header}>
            <View style={styles.panalHeader}>
                <View style={styles.panelHandle}></View>
            </View>
        </View>
    );

    bs = React.createRef();
    fall = new Animated.Value(1);

    return (
        
        <View style={{
            flex: 1, 
            backgroundColor: "#EEE", 
            justifyContent: 'flex-end'}}
            > 
            <TouchableOpacity onPress={() => this.bs.current.snapTo(0)}>
                <Text>Text</Text>
            </TouchableOpacity>
            <View style={styles.main}>
            <BottomSheet 
                ref={this.bs}
                snapPoints={[330, 0]}
                renderContent={this.renderInner}
                renderHeader={this.renderHeader}
                initialSnap={1}
                callbackNode={this.fall}
                enabledContentGestureInteraction={true}
            />
           
            <Text style={styles.title}>Settings</Text>
            <View style={styles.horizontal}></View>
            <View style={styles.container}>
                <View style={styles.wrapElements} >      
                    <IconProfile width={25} height={30} />
                    <Text style={styles.txt}>Edit Profile</Text>
                    <IconForward style={styles.elemEnd} width={20} height={20} />   
                </View>
                <View style={styles.wrapElements} >      
                    <IconShield width={25} height={30} />
                    <Text style={styles.txt}>Private Account</Text>
                    <IconCircle style={styles.elemEnd} width={20} height={20} />   
                </View>
                <View style={styles.wrapElements} >      
                    <IconEmail width={25} height={30} />
                    <Text style={styles.txt}>Account</Text>
                    <IconForward style={styles.elemEnd} width={20} height={20} />   
                </View>
                <View style={styles.wrapElements} >      
                    <IconNotification width={25} height={30} />
                    <Text style={styles.txt}>Notifications</Text>
                    <IconCircle style={styles.elemEnd} width={20} height={30} />   
                </View>
                <View style={styles.wrapElements} >      
                    <Lock width={25} height={30} />
                    <Text style={styles.txt}>Privacy policy</Text>
                    <IconForward style={styles.elemEnd} width={20} height={20} />   
                </View>
            </View>   
        </View>
        </View>
    )
}

const styles = StyleSheet.create({
    main:{
        backgroundColor: "#fff",
        width: "100%",
        borderTopRightRadius: 40,
        borderTopLeftRadius: 40,
        paddingHorizontal: 20,
        
    },
    container: {
        flex: 0,
        margin: 20,
      },
      title: {
        fontWeight: 'bold',
        fontSize: 20,
        marginLeft: 30,
        marginTop: 20,
        
        
      },
      wrapElements: {
        flexDirection: "row",
        alignItems: 'center',
        margin: 10
      },
      txt: {
        fontSize: 20, 
        marginLeft: 30,
        marginRight: 150,   
      },
      
      elemEnd: {
        position: 'absolute',
        marginLeft: 320
      },
      horizontal: {
        opacity: 0.1,
        backgroundColor: '#182E44',
        height: 2,
        marginTop: 20,
      },
      header: {
          backgroundColor: '#fff',
          shadowColor: "#333",
          shadowOffset: {width: -1, height: -3},
          shadowRadius: 2,
          shadowOpacity: 0.4,
          paddingTop: 20,
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
      },
      panalHeader: {
          alignItems: 'center'
      },
      panelHandle: {
        width: 40,
        height: 8,
        borderRadius: 4,
        backgroundColor: "#000",
        marginBottom: 10,
      },
})
