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
import { SendToEmail } from './src/components/SendToEmail'
import { Home } from './src/components/Home'
import { ProductPage } from './src/components/ProductPage'
import { Explore } from './src/components/Explore'
import { SearchUsers } from './src/components/SearchUsers'
import { SearchOutfits } from './src/components/SearchOutfits' 
import { SearchItems } from './src/components/SearchItems' 
import { TopTab } from './src/components/TopTab' 
import { Filter } from './src/components/Filter' 
import { FilterColour } from './src/components/FilterColour'
import { FilterCategory } from './src/components/FilterCategory'
import { FilterBrand } from './src/components/FilterBrand'

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
      {/* <SendToEmail /> */}


      {/* <ProfileOutfits /> */}
      {/* <ProfileWardrobe/> */}
      {/* <ProfileLiked /> */}

      {/* <AccountSetting /> */}
      {/* <EditProfile /> */}
      {/* <AccountDetails /> */}

      {/* <ProductPage /> */}
      {/* <Explore /> */}

      {/* <SearchUsers /> */}
      {/* <SearchOutfits /> */}
      {/* <SearchItems /> */}
      {/* <TopTab /> */}
      <Filter />
      {/* <FilterColour /> */}
      {/* <FilterCategory /> */}
      {/* <FilterBrand /> */}

     
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