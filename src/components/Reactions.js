
import { View, Text, StyleSheet,SafeAreaView,ScrollView, Image, Alert, TouchableOpacity } from 'react-native'
import React, { useState } from 'react';
import IconOutfits from '../assets/icons/Outfits.svg';
import IconBottonLine from '../assets/icons/bottonLine.svg';
import { SearchUsers } from './SearchUsers'
import IconGoBack from '../assets/icons/Back.svg';
import { Likes } from './Likes' 
import { Comments } from './Comments' 

function renderContext(currentTab){
    if(currentTab == 'likes'){
      return  <Likes /> 
    }
    else if(currentTab == 'comments'){
        return <Comments /> 
    }
}

export const Reactions = ({title}) => {
    const [currentTab, setCurrentTab] = useState('likes');

    return (
        <View style={styles.container}>
            <View style={styles.topHeader}>
            <IconGoBack width={20} height={18}/>
            <Text style={styles.textBold}>Reactions</Text>
            <Text></Text>
            </View>
        <SafeAreaView>
        <ScrollView>
            <View style={styles.categories}>
            <TouchableOpacity style={styles.buttonNext} onPress={() => setCurrentTab('likes')}>
                <Text style={styles.textBold}>50 Likes</Text>
                <IconBottonLine  style={{color: currentTab == 'likes' ? '#26FBDA' : '#000', ...styles.categoriesItem}} width={200} height={20} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.buttonNext} onPress={() => setCurrentTab('comments')}>
                <Text style={styles.textBold}>10 Comments</Text>
                <IconBottonLine style={{color: currentTab == 'comments' ? '#26FBDA' : '#000', ...styles.categoriesItem}} width={200} height={20} />
                </TouchableOpacity>
            </View>
                {renderContext(currentTab)}
            </ScrollView>
        </SafeAreaView>
        </View>
    )
}



const styles = StyleSheet.create({
    topHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 40,
        marginBottom: 20,
        alignItems: 'center'
    },
    categories: {
        flexDirection: 'row',
        justifyContent: 'space-around',  
    },

    textBold: {
        fontWeight: 'bold',
        fontSize: 20
    }
})