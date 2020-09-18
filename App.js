import React from 'react'
import { StyleSheet, View, Text, Button } from 'react-native'
import { Welcome } from './src/components/Welcome'
import { SignIn } from './src/components/SignIn'
import { Home } from './src/components/Home'
import { CreateAccount } from './src/components/CreateAccount'
import { MobileNumber } from './src/components/MobileNumber'
 
export default function App() {
  return (
    <View style={styles.container}>
      {/* <Welcome title='TRENDWAY' /> */}
       {/* <SignIn title='TRENDWAY' /> */}
      
     
      {/* <CreateAccount title='TRENDWAY' /> */}
      <MobileNumber />
      {/* <Home title='TRENDWAY' /> */}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
        flexDirection: 'column',
        backgroundColor: '#fff',
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center'
  },
});