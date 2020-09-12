import React from 'react'
import { View, Text, StyleSheet, Button, TextInput } from 'react-native'

export const Welcome = props => {
    return (
        <View style={styles.home}>
            <Text style={styles.text}>{props.title}</Text>
          <View style={styles.wrapBtn}>
            <Button style={styles.btn} title='tit' color="#000"/>
            <Button title='tit' color="#3768B5"/>
            <Button title='Sign Up' color="#841584" style={{color: 'red', marginTop: 80, padding: 100}} />
          </View>
          <Text style={styles.txt}>TESTTEKS5T</Text>
        </View>
    )
}

const styles = StyleSheet.create({
  home: {
    flex: 1,
    backgroundColor: '#f8f',
    paddingTop: 30,
    width: '100%'
  },
  text: {
    color: "#fff",
    fontSize: 35,
    textAlign: 'center',
    paddingTop: 60,
  },  
  wrapBtn: {
    width: '80%',
    marginTop: 230,
    textAlign: 'center',
    margin: 40,
    borderBottomColor: '#737373',
  },
  btn: {
    paddingTop: 50,
  },
  txt: {
    color: '#fff',
    fontSize: 15,
    textAlign: 'center',
  }
});
