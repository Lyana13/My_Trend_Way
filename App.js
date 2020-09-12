import React from 'react'
import { StyleSheet, View, Text, Button } from 'react-native'
import { Welcome } from './src/components/Welcome'
import { SignIn } from './src/components/SignIn'
 
export default function App() {
  return (
    <View style={styles.container}>
      {/* <Welcome title='TRENDWAY' /> */}
      <SignIn title='Gg' />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#513',
    width: '100%',
  },
});