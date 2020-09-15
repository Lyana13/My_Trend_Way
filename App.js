import React from 'react'
import { StyleSheet, View, Text, Button } from 'react-native'
import { Welcome } from './src/components/Welcome'
import { SignIn } from './src/components/SignIn'
import { Home } from './src/components/Home';
 
export default function App() {
  return (
    <View style={styles.container}>
      <Welcome title='TRENDWAY' />
      {/* <Home title='TRENDWAY' /> */}
      {/* <SignIn title='TRENDWAY' /> */}
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