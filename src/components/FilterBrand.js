import { View, Text, StyleSheet,SafeAreaView,ScrollView, Image, Alert, TouchableOpacity } from 'react-native'
import React, { useState } from 'react';
import IconBack from '../assets/icons/Back.svg';
import IconSelection from '../assets/icons/Selection.svg';
import IconForward from '../assets/icons/forward.svg';
import IconCheckbox from '../assets/icons/Checkbox.svg';
import {colors, scale} from '../styles';

export const FilterBrand = ({title}) => {
    const [currentColor, setCurrentColor] = useState(null);

    return (
        <View style={styles.container} >
            <View style={styles.topTab}>
                <IconBack width={20} height={20} />
                <TouchableOpacity onPress={() => { console.log('You tapped the Decrypt button!'); }} >
                    <Text style={styles.text}>Brand</Text>
                </TouchableOpacity >
                <TouchableOpacity onPress={() => { console.log('You tapped the Decrypt button!'); }} >
                    <Text style={styles.clear}>Clear</Text>
                </TouchableOpacity >
            </View>
             <View style={styles.wrapContainer}>
                 <Text style={styles.text}>My Favorites</Text>
                <View style={styles.wrapFavorite}> 
                    <View style={styles.wrapFlex}>
                    <Image style={styles.imgMainOne} source={require('../assets/image/PLT.png')} />
                    </View> 
                    <View style={styles.wrapFlex}>
                    <Image style={styles.imgMainOne} source={require('../assets/image/PLT.png')} />
                    </View>
                    <View style={styles.wrapFlex}>
                    <Image style={styles.imgMainOne} source={require('../assets/image/PLT.png')} />
                    </View> 
                    </View>
                    <View style={styles.wrapFavorite}>
                    <View style={styles.wrapFlex}>
                    <Image style={styles.imgMainOne} source={require('../assets/image/PLT.png')} />
                    </View> 
                    <View style={styles.wrapFlex}>
                    <Image style={styles.imgMainOne} source={require('../assets/image/PLT.png')} />
                    </View> 
                    <View style={styles.wrapFlex}>
                    <Image style={styles.imgMainOne} source={require('../assets/image/PLT.png')} />
                    </View>   
                </View>
                <View>
                    <View style={styles.wrapSortLetter}>
                    <Text style={styles.text}>A</Text>
                    </View>
                <View style={styles.itemBrand}>
                <Text style={styles.sortLetter}>Zara</Text>
                <IconCheckbox /> 
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
        margin: 30,
        alignItems: 'center',
       
      },
      wrapContainer:{
        paddingTop: 10
      },
      wrapFlex: {
          padding: 10,

        },
        wrapFavorite: {
            flexDirection: 'row',
            justifyContent: 'space-between',
        },
        buttonNext: {
            flexDirection: 'row',
            justifyContent: 'center',
            backgroundColor: colors.mainBlue,
              width: scale(350),
              padding: 15,
              borderRadius: 4,
              marginTop: 200
            },
            text: {
              color: colors.black,
              fontSize: 16,
              fontWeight: "bold",
            },
            clear: {
                color: colors.mainBlue,
              fontSize: 16,
              fontWeight: "bold",
            },
            wrapSortLetter: {
            backgroundColor: colors.lightGray3,
            },
            itemBrand: {
                flexDirection: 'row',
                justifyContent: 'space-between',
                paddingTop: 20,
            },
            sortLetter: {
                fontWeight: "bold",
            }
      
})