import React from 'react'
import { View, Text, StyleSheet, ScrollView, SafeAreaView, ImageBackground, TextInput, Button,Image, Alert, TouchableOpacity } from 'react-native'

export const ProfileOutfits = ({title}) => {

    return (
        <View style={styles.containerEE} >
            <View style={styles.nickname} >
                <Text style={{fontWeight: 'bold', textAlign: 'center'}}>nickname</Text>
                <Image style={styles.goBAck} source={require('../assets/icons/menu.png')} />
            </View>
            <View style={styles.info} >
            <Image style={styles.goBAck} source={require('../assets/image/photo.jpg')} />
            <Image style={styles.goBAck} source={require('../assets/icons/vertical-line.png')} />
            <View >
                <Text style={styles.textProfile}>22 Outfits</Text>
                <Text style={styles.textProfile}>333 Followers</Text>
                <Text style={styles.textProfile}>222 Following</Text>
            </View>
            </View>

           
            <View style={styles.infoWrap}>
                <Text>Rachel Jackson</Text>
                <Text>22</Text>
                <Text>London</Text>
                <Text>Wishing it was always summer xx</Text>
            </View>
            <View style={styles.func}>
                <Image style={styles.iconFunc} source={require('../assets/icons/menu.png')} />
                <Image style={styles.iconFunc} source={require('../assets/icons/cloakroom.png')} />
                <Image style={styles.iconFunc} source={require('../assets/icons/cloakroom.png')} />
            </View>


            <SafeAreaView style={styles.container}>
            <ScrollView style={styles.scrollView}>
            <View style={styles.exampleWrap}>
                <View style={styles.example}>
                    <Image style={styles.exampleImg} source={require('../assets/image/example.jpeg')} />
                    <Image style={styles.exampleImg} source={require('../assets/image/example.jpeg')} />
                </View>
                <View style={styles.example}>
                    <Image style={styles.exampleImg} source={require('../assets/image/example.jpeg')} />
                    <Image style={styles.exampleImg} source={require('../assets/image/example.jpeg')} />
                </View>
                <View style={styles.example}>
                    <Image style={styles.exampleImg} source={require('../assets/image/example.jpeg')} />
                    <Image style={styles.exampleImg} source={require('../assets/image/example.jpeg')} />
                </View>
            </View>
            </ScrollView>
            </SafeAreaView>

            <View style={styles.bottomBar}>
                <Image style={styles.iconFunc} source={require('../assets/icons/menu.png')} />
                <Image style={styles.iconFunc} source={require('../assets/icons/cloakroom.png')} />
                <Image style={styles.iconFunc} source={require('../assets/icons/menu.png')} />
                <Image style={styles.iconFunc} source={require('../assets/icons/cloakroom.png')} />
                <Image style={styles.iconFunc} source={require('../assets/icons/cloakroom.png')} />
            </View>
        </View>
        
  
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        top: 50
      },
      containerEE: {
        margin: 20
      },
      nickname: {
        flexDirection: "row",
        justifyContent: 'center',
        alignItems: 'center'
      },
      info: {
        flexDirection: 'row',
        alignItems:'center',
        justifyContent: 'space-evenly',
        paddingLeft: 80,
        paddingRight: 80
      },
      textProfile: {
        fontSize: 17,
        
      },
      infoWrap: {
          paddingBottom: 15,
          paddingTop: 10
      },
      func: {
          flexDirection: 'row',
          justifyContent: 'space-evenly',
          alignItems:'center',
      },
      iconFunc: {
        width: 30,
        height: 30
      },
      exampleWrap: {
       
        
      },
      example: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems:'center',
    },
    exampleImg: {
        maxWidth: 200,
        maxHeight: 200,
        margin: 7
    },
    bottomBar: {
        justifyContent: 'space-between',
        flexDirection:'row',
        alignItems: 'center',
       padding: 10,
        position: 'relative',
        backgroundColor: '#fff',
        
    }

})
