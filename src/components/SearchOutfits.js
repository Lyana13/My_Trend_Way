
import React from 'react'
import { View, Text, StyleSheet,SafeAreaView,ScrollView, Image, Alert, TouchableOpacity } from 'react-native'
import IconGarder from '../assets/icons/garder.svg';
import IconLike from '../assets/icons/Like-Product Page.svg';
import IconShare from '../assets/icons/ShareTel.svg';
import IconOutfits from '../assets/icons/Outfits.svg';
import IconCreate from '../assets/icons/Create.svg';
import IconPlusPeople from '../assets/icons/IconPlusPeople.svg';
import IconHeart from '../assets/icons/heart-regular.svg';
import IconBack from '../assets/icons/Back.svg';
import IconUpload from '../assets/icons/Share-outside.svg';
import IconFilter from '../assets/icons/Filter.svg';
import {colors, scale} from '../styles';
import IconHome from '../assets/icons/Home.svg';
import IconSearch from '../assets/icons/Search.svg';
import IconNotification from '../assets/icons/Notification.svg';
import IconProfile from '../assets/icons/Profile.svg';


export const SearchOutfits = ({title}) => {

    return (
        <View style={styles.container}>
          <SafeAreaView>
          <ScrollView>
            <View style={styles.wrapImages}>
              <View style={{flex: 0, flexDirection: 'column'}}>
                <Image style={styles.imgSecondary} source={require('../assets/image/example.jpeg')} />
                <Image style={styles.imgSecondary} source={require('../assets/image/example.jpeg')} />
              </View>
              <View>
                <Image style={styles.imgMain} source={require('../assets/image/example2.jpeg')} />
              </View>
            </View>

            <View style={{flex: 0, flexDirection: 'row'}}>
              <Image style={styles.imgSecondary} source={require('../assets/image/example.jpeg')} />
              <Image style={styles.imgSecondary} source={require('../assets/image/example.jpeg')} />
              <Image style={styles.imgSecondary} source={require('../assets/image/example.jpeg')} />
            </View>

            <View style={styles.wrapImages}>
            <View>
                <Image style={styles.imgMain} source={require('../assets/image/example2.jpeg')} />
              </View>
              <View style={{flex: 0, flexDirection: 'column'}}>
                <Image style={styles.imgSecondary} source={require('../assets/image/example.jpeg')} />
                <Image style={styles.imgSecondary} source={require('../assets/image/example.jpeg')} />
              </View>
            </View>

            <View style={styles.wrapImages}>
              <View style={{flex: 0, flexDirection: 'column'}}>
                <Image style={styles.imgSecondary} source={require('../assets/image/example.jpeg')} />
                <Image style={styles.imgSecondary} source={require('../assets/image/example.jpeg')} />
              </View>
              <View>
                <Image style={styles.imgMain} source={require('../assets/image/example2.jpeg')} />
              </View>
            </View>

            <View style={{flex: 0, flexDirection: 'row'}}>
              <Image style={styles.imgSecondary} source={require('../assets/image/example.jpeg')} />
              <Image style={styles.imgSecondary} source={require('../assets/image/example.jpeg')} />
              <Image style={styles.imgSecondary} source={require('../assets/image/example.jpeg')} />
            </View>

            <View style={styles.wrapImages}>
            <View>
                <Image style={styles.imgMain} source={require('../assets/image/example2.jpeg')} />
              </View>
              <View style={{flex: 0, flexDirection: 'column'}}>
                <Image style={styles.imgSecondary} source={require('../assets/image/example.jpeg')} />
                <Image style={styles.imgSecondary} source={require('../assets/image/example.jpeg')} />
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
      bold: {
        fontWeight: "bold",
        fontSize: 16,
        paddingTop: 5,
        paddingBottom: 5
      },
      textPadding: {
        paddingTop: 5,
        paddingBottom: 5
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
        backgroundColor: colors.mainBlue,
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
        height: scale(2),
        marginTop: 20,
        width: scale(400)
      },
      wrapImages: {
          flexDirection: 'row',
          height: scale(255)
        },
      imgMain: {
        width: scale(250),
        height: scale(250),
      },
      imgMainOne: {
        width: scale(210),
        height: scale(350),
      },
      imgSecondary: {
       maxHeight: 110,
       width: scale(110),
       margin: 5
      },
      imgSecondaryTwo: {
        maxHeight: 133,
        width: scale(100),
        margin: 5
       },
       imgSecondaryThree: {
        maxHeight: 133,
        width: scale(70),
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
        marginLeft: 10
      },
      bottomBar: {
        justifyContent: 'space-around',
        flexDirection:'row',
        alignItems: 'center',
        padding: 15,
        backgroundColor: '#fff', 
    }
    
})
