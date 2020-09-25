import React from 'react'
import { View, Text, StyleSheet,ImageBackground, TextInput, Button,Image, Alert, TouchableOpacity } from 'react-native'
import IconCalendar from '../assets/icons/angle-left-solid.svg';

export const CreateAccount = ({title}) => {
    const [value, onChangeText] = React.useState('EMAIL');

    return (
        <View style={styles.container} >
          <View style={styles.flexAlign} >
            <TouchableOpacity  onPress={() => { console.log('You tapped the Decrypt button!'); }} onPress={() => Alert.alert('Button with adjusted color pressed')}>
              <Image style={styles.goBAck} source={require('../assets/icons/IconCalendar.png')} />
            </TouchableOpacity >
            <Text style={{fontWeight: "bold", fontSize: 17 }}>Go back</Text>
          </View> 
          <View style={styles.flexAlignNumber} >
            <Text style={styles.number}>1</Text> 
            <Text style={styles.welcome}>Create an{'\n'}account</Text>
          </View>
          <TextInput placeholder = "     First Name" style={styles.input} onChangeText={text => onChangeText(text)} />
          <TextInput placeholder = "     Last Name" style={styles.input} />
          <View style={{ padding: 15, textAlign: 'center' }} >
            <TouchableOpacity style={styles.buttonNext} onPress={() => { console.log('You tapped the Decrypt button!'); }} onPress={() => Alert.alert('Button with adjusted color pressed')}>
              <Text style={styles.text}> Next </Text>
              <Image style={styles.goBAck} source={require('../assets/icons/IconCalendar.png')} />
            </TouchableOpacity>
          </View> 
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column"
      },
      flexAlign: {
        flex: 0, 
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 30,
      },
      flexAlignNumber: {
        flex: 0, 
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 30,
        marginLeft: 30,
        marginBottom: 40
      },
      image: {
        flex: 1,
        resizeMode: "cover",
        justifyContent: "center"
      },
      text: {
        color: "grey",
        fontSize: 30,
        fontWeight: "bold"
      },
      number: {
        fontSize: 100,
        fontWeight: "bold",
        color: "#E4E4E4"
      },
      goBAck: {
        width: 15,
        height: 15,
        paddingLeft: 30,
     
      },
    welcome: {
       fontSize: 40,
       fontWeight: 'bold',
    },
    input: {
        height: 55,
        borderColor: '#fff',
        borderWidth: 1,
        backgroundColor: '#F2F2F2',
        color: '#000',
        margin: 15,
        borderRadius: 12,
        width: 330,
    },
    text: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    forgotPass: {
        fontSize: 15,
        textDecorationLine: 'underline',
        margin: 25,
        marginHorizontal: 80
    },
  
      image: {
        flex: 1,
        resizeMode: "cover",
        justifyContent: "center"
      },

  buttonNext: {
      flex: 0,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: "#F2F2F2",
        width: 330,
        padding: 15,
        borderRadius: 12,
      },
})