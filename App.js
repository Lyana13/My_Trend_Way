import React from 'react'
import { StyleSheet, View, Text, Button } from 'react-native'
import { Login} from './src/components/Login'
import { Footer } from  './src/components/Footer'

export default function App() {
  return (
    <View style={styles.container}>
      <Login title='TRENDWAY' />
      {/* <Footer title="Footerr" />
       */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#513'
  },
});