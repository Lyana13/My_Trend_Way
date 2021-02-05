import React, {useState, useEffect, useRef } from 'react';
import { TouchableWithoutFeedback, View, Animated, StyleSheet } from 'react-native';
import HeartFilled from '../../assets/icons/heartFilled.svg';
import {
  scale,
} from '../styles';
import useIsMount from './UseIsMount';

const DOUBLE_PRESS_DELAY = 300;

function animateLike(opacityValue, scaleValue) {
  Animated.timing(opacityValue, {
      toValue: 1,
      duration: 1
  }).start(() => {
      Animated.timing(scaleValue, {
          toValue: 2.2,
          duration: 300
      }).start(() => {
          Animated.timing(scaleValue, {
              toValue: 2.0,
              duration: 50
          }).start(() => {
              Animated.delay(100).start(() => {
                  Animated.stagger(250, [
                      Animated.timing(scaleValue, {
                          toValue: 1,
                          duration: 500
                      }).start(),
                      Animated.timing(opacityValue, {
                          toValue: 0,
                          duration: 250
                      }).start()
                  ])
              })
          })
      });
  })
}

function DoubleTapLike(props) {

    const isMount = useIsMount();

    const [liked, setLiked] = useState(false);
    const scaleValue = useRef(new Animated.Value(0)).current;
    const opacityValue = useRef(new Animated.Value(0)).current;

    useEffect(()=>{
      if(!isMount){
      props.onLike();
      animateLike(opacityValue, scaleValue)
    }
  },[liked])


    let lastTap = null;
    let handleDoubleTap = () => {
      const now = Date.now();
      if (lastTap && (now - lastTap) < DOUBLE_PRESS_DELAY) {
        setLiked(!liked)
      } else {
      lastTap = now;
      }
    }

    return (
      <View>
        <TouchableWithoutFeedback onPress={handleDoubleTap}>
          {props.children}
        </TouchableWithoutFeedback>
        <Animated.View
                            style={[s.heartLike, 
                            { transform: [{scale: scaleValue}], opacity: opacityValue, alignSelf: 'center' }
                            ]}>
                            <HeartFilled  width={scale(25)} height={scale(22)} color="red" />
                        </Animated.View>
      </View>
    );

    
};

const s = StyleSheet.create({
  heartLike: {
    position: "absolute",
    bottom: 300,
    left: 200,
    zIndex: 1
  },
})

export default DoubleTapLike;