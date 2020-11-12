import React, { useState } from 'react';
import { View, Text, StyleSheet,SafeAreaView,ScrollView, Image, Alert, TouchableOpacity} from 'react-native'

import ToggleBox from 'react-native-togglebox'
import IconBack from '../assets/icons/Back.svg';
import IconSelection from '../assets/icons/Selection.svg';
import IconForward from '../assets/icons/forward.svg';

import { FilterColour } from './FilterColour'
import { FilterCategory } from './FilterCategory'
import { FilterBrand } from './FilterBrand'

import {colors, scale} from '../styles';

function sortBy(currentItem){
  if(currentItem == 'for-you'){
    return null
  }
  else if(currentItem == 'new-items'){
    return null
  }
  else if(currentItem == 'price-low'){
    return null  
  }
  else if(currentItem == 'price-high'){
    return null
}
}

function filterBy(currentFilter){
  if(currentFilter == 'category'){
    return <FilterCategory />
  }
  else if(currentFilter == 'brand'){
    return <FilterBrand />
  }
}

function openColour(){
  alert('hello');
}

export const Filter = ({title}) => {

  const [currentItem, setCurrentItem] = useState('for-you');
  const [currentFilter, setCurrentFilter] = useState('category');

    return (
        <View style={styles.container}>
          <SafeAreaView>
          <ScrollView>
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
    <Text style={styles.bold}>Sort By {currentItem}</Text>  
                    
                    <View style={styles.wrapFlex}>
                      <Text>For You</Text> 
                      <TouchableOpacity  onPress={() => setCurrentItem('for-you')}>
                        <IconSelection style={{color: currentItem == 'for-you' ? '#26FBDA' : 'none', ...styles.categoriesItem}} width={20} height={20} />
                      </TouchableOpacity>
                    </View> 
                    <View style={styles.wrapFlex}>
                      <Text>New Items</Text> 
                      <TouchableOpacity  onPress={() => setCurrentItem('new-items')}>
                        <IconSelection style={{color: currentItem == 'new-items' ? '#26FBDA' : 'none', ...styles.categoriesItem}} width={20} height={20} />
                      </TouchableOpacity>
                    </View> 
                    <View style={styles.wrapFlex}>
                      <Text>Price(low first)</Text> 
                      <TouchableOpacity onPress={() => setCurrentItem('price-low')}>
                        <IconSelection style={{color: currentItem == 'price-low' ? '#26FBDA' : 'none', ...styles.categoriesItem}} width={20} height={20} />
                      </TouchableOpacity>
                    </View> 
                    <View style={styles.wrapFlex}>
                     <Text>Price(hight first)</Text> 
                     <TouchableOpacity onPress={() => setCurrentItem('price-high')}>
                        <IconSelection style={{color: currentItem == 'price-high' ? '#26FBDA' : 'none', ...styles.categoriesItem}}  width={20} height={20} />
                      </TouchableOpacity>
                    </View> 
                    {sortBy(currentItem)}
                </View>
              
          </View>
            <View style={styles.wrapContainer}>
                <View >
                    <Text style={styles.bold}>Filter By</Text>  
                    <View style={styles.wrapFlex}>
                    
                      <Text>Category</Text>
                      <IconForward width={20} height={20} />

                    </View>
                    <View style={styles.wrapFlex}>
                      <ToggleBox label='Brand' value='Tap' style={{}}>
                      <IconForward width={20} height={20} />
                      <FilterBrand />
                      </ToggleBox>
                    </View>
                    {filterBy(currentFilter)}
                    <View style={styles.wrapTabColour}>
                    <ToggleBox label='Colour' value='Tap' style={{}}>
                      <View style={{ height: 300, alignItems: 'center', justifyContent: 'center'}}>
                      <FilterColour />
                      </View>
                    </ToggleBox>
                      <Text></Text>
                      <IconForward  onPress={() => openColour()} width={20} height={20} />
                    </View>
                   
                </View>
              </View>   
              <View >
                
            <TouchableOpacity style={styles.buttonNext} onPress={() => Alert.alert('Button with adjusted color pressed')}>
              <Text style={styles.text}>Filter</Text>
            </TouchableOpacity>
          </View > 
            <View style={styles.bottomBar}>
            </View>
            
 
</ScrollView>
        </SafeAreaView>
        </View>
        
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column",
      },
      topTab: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        margin: 20,
        alignItems: 'center',
        width: scale(360),
      },
      categoriesItem: {
        marginLeft: 20,
        marginRight: 20,
      },
      bold: {
        fontWeight: "bold",
        fontSize: 18,
        paddingTop: 5,
        paddingBottom: 5
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
        wrapTabColour: {
          width: scale(390),
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
      forYouText: {
      fontWeight: "bold",
      fontSize: 18,
      padding: 10,
    },
      wrapOption: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: 15
    },
      bottomBar: {
          marginTop: 120
      }
})