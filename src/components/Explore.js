import React from 'react'
import { View, Text, StyleSheet,SafeAreaView,ScrollView, Image, TextInput, Alert, TouchableOpacity } from 'react-native'
import IconGarder from '../assets/icons/garder.svg';
import IconLike from '../assets/icons/Like-Product Page.svg';
import IconShare from '../assets/icons/ShareTel.svg';
import IconHome from '../assets/icons/Home.svg';
import IconSearch from '../assets/icons/Search.svg';
import IconNotification from '../assets/icons/Notification.svg';
import IconProfile from '../assets/icons/Profile.svg';
import IconOutfits from '../assets/icons/Outfits.svg';
import IconCreate from '../assets/icons/Create.svg';
import IconBack from '../assets/icons/Back.svg';
import IconUpload from '../assets/icons/Share-outside.svg';
import {colors, scale} from '../styles';

export const Explore = ({title}) => {

    return (
        <View style={styles.container}>
          <SafeAreaView>
          <ScrollView>
            <View style={styles.topTab}>
                {/* <IconBack width={20} height={20} /> */}
                <TextInput placeholder = "     Search" style={styles.input} onChangeText={text => onChangeText(text)} />
            </View>
           
            <View>
            <Image style={styles.imgMainOne} source={require('../assets/image/MainPicture.png')} />
            <View style={styles.wraplogoText}>
               <Text style={styles.logoText}>Top Brands</Text>
                <Text >View All ></Text>   
            </View>
            
            <View style={{flexDirection:'row', justifyContent: 'space-evenly'}}>
            <ScrollView horizontal={true}>
            <Image style={styles.imgCarusel} source={require('../assets/image/Misspap.png')} />
            <Image style={styles.imgCarusel} source={require('../assets/image/Tommy.png')} />
            <Image style={styles.imgCarusel} source={require('../assets/image/Tommy.png')} />
            <Image style={styles.imgCarusel} source={require('../assets/image/Misspap.png')} />
            <Image style={styles.imgCarusel} source={require('../assets/image/Misspap.png')} />
            <Image style={styles.imgCarusel} source={require('../assets/image/Tommy.png')} />
            <Image style={styles.imgCarusel} source={require('../assets/image/Tommy.png')} />
            </ScrollView>
            </View>
            <View style={styles.wraplogoText}>
               <Text style={styles.logoText}>Whats New</Text>
                <Text >View All ></Text>   
            </View>   
            </View>
            <View style={styles.wrapImages}>
            <ScrollView horizontal={true}>
              <View>
                <Image style={styles.imgMain} source={require('../assets/image/Model-1.png')} />
                <View style={{marginLeft: 20}}>
                    <Text style={styles.bold}>$32</Text>  
                    <Text style={styles.bold}>Pretty Little Thing</Text>  
                    <Text style={styles.bold}>Red Blazer Dress</Text>  
                </View>
              </View>
              <View>
                <Image style={styles.imgMain} source={require('../assets/image/Model-2.png')} />
                <View style={{marginLeft: 20}}>
                    <Text style={styles.bold}>$60</Text>  
                    <Text style={styles.bold}>Lavish Alice</Text>  
                    <Text style={styles.bold}>Nudie Dress</Text>  
                </View>              
              </View>
              <View>
                <Image style={styles.imgMain} source={require('../assets/image/Model-1.png')} />
                <View style={{marginLeft: 20}}>
                    <Text style={styles.bold}>$32</Text>  
                    <Text style={styles.bold}>Pretty Little Thing</Text>  
                    <Text style={styles.bold}>Red Blazer Dress</Text>  
                </View>
              </View>
              </ScrollView>
            </View>
            <View style={styles.wraplogoText}>
               <Text style={styles.logoText}>Trending Now</Text>
                <Text >View All ></Text>   
            </View>  
            <View style={styles.wrapImages}>
            <ScrollView horizontal={true}>
              <View>
                <Image style={styles.imgMain} source={require('../assets/image/Model-4.png')} />
                <View style={{marginLeft: 20}}>
                    <Text style={styles.bold}>$32</Text>  
                    <Text style={styles.bold}>Pretty Little Thing</Text>  
                    <Text style={styles.bold}>Red Blazer Dress</Text>  
                </View>
              </View>
              <View>
                <Image style={styles.imgMain} source={require('../assets/image/Model-3.png')} />
                <View style={{marginLeft: 20}}>
                    <Text style={styles.bold}>$60</Text>  
                    <Text style={styles.bold}>Lavish Alice</Text>  
                    <Text style={styles.bold}>Nudie Dress</Text>  
                </View>              
              </View>
              <View>
                <Image style={styles.imgMain} source={require('../assets/image/Model-4.png')} />
                <View style={{marginLeft: 20}}>
                    <Text style={styles.bold}>$32</Text>  
                    <Text style={styles.bold}>Pretty Little Thing</Text>  
                    <Text style={styles.bold}>Red Blazer Dress</Text>  
                </View>
              </View>
              <View>
                <Image style={styles.imgMain} source={require('../assets/image/Model-2.png')} />
                <View style={{marginLeft: 20}}>
                    <Text style={styles.bold}>$60</Text>  
                    <Text style={styles.bold}>Lavish Alice</Text>  
                    <Text style={styles.bold}>Nudie Dress</Text>  
                </View>              
              </View>
              </ScrollView>
            </View>
            <View style={styles.wraplogoText}>
               <Text style={styles.logoText}>#LittleBlackDress</Text>
                <Text >View All ></Text>   
            </View>  
            <View style={styles.wrapImages}>
            <ScrollView horizontal={true}>
              <View>
                <Image style={styles.imgMain} source={require('../assets/image/Model-5.png')} />
                <View style={{marginLeft: 20}}>
                    <Text style={styles.bold}>$32</Text>  
                    <Text style={styles.bold}>Pretty Little Thing</Text>  
                    <Text style={styles.bold}>Red Blazer Dress</Text>  
                </View>
              </View>
              <View>
                <Image style={styles.imgMain} source={require('../assets/image/model.jpg')} />
                <View style={{marginLeft: 20}}>
                    <Text style={styles.bold}>$60</Text>  
                    <Text style={styles.bold}>Lavish Alice</Text>  
                    <Text style={styles.bold}>Nudie Dress</Text>  
                </View>              
              </View>
              <View>
                <Image style={styles.imgMain} source={require('../assets/image/Model-2.png')} />
                <View style={{marginLeft: 20}}>
                    <Text style={styles.bold}>$60</Text>  
                    <Text style={styles.bold}>Lavish Alice</Text>  
                    <Text style={styles.bold}>Nudie Dress</Text>  
                </View>              
              </View>
              </ScrollView>
            </View>
            <View style={styles.bottomBar}>
                <IconHome  width={25} height={30} />
                <IconSearch width={22} height={30} />
                <IconCreate  width={30} height={60} />
                <IconNotification width={25} height={30} />
                <IconProfile width={25} height={30} />
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
        margin: 10
      },
      topTab: {
        flex: 0,
        flexDirection: 'row',
        justifyContent: 'space-between',
        margin: 20,
        paddingTop: 10,
        alignItems: 'center'
      },
      imgCarusel: {
        margin: 5
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
        justifyContent: 'space-between'
      },
      logoText: {
        fontWeight: "bold",
      fontSize: 18,
      padding: 10,
      textAlign: 'center'
      },

      wrapImages: {
          flex: 0,
          flexDirection: 'row',
          height: scale(385),
        },
      imgMain: {
        width: scale(170),
        height: scale(260),
        margin: 5,
        borderRadius: 10
      },
      imgMainOne: {
        width: scale(390),
        height: scale(270),
        borderRadius: 10,
      },
      forYou: {
        backgroundColor: colors.mainBlue,
        borderRadius: 5,
        width: 150
      },
      forYouText: {
      fontWeight: "bold",
      fontSize: 18,
      padding: 10,
      textAlign: 'center'
    },
    input: {
        height: 55,
        borderColor: colors.white,
        borderWidth: 1,
        backgroundColor: colors.lightGray,
        color: colors.black,
        margin: 10,
        borderRadius: 12,
        width: scale(360),
    },
      imgSecondary: {
       maxHeight: 133,
       width: scale(180),
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