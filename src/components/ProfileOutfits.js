import React from 'react'
import { View, Text, StyleSheet,ImageBackground, TextInput, Button,Image, Alert, TouchableOpacity } from 'react-native'
import IconCalendar from '../assets/icons/angle-left-solid.svg';

export const ProfileOutfits = ({title}) => {

    return (
        <View style={styles.container} >
            <View style={styles.name} >
                <Text>Name</Text>
                <Image style={styles.goBAck} source={require('../assets/icons/IconCalendar.png')} />
            </View>
            <View style={styles.info} >
            <Image style={styles.goBAck} source={require('../assets/icons/IconCalendar.png')} />
            <Image style={styles.goBAck} source={require('../assets/icons/IconCalendar.png')} />
            <View style={styles.infoWrap}>
                <Text>22 Outfits</Text>
                <Text>333 Followers</Text>
                <Text>222 Following</Text>
            </View>
            </View>
        </View>
  
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        top: 50
      },
      name: {
        flexDirection: "row",
        alignItems: 'center'
      },
      info: {
        flexDirection: 'row'
      },
      infoWrap: {
          
      }

})