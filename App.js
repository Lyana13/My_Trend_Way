import React from 'react'
import { StyleSheet, View, Text, Button, TouchableWithoutFeedback } from 'react-native'
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
import { NewPassword } from './src/components/NewPassword' 
import { Help } from './src/components/Help'
import { BottomPopup } from './src/components/BottomPopup'
import { ForgotPassword } from './src/components/ForgotPassword'
import { ForgotPassword2 } from './src/components/ForgotPassword2'
import { SentToEmail } from './src/components/SentToEmail'
import { Home } from './src/components/Home'

const popuplist = [
  {
    id: 1,
    name: 'Task'
  },
  {
    id: 2,
    name: 'Message'
  },
  {
    id: 3,
    name: 'Note'
  }
]

const App = () => {
  let popupRef = React.createRef()

  const onShowPopup = () => {
    popupRef.show()
  }

  const onClosePopup = () => {
    popupRef.close()
  }

  return (
    <View style={styles.container}>
      {/* <TouchableWithoutFeedback onPress={onShowPopup}>
        <Text>Show Popup</Text>
      </TouchableWithoutFeedback> 
       <BottomPopup
        title="Demo Popup"
        ref={(target) => popupRef = target}
        onTouchOutside={onClosePopup}
        data={popuplist}
    />  */}
      {/* <Welcome /> */}
       {/* <SignIn  /> */}
      {/* <CreateAccount /> */}
      {/* <MobileNumber /> */}
      {/* <EmailAddress title='TRENDWAY' /> */}
      {/* <Username /> */}
      {/* <ForgotPassword /> */}
      {/* <ForgotPassword2 /> */}
      {/* <Home /> */}
      {/* <SentToEmail /> */}


      {/* <ProfileOutfits /> */}
      {/* <ProfileWardrobe/> */}
      {/* <ProfileLiked /> */}

      <AccountSetting />
      {/* <EditProfile /> */}
      {/* <AccountDetails /> */}
     
      {/* <NewPassword /> */}
    {/* <Help /> */}
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

export default App;