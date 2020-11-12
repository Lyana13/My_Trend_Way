import { View, Text, StyleSheet,SafeAreaView,ScrollView, Image, Alert, TouchableOpacity } from 'react-native'
import React, { useState } from 'react';
import IconBack from '../assets/icons/Back.svg';
import IconSelection from '../assets/icons/Selection.svg';
import IconForward from '../assets/icons/forward.svg';
import {colors, scale} from '../styles';

export const FilterCategory = ({title}) => {
    const [currentColor, setCurrentColor] = useState(null);

    return (
        <View style={styles.container} >
            <View style={styles.topTab}>
                <IconBack width={20} height={20} />
                <TouchableOpacity onPress={() => { console.log('You tapped the Decrypt button!'); }} >
                    <Text style={styles.forYouText}>Category</Text>
                </TouchableOpacity >
                <TouchableOpacity onPress={() => { console.log('You tapped the Decrypt button!'); }} >
                    <Text style={styles.forYouText}>Clear</Text>
                </TouchableOpacity >
            </View>
             <View style={styles.wrapContainer}>
                <View>
                    <View style={styles.wrapFlex}>
                      <Text>Dresses</Text> 
                    </View> 
                    <View style={styles.wrapFlex}>
                      <Text>Polos</Text> 
                    </View> 
                    <View style={styles.wrapFlex}>
                      <Text>T-Shirts</Text>  
                    </View> 
                    <View style={styles.wrapFlex}>
                     <Text>Shorts</Text> 
                    </View>
                    <View style={styles.wrapFlex}>
                      <Text>Jackets</Text> 
                    </View> 
                    <View style={styles.wrapFlex}>
                      <Text>Coats</Text>  
                    </View> 
                    <View style={styles.wrapFlex}>
                     <Text>Sweatshirts</Text> 
                    </View> 
                    <View style={styles.wrapFlex}>
                      <Text>Tracksuits</Text> 
                    </View> 
                    <View style={styles.wrapFlex}>
                      <Text>Knitwear</Text>  
                    </View> 
                    <View style={styles.wrapFlex}>
                     <Text>Swimwear</Text> 
                    </View>
                    <View style={styles.wrapFlex}>
                      <Text>Skirts</Text>  
                    </View> 
                    <View style={styles.wrapFlex}>
                     <Text>Jeans</Text> 
                    </View>    
                </View>
                <TouchableOpacity style={styles.buttonNext} onPress={() => Alert.alert('Button with adjusted color pressed')}>
              <Text style={styles.text}>Filter</Text>
            </TouchableOpacity>
          </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
      },
      topTab: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        margin: 20,
        alignItems: 'center',
        width: scale(360),
      },
      wrapContainer:{
        margin: 30
      },
      wrapFlex: {
          flexDirection: 'row',
          justifyContent: 'space-between',
          width: scale(350),
          padding: 10
        },
        buttonNext: {
            flexDirection: 'row',
            justifyContent: 'center',
            backgroundColor: colors.mainBlue,
              width: scale(350),
              padding: 15,
              borderRadius: 4,
              marginLeft: scale(28),
              marginTop: 200
            },
            text: {
              color: colors.black,
              fontSize: 16,
              fontWeight: "bold",
            },
      
})