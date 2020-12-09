import React, { useState,useRef, useEffect } from 'react';
import { Platform, Animated, Text, View, StyleSheet, Button, Image, TouchableOpacity } from "react-native";
import IconHeart from '../assets/icons/heart-regular.svg';
import {colors, scale} from '../styles';


function renderContext(currentTab){
  if(currentTab == 'likes'){
    return <Text>A</Text>
  }
  else if(currentTab == 'dislike'){
      return <Text>B</Text>
  }
}

export const InstagramHeartAnimation = ({title}) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const springValue = useRef(new Animated.Value(1)).current;
  const [currentTab, setCurrentTab] = useState('likes');
  const [liked, setLiked] = useState(false);
  const [visible,setVisible] = useState(false)

  useEffect(()=>{
    if(liked == true){
      Animated.spring(springValue,{
        toValue:2,
        friction:2
      }).start(()=>{
        Animated.spring(springValue,{
          toValue:1
        }).start(()=>{
          setVisible(false)
        })
      })
    }
  },[liked])

  const fadeIn = () => {
    // Will change fadeAnim value to 1 in 5 seconds
    Animated.sequence([
      // after decay, in parallel:
    
     
    Animated.spring(springValue, {
      toValue: 0,
      duration: 700
    }),
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 700
    }
  )
    ]).start(); 
  };

  const fadeOut = () => {
    // Will change fadeAnim value to 0 in 5 seconds
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 700
    }).start();
  };

  const springAnimation = () => {
    Animated.spring(springValue, {
      toValue: 1,
      friction: 9
    }).start();
  };

  return (
    <View style={styles.container}>
      {visible && <Animated.Image
        source={{
        uri:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTbySopxhYHbpzaomZQdtSfnC_u0Fo3fXECNQ&usqp=CAU',
        }}
        style={[styles.imgProfile, 
          { transform: [{scale: springValue}], alignSelf: 'center' }
        ]}>
      </Animated.Image>
}
      <TouchableOpacity onPress={()=> {
        setVisible(true)
        setLiked(!liked)
        }}>
        <Text>Animate</Text>
      </TouchableOpacity>
      
      <Image
        style={styles.imgProfile}
        source={{
        uri:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTbySopxhYHbpzaomZQdtSfnC_u0Fo3fXECNQ&usqp=CAU',
      }}
      /> 
      
      <Animated.View
        style={[
          styles.fadingContainer,
          {
            opacity: fadeAnim
          }
        ]}
      >
        <TouchableOpacity style={styles.wrapLike} onPress={() => setCurrentTab('likes')}>
        <IconHeart  style={{color: currentTab == 'likes' ? 'red' : '#000', ...styles.icon}} width={60} height={60} />
      </TouchableOpacity>
      {renderContext(currentTab)}
      </Animated.View>
      <View style={styles.buttonRow}>
        <Button title="like" onPress={fadeIn} />
        <Button title="dislike" onPress={fadeOut} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  fadingContainer: {
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  buttonRow: {
    flexDirection: "row",
    marginVertical: 16
  },
  imgProfile: {
    width:scale(410),
    height:scale(220)
  },
  icon:{
    position: 'relative',
    bottom: scale(140),
    zIndex: 1
  }
});
