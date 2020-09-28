import React from 'react'
import { StyleSheet, View, Text, Button } from 'react-native'
import { Welcome } from './src/components/Welcome'
import { SignIn } from './src/components/SignIn'
import { CreateAccount } from './src/components/CreateAccount'
import { MobileNumber } from './src/components/MobileNumber'
import { EmailAddress } from './src/components/EmailAddress'
import { Username } from './src/components/Username'

import { ProfileOutfits } from './src/components/ProfileOutfits'
import { ProfileWardrobe } from './src/components/ProfileWardrobe'
import { ProfileLiked } from './src/components/ProfileLiked'

import { EditProfile } from './src/components/EditProfile'
import { AccountSetting } from './src/components/AccountSetting' 
import { AccountDetails } from './src/components/AccountDetails' 


export default function App() {
  return (
    <View style={styles.container}>
      {/* <Welcome /> */}
       {/* <SignIn  /> */}
      {/* <CreateAccount /> */}
      {/* <MobileNumber /> */}
      {/* <EmailAddress title='TRENDWAY' /> */}
      {/* <Username /> */}
      


      {/* <ProfileOutfits /> */}
      {/* <ProfileWardrobe/> */}
      {/* <ProfileLiked /> */}

      {/* <EditProfile /> */}
      <AccountDetails />
      {/* <AccountSetting /> */}
      

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