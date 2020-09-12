import React from 'react'
import { View, Text, StyleSheet, TextInput, Button } from 'react-native'

export const SignIn = ({title}) => {
    return (
        <View style={styles.home}>
            <Text style={styles.text}>Welcome Back</Text>
            <TextInput 
              style={{height: 45, borderColor: '#fff', borderWidth: 1, backgroundColor: '#fff', color: '#000' }}
            />
            <TextInput 
              style={{height: 45, borderColor: '#fff', borderWidth: 1, backgroundColor: '#fff', color: '#000' }}
            />
             <Button title='Sign In' color="#1EFCE5"/>
             <Text>Wjhkj</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    home: {
        flex: 1,
    backgroundColor: '#f8f',
    paddingTop: 30,
    width: '100%',
    justifyContent: 'center'
},
   
    text: {
        fontSize: 35,
        fontWeight: 'bold'
    }
})