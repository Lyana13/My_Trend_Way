import React from 'react'
import { StyleSheet, View, Text, Button } from 'react-native'
import { Welcome } from './src/components/Welcome'
import { SignIn } from './src/components/SignIn'
import { Home } from './src/components/Home'
import { CreateAccount } from './src/components/CreateAccount'
import { MobileNumber } from './src/components/MobileNumber'
import { EmailAddress } from './src/components/EmailAddress'
import { Username } from './src/components/Username'

import { ProfileOutfits } from './src/components/ProfileOutfits'

 
export default function App() {
  return (
    <View style={styles.container}>
      {/* <Welcome title='TRENDWAY' /> */}
       {/* <SignIn title='TRENDWAY' /> */}
      {/* <CreateAccount title='TRENDWAY' /> */}
      {/* <MobileNumber /> */}
      {/* <Username /> */}
      {/* <Home title='TRENDWAY' /> */}
      <ProfileOutfits />
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