import React from 'react'
import { View, Text, StyleSheet, ImageBackground  } from 'react-native'

export const Home = props => {
    return (
        
            <ImageBackground source={require('../assets/image/home.jpeg')} style={styles.image}>
                
            </ImageBackground>
       
    )
}


const styles = StyleSheet.create({
    
    image: {
      flex: 1,
      resizeMode: "cover",
      justifyContent: "center",
      width: 400
    },

  });
  