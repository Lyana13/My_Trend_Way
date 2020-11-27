import React from 'react'
import { View, Text, StyleSheet,SafeAreaView,ScrollView, Image, Alert, TouchableOpacity, TextInput } from 'react-native'
import IconOutfits from '../assets/icons/Outfits.svg';
import IconCreate from '../assets/icons/Create.svg';
import IconProfile from '../assets/icons/Profile.svg';
import { Like } from './Like' 
import {colors, scale} from '../styles';

let likes = [
  {
    avatar: 'https://reactnative.dev/img/tiny_logo.png',
    name: 'Lilly.james2'
  },
  {
    avatar: 'https://reactnative.dev/img/tiny_logo.png',
    name: 'Trendway_777'
  }
]
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
            {likes.map((like) => 
                <Like data={like}  />
              )}
          
          </View>
          </View>

        </ScrollView>
        </SafeAreaView>
      </View>
    )
}

const styles = StyleSheet.create({
      wrapContainer: {
        flexDirection: 'column',
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