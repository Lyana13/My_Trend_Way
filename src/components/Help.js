import React from 'react'
import { View, Text, StyleSheet, TextInput, Button,Image, Alert, TouchableOpacity } from 'react-native'
import IconBack from '../assets/icons/Back.svg';

export const Help = ({title}) => {
    return (
        <View style={styles.container}>
            <View style={styles.wrapTitle}>
                <IconBack width={20} height={20} />
                <Text style={styles.title}>We're here to help</Text>
            </View>
            <View style={styles.container}>
                <View style={styles.wrapElements}>
                    <Text style={styles.txt}>Please describe the issues you are facing and we be in touch as soon as possible to resolve it.</Text> 
                </View>
                <TextInput placeholder = "     Message..." style={styles.input} onChangeText={text => onChangeText(text)} />
                  <TouchableOpacity style={styles.buttonNext} onPress={() => { console.log('You tapped the Decrypt button!'); }} onPress={() => Alert.alert('Button with adjusted color pressed')}>
                    <Text style={styles.text}> Send</Text>
                  </TouchableOpacity>
            </View>   
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginLeft: 15,
      },
      title: {
        fontWeight: 'bold',
        fontSize: 18,
        marginLeft: 100,
      },
      wrapTitle: {
        flexDirection: "row",
        alignItems: 'center',
        marginTop: 30
      },
      wrapElements: {
        flexDirection: "row",
        alignItems: 'center',
        marginTop: 40,
      },
      txt: {
        fontSize: 17,
      },
      input: {
        height: 300,
        borderColor: '#fff',
        borderWidth: 1,
        backgroundColor: '#F2F2F2',
        color: '#000',
        borderRadius: 12,
        width: 365,
        marginTop: 35 
    },
    text: {
      fontSize: 18,
      fontWeight: 'bold',
      color: "#fff"
  },
  buttonNext: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: "#000",
    width: 365,
    padding: 13,
      borderRadius: 12,
      marginTop: 25
    },
})
