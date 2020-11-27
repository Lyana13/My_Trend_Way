import React from 'react'
import { View, Text, StyleSheet,SafeAreaView,ScrollView, Image, Alert, TouchableOpacity, TextInput } from 'react-native'
import IconFollow from '../assets/icons/Follow.svg';
import {colors, scale} from '../styles';


export const Comment = ({data}) => {
    return (
        <View>
          <SafeAreaView>
          <ScrollView>
          <View style={styles.categories}>
            <View style={styles.innerContainer}>
              <Image
                style={styles.imgProfile}
                source={{
                  uri: data.avatar,
                }}
              />
              <Text style={styles.titleName}>{data.name}</Text>
              <Text>{data.post}</Text>
            </View>
            
          </View>
        </ScrollView>
        </SafeAreaView>
      </View>
    )
}

const styles = StyleSheet.create({ 
  innerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  categories: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    margin: 3
  },  
  innerContainer: {
    flexDirection: 'row'
  }, 
  imgProfile: {
    width: 50,
    height: 50,
  },
  titleName: {
    fontWeight: "bold",
    fontSize: 18,
    paddingTop: 5,
    paddingBottom: 5,
    marginLeft: 20,
  },
  btn: {
    position: 'absolute',
    right: 0,
    marginTop: 5
  },
})