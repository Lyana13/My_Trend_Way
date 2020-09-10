/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  Image,
  StatusBar,
  TouchableOpacity,
  Button,
} from 'react-native';

import { Colors } from 'react-native/Libraries/NewAppScreen';

export default function App() {
  return (
    <>
      <SafeAreaView
      
        style={{ backgroundColor: '#FBC3FB'}}>
          
      <Image
            source={require('./src/assets/image/letter.png')}
            style={styles.iconSocial}
            
          />
          
          <Image
            source={require('./src/assets/image/text-brand.png')}
            style={styles.iconSocial}
          />
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          style={styles.scrollView}>
          {/* <Header /> */}
         

<TouchableOpacity style={styles.FacebookStyle} activeOpacity={0.5}>
    <Image
     source={require('./src/assets/image/facebook.png')}
     style={styles.ImageIconStyle}
    />
    <View style={styles.SeparatorLine} />
    <Text style={styles.TextStyle}> Login Using Facebook </Text>
</TouchableOpacity>

<TouchableOpacity style={styles.FacebookStyle} activeOpacity={0.5}>
    <Image
     source={require('./src/assets/image/instagram.png')}
     style={styles.ImageIconStyle}
    />
    <View style={styles.SeparatorLine} />
    <Text style={styles.TextStyle}> Login Using Facebook </Text>
</TouchableOpacity>

<TouchableOpacity style={styles.FacebookStyle} activeOpacity={0.5}>
    <Image
     source={require('./src/assets/image/twitter.png')}
     style={styles.ImageIconStyle}
    />
    <View style={styles.SeparatorLine} />
    <Text style={styles.TextStyle}> Login Using Facebook </Text>
</TouchableOpacity>
        

   

</ScrollView>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.red,
  },
  body: {
    backgroundColor: Colors.red,
  },
});

const BtnSign = styled.TouchableOpacity`
  border-radius: 50px;
    color: "#26FBDA";
`;

export default App;
