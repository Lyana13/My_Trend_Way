

import React from 'react'
import { View, Text, StyleSheet,SafeAreaView,ScrollView, Image, Alert, TouchableOpacity } from 'react-native'
import IconHome from '../assets/icons/Home.svg';
import IconSearch from '../assets/icons/Search.svg';
import IconNotification from '../assets/icons/Notification.svg';
import IconProfile from '../assets/icons/Profile.svg';
import IconOutfits from '../assets/icons/Outfits.svg';
import IconCreate from '../assets/icons/Create.svg';

export const Home = ({title}) => {

    return (
        <View style={styles.container}>
                <SafeAreaView>
             <ScrollView>
        
            <View style={styles.topTab}>
                <TouchableOpacity style={styles.forYou} onPress={() => { console.log('You tapped the Decrypt button!'); }} onPress={() => Alert.alert('Button with adjusted color pressed')}>
                    <Text style={styles.forYouText}>For you</Text>
                </TouchableOpacity >
                <TouchableOpacity onPress={() => { console.log('You tapped the Decrypt button!'); }} onPress={() => Alert.alert('Button with adjusted color pressed')}>
                    <Text style={styles.forYouText}>Following</Text>
                </TouchableOpacity >
            </View>
            <View style={styles.horizontal}></View>

            <View style={styles.wraplogoText}>
                <Image style={styles.imgProfile} source={require('../assets/icons/brand.jpg')} />
                <Text style={styles.logoText}>Trendway</Text>
            </View>
            <View style={styles.wrapImages}>
            <View>
            <Image style={styles.imgMain} source={require('../assets/image/model.jpg')} />
            </View>

            <View style={{flex: 0, flexDirection: 'column'}}>
            <Image style={styles.imgSecondary} source={require('../assets/image/model.jpg')} />
            <Image style={styles.imgSecondary} source={require('../assets/image/model.jpg')} />
            <Image style={styles.imgSecondary} source={require('../assets/image/model.jpg')} />
            </View>
            
            </View>
            <View style={styles.wrapOption}>
            <View style={styles.option}>
                <IconHome style={styles.optionItem} width={25} height={30} />
                <IconSearch style={styles.optionItem} width={22} height={30} />
                <IconCreate style={styles.optionItem} width={30} height={60} />
                <IconNotification style={styles.optionItem} width={25} height={30} />
                <IconProfile style={styles.optionItem} width={25} height={30} />
            </View>

            <View>
                <Text>345 views</Text>
            </View>

            </View>
            <View>
            <View style={styles.bottomBar}>
                <IconHome  width={25} height={30} />
                <IconSearch width={22} height={30} />
                <IconCreate  width={30} height={60} />
                <IconNotification width={25} height={30} />
                <IconProfile width={25} height={30} />
            </View>
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
        flex: 0,
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 40
      },
      wraplogoText: {
        flex: 0,
        flexDirection: 'row',
        alignItems: 'center',
        margin: 15
      },
      logoText: {
        fontWeight: "bold",
      fontSize: 18,
      padding: 10,
      textAlign: 'center'
      },
      forYou: {
        backgroundColor: "#26FBDA",
        borderRadius: 20,
        width: 100
      },
      forYouText: {
      fontWeight: "bold",
      fontSize: 18,
      padding: 10,
      textAlign: 'center'
    },
    horizontal: {
        opacity: 0.1,
        backgroundColor: '#182E44',
        height: 2,
        marginTop: 20,
        width: 400
      },
      wrapImages: {
          flex: 0,
          flexDirection: 'row',
          backgroundColor: '#D8E1E8'
        },
      imgMain: {
        minHeight: 400,
        width: 230,
        margin: 5
      },
      imgSecondary: {
       maxHeight: 133,
       width: 180,
       margin: 5
      },
      wrapOption: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: 15
    },
      option: {
        justifyContent: 'flex-start',
        flexDirection:'row',
        alignItems: 'center',
      },
      optionItem: {
        marginLeft: 20
      },
      bottomBar: {
        justifyContent: 'space-around',
        flexDirection:'row',
        alignItems: 'center',
        padding: 15,
        backgroundColor: '#fff', 
       
    }
    
})