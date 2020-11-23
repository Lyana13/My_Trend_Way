import React from 'react'
import { View, Text, StyleSheet,SafeAreaView,ScrollView, Image, Alert, TouchableOpacity, TextInput } from 'react-native'
import IconOutfits from '../assets/icons/Outfits.svg';
import IconCreate from '../assets/icons/Create.svg';
import IconProfile from '../assets/icons/Profile.svg';
import IconFollow from '../assets/icons/Follow.svg';
import {colors, scale} from '../styles';

export const Likes = ({title}) => {
    return (
        <View>
          <SafeAreaView>
          <ScrollView>
          <View style={styles.topTab}>
              <TextInput placeholder = "     Search" style={styles.input} onChangeText={text => onChangeText(text)} />
          </View>
          <View style={styles.categories}>
            <IconOutfits style={styles.categoriesItem}  width={25} height={60} />
            <IconCreate  style={styles.categoriesItem} width={30} height={60} />
            <IconProfile style={styles.categoriesItem}  width={30} height={60} />
          </View>
          <View style={styles.wrapColor}>
            <View style={styles.wrapContainer}>
            <View style={styles.innerContainer}>
              <Image style={styles.imgProfile} source={require('../assets/image/users.png')} />
              <Text style={styles.titleName}>Lilly.james2</Text>
            </View>
            <View style={styles.btn}>
              <IconFollow width={25} height={30} />
            </View>
          </View>
          </View>

          <View style={styles.wrapColor}>
            <View style={styles.wrapContainer}>
            <View style={styles.innerContainer}>
              <Image style={styles.imgProfile} source={require('../assets/image/users.png')} />
              <Text style={styles.titleName}>ruben_02</Text>
            </View>
            <View style={styles.btn}>
              <IconFollow width={25} height={30} />
            </View>
          </View>
          </View>

          <View style={styles.wrapColor}>
            <View style={styles.wrapContainer}>
            <View style={styles.innerContainer}>
              <Image style={styles.imgProfile} source={require('../assets/image/users.png')} />
              <Text style={styles.titleName}>trendway_123</Text>
            </View>
            <View style={styles.btn}>
              <IconFollow width={25} height={30} />
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
        padding: 15
      },  
      innerContainer: {
        flexDirection: 'row'
      },  
      input: {
        height: 55,
        borderColor: colors.white,
        backgroundColor: colors.lightGray,
        color: colors.black,
        margin: 10,
        borderRadius: 12,
        width: '100%',
        marginBottom: -30
    },
      categories: {
        flexDirection: 'row',
        justifyContent: 'center'
    },  
      categoriesItem: {
        marginLeft: 20,
        marginRight: 20
    },
      titleName: {
        fontWeight: "bold",
        fontSize: 18,
        paddingTop: 5,
        paddingBottom: 5,
        marginLeft: 20
      },
      btn: {
        marginLeft: scale(350),
        marginTop: 5,
        position: 'absolute'
      },
      text: {
        fontSize: 18,
        paddingTop: 5,
        paddingBottom: 5,
      },
       img: {
        width: scale(100),
        height: scale(100),
       },
      bottomBar: {
          marginTop: 120
      }
})