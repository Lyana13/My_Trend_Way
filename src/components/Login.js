import React from 'react'
import { View, Text, StyleSheet, Button } from 'react-native'

export const Login = props => {
    return (
        <View style={styles.home}>
            <Text style={styles.text}>{props.title}</Text>

            <Button title='tit'/>
            <Button style={styles.btn1} title='tit'/>
            <Button title='tit' color="#841584" />
            <Text style={styles.txt}>TESTTEKS5T</Text>
        </View>
    )
}

const styles = StyleSheet.create({
  home: {
    flex: 1,
    backgroundColor: '#000',
    marginTop: 30,
    width: '80%'
  },
  text: {
    color: "#44D",
    textAlign: 'center'
  },  
  btn1: {
    width: '80%',
    color: '#44D',
    padding: 20,
    marginVertical: 8,
    borderBottomColor: '#737373',
  },
  txt: {
    color: '#fff',
    fontSize: 26,
    paddingTop: 20,
    textAlign: 'center'
  }
});
