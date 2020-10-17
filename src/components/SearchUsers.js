


import React from 'react'
import { View, Text, StyleSheet,SafeAreaView,ScrollView, Image, Alert, TouchableOpacity, TextInput } from 'react-native'
import IconGarder from '../assets/icons/garder.svg';
import IconLike from '../assets/icons/Like-Product Page.svg';
import IconShare from '../assets/icons/ShareTel.svg';
import IconOutfits from '../assets/icons/Outfits.svg';
import IconCreate from '../assets/icons/Create.svg';
import IconPlusPeople from '../assets/icons/IconPlusPeople.svg';
import IconHeart from '../assets/icons/heart-regular.svg';
import IconBack from '../assets/icons/Back.svg';
import IconUpload from '../assets/icons/Share-outside.svg';
import IconShareOutside from '../assets/icons/Share-outside.svg';
import {colors, scale} from '../styles';


export const SearchUsers = ({title}) => {
    return (
        <View>
          <SafeAreaView>
          <ScrollView>
          <View style={styles.topTab}>
              <TextInput placeholder = "     Search" style={styles.input} onChangeText={text => onChangeText(text)} />
          </View>
          <View style={styles.categories}>
            <IconOutfits  width={25} height={60} />
            <IconHeart  width={30} height={60} />
            <IconCreate  width={30} height={60} />
          </View>
          <View style={styles.wrapColor}>
            <View style={styles.wrapContainer}>
            <View style={styles.innerContainer}>
              <Image style={styles.imgProfile} source={require('../assets/image/users.png')} />
              <Text style={styles.titleName}>Lilly.james2</Text>
            </View>
            <View style={styles.btn}>
              <IconShareOutside width={25} height={60} />
            </View>
          </View>
          <View style={styles.wrapContainer}>
            <Image style={styles.img} source={require('../assets/image/search.png')} />
            <View style={{marginLeft: 20}}>
              <Text style={styles.bold}>42 Outfits</Text>  
              <Text style={styles.bold}>45 Followers</Text>  
              <Text style={styles.bold}>132 Following</Text>  
            </View>
            </View>
          </View>   

           <View style={styles.wrapColor}>
            <View style={styles.wrapContainer}>
            <View style={styles.innerContainer}>
              <Image style={styles.imgProfile} source={require('../assets/image/users.png')} />
              <Text style={styles.titleName}>Lilly.james2</Text>
            </View>
            <View style={styles.btn}>
              <IconShareOutside width={25} height={60} />
            </View>
          </View>
          <View style={styles.wrapContainer}>
            <Image style={styles.img} source={require('../assets/image/search.png')} />
            <View style={{marginLeft: 20}}>
              <Text style={styles.bold}>42 Outfits</Text>  
              <Text style={styles.bold}>45 Followers</Text>  
              <Text style={styles.bold}>132 Following</Text>  
            </View>
            </View>
          </View>  

           <View style={styles.wrapColor}>
            <View style={styles.wrapContainer}>
            <View style={styles.innerContainer}>
              <Image style={styles.imgProfile} source={require('../assets/image/users.png')} />
              <Text style={styles.titleName}>Lilly.james2</Text>
            </View>
            <View style={styles.btn}>
              <IconShareOutside width={25} height={60} />
            </View>
          </View>
          <View style={styles.wrapContainer}>
            <Image style={styles.img} source={require('../assets/image/search.png')} />
            <View style={{marginLeft: 20}}>
              <Text style={styles.bold}>42 Outfits</Text>  
              <Text style={styles.bold}>45 Followers</Text>  
              <Text style={styles.bold}>132 Following</Text>  
            </View>
            </View>
          </View>  

           <View style={styles.wrapColor}>
            <View style={styles.wrapContainer}>
            <View style={styles.innerContainer}>
              <Image style={styles.imgProfile} source={require('../assets/image/users.png')} />
              <Text style={styles.titleName}>Lilly.james2</Text>
            </View>
            <View style={styles.btn}>
              <IconShareOutside width={25} height={60} />
            </View>
          </View>
          <View style={styles.wrapContainer}>
            <Image style={styles.img} source={require('../assets/image/search.png')} />
            <View style={{marginLeft: 20}}>
              <Text style={styles.bold}>42 Outfits</Text>  
              <Text style={styles.bold}>45 Followers</Text>  
              <Text style={styles.bold}>132 Following</Text>  
            </View>
            </View>
          </View>    
        </ScrollView>
        </SafeAreaView>
      </View>
    )
}

const styles = StyleSheet.create({
      wrapContainer: {
        flexDirection: 'row',
      },
      wrapColor: {
        backgroundColor: colors.lightGray2,
        margin: 10
      },  
      innerContainer: {
        flexDirection: 'row'
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
      categories: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems:'center',
    },  
      titleName: {
        fontWeight: "bold",
        fontSize: 18,
        paddingTop: 5,
        paddingBottom: 5,
        marginLeft: 20
      },
      btn: {
        marginLeft: 170,
        marginTop: 10
      },
      bold: {
        fontWeight: "bold",
        fontSize: 16,
        paddingTop: 5,
        paddingBottom: 5,
      },
      textPadding: {
        paddingTop: 5,
        paddingBottom: 5
      },
     
      logoText: {
        fontWeight: "bold",
      fontSize: 18,
      padding: 10,
      textAlign: 'center'
      },

     
      imgMainOne: {
        width: scale(410),
        height: scale(750),
      },
      forYou: {
        backgroundColor: colors.mainBlue,
        borderRadius: 5,
        width: 150
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
       img: {
        width: scale(100),
        height: scale(100),
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
          marginTop: 120
      }
})