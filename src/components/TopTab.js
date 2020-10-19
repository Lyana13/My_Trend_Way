
import { View, Text, StyleSheet,SafeAreaView,ScrollView, Image, Alert, TouchableOpacity } from 'react-native'
import React, { useState } from 'react';
import IconOutfits from '../assets/icons/Outfits.svg';
import IconCreate from '../assets/icons/Create.svg';
import IconProfile from '../assets/icons/Profile.svg';
import { SearchUsers } from './SearchUsers'
import { SearchOutfits } from './SearchOutfits' 
import { SearchItems } from './SearchItems' 

function renderContext(currentTab){
    if(currentTab == 'outfits'){
      return  <SearchOutfits /> 
    }
    else if(currentTab == 'users'){
        return <SearchUsers /> 
    }
    else if(currentTab == 'items'){
        return <SearchItems /> 
    }
}

export const TopTab = ({title}) => {
    const [currentTab, setCurrentTab] = useState('outfits');

    return (
        <View style={styles.container}>
        <SafeAreaView>
        <ScrollView>
            <View style={styles.categories}>
                <TouchableOpacity style={styles.buttonNext} onPress={() => setCurrentTab('outfits')}>
                <IconOutfits style={{color: currentTab == 'outfits' ? '#ccc' : '#000', ...styles.categoriesItem}} width={25} height={60} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.buttonNext} onPress={() => setCurrentTab('users')}>
                <IconCreate  style={{color: currentTab == 'users' ? '#ccc' : '#000', ...styles.categoriesItem}} width={30} height={60} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.buttonNext} onPress={() => setCurrentTab('items')}>
                <IconProfile style={{color: currentTab == 'items' ? '#ccc' : '#000', ...styles.categoriesItem}} width={30} height={60} />
                </TouchableOpacity>
            </View>
                {renderContext(currentTab)}
            </ScrollView>
        </SafeAreaView>
        </View>
    )
}



const styles = StyleSheet.create({
    categories: {
        flexDirection: 'row',
        justifyContent: 'center'
    },  
    categoriesItem: {
      marginLeft: 20,
      marginRight: 20,
    },
})