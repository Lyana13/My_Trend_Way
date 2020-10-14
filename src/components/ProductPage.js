import React from 'react'
import { View, Text, StyleSheet,SafeAreaView,ScrollView, Image, Alert, TouchableOpacity } from 'react-native'
import IconGarder from '../assets/icons/garder.svg';
import IconLike from '../assets/icons/Like-Product Page.svg';
import IconShare from '../assets/icons/ShareTel.svg';
import IconBack from '../assets/icons/Back.svg';
import IconUpload from '../assets/icons/Share-outside.svg';
import {colors, scale} from '../styles';

export const ProductPage = ({title}) => {

    return (
        <View style={styles.container}>
          <SafeAreaView>
          <ScrollView>
            <View style={styles.topTab}>
                <IconBack width={20} height={20} />
                <TouchableOpacity onPress={() => { console.log('You tapped the Decrypt button!'); }} onPress={() => Alert.alert('Button with adjusted color pressed')}>
                    <Text style={styles.forYouText}>Boohoo.com</Text>
                </TouchableOpacity >
                <IconUpload width={20} height={20} />
            </View>
            <View style={styles.wraplogoText}>
                <Image style={styles.imgProfile} source={require('../assets/icons/brand.jpg')} />
                <Text style={styles.logoText}>Trendway</Text>   
            </View>
            <View>
            <Image style={styles.imgMainOne} source={require('../assets/image/model.png')} />
            <View style={{margin: 20}}>
              <Text style={styles.bold}>Lace Floral Evening Dress</Text>
              <Text style={styles.bold}>$18.99</Text>
              <Text>Lorem ipsum dolor sit amet, consectetur adipiscing elit, 
              sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
              Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris 
              nisi ut aliquip ex ea commodo consequat. </Text>
              </View>
              <View style={styles.wrapOption}>
            <View style={styles.option}>
                <IconGarder style={styles.optionItem} width={40} height={40} />
                <IconLike  style={styles.optionItem} width={40} height={40} />
                <IconShare style={styles.optionItem} width={40} height={40} />
            </View>
            <View>
                <TouchableOpacity style={styles.forYou} onPress={() => { console.log('You tapped the Decrypt button!'); }} onPress={() => Alert.alert('Button with adjusted color pressed')}>
                    <Text style={styles.forYouText}>Buy</Text>
                </TouchableOpacity >
            </View>
            </View>
            </View>
            <View style={styles.wraplogoText}>
                <Text style={styles.logoText}>SIMILAR</Text>
                <Text style={styles.logoText}>STYLED WITH</Text>
            </View>
            <View style={styles.wrapImages}>
              <ScrollView style={{height:800}} horizontal={true}>
              <View>
                <Image style={styles.imgMain} source={require('../assets/image/model.png')} />
                <View style={{marginLeft: 20}}>
                    <Text style={styles.bold}>$32</Text>  
                    <Text style={styles.bold}>Pretty Little Thing</Text>  
                    <Text style={styles.bold}>Black Dress</Text>  
                </View>
              </View>
              <View>
                <Image style={styles.imgMain} source={require('../assets/image/model.png')} />
                <View style={{marginLeft: 20}}>
                    <Text style={styles.bold}>$32</Text>  
                    <Text style={styles.bold}>Pretty Little Thing</Text>  
                    <Text style={styles.bold}>Black Dress</Text>  
                </View>
              </View>
              <View>
                <Image style={styles.imgMain} source={require('../assets/image/model.png')} />
                <View style={{marginLeft: 20}}>
                    <Text style={styles.bold}>$32</Text>  
                    <Text style={styles.bold}>Pretty Little Thing</Text>  
                    <Text style={styles.bold}>Black Dress</Text>  
                </View>              
              </View>
              </ScrollView>
            </View>    
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
        flex: 0,
        flexDirection: 'row',
        justifyContent: 'space-between',
        margin: 20,
        paddingTop: 10,
        alignItems: 'center'
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
          height: scale(445),
        },
      imgMain: {
        width: scale(210),
        height: scale(430),
        margin: 5,
        borderRadius: 20
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
      forYouText: {
      fontWeight: "bold",
      fontSize: 18,
      padding: 10,
      textAlign: 'center'
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
          marginTop: 120
      }
})