import 'react-native-gesture-handler';
import React, {useState, useEffect} from 'react';
import {Platform, UIManager, StatusBar} from 'react-native';
import { CommonActions } from '@react-navigation/native';
import { NavigationContainer } from '@react-navigation/native';
import MainNavigator from './screens';
import {Provider} from 'react-redux';
import store from './modules';
import {colors} from './styles';
import OverlayLoader from './components/OverlayLoader';
import ModMap from './modules/map';

StatusBar.setBarStyle('dark-content');
if (Platform.OS === 'android'){
  // StatusBar.setBackgroundColor(colors.bgCategory);
  StatusBar.setBackgroundColor(colors.appBg);

  UIManager.setLayoutAnimationEnabledExperimental &&
  UIManager.setLayoutAnimationEnabledExperimental(true);
}


const App: () => React$Node = () => {
  let navigator;

  function onAuthStateChanged(state) {
    // console.log('!!! LISTENER : ' + JSON.stringify(store.getState()[ModMap.User]));//state
    // if(navigator) navigator.dispatch( CommonActions.navigate({ routeName: user ? 'App' : 'Auth' }) );
    // if(!user)store.dispatch({type:'RESET'});
  }

  useEffect(() => {
    return  store.subscribe(onAuthStateChanged);
  }, []);

  function refNavigator(iNavi) {
    navigator = iNavi;
  }

  return(
    <Provider store={store}>
      <NavigationContainer ref={refNavigator}>
        <MainNavigator/>
      </NavigationContainer>
      <OverlayLoader/>
    </Provider>
  );
};

export default App;
