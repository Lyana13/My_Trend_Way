import types from './types';
import modMap from '../map';
import AsyncStorage from '@react-native-community/async-storage';
// import firestore from '@react-native-firebase/firestore';
// import auth from '@react-native-firebase/auth';
import t from "../auth/types";
import {isLoading} from '../loading';
import {showToast} from '../../utils/helpers';


function userReceive(iData) {
    console.log('userReceive !!!');
    return {
        type: types.USER_RECEIVE,
        user: iData,
        receivedAt: Date.now(),
    };
}

export const gettingToken = (iValue) => (dispatch) => {
    dispatch({ type: types.USER_GETTING_TOKEN, gettingToken: iValue });
}

export const setUserToken = (iToken) => (dispatch) => {
    dispatch({ type: types.USER_UPDATE_TOKEN, userToken: iToken });
};

export const clearUser = () => (dispatch) => {
    dispatch({ type: types.USER_INVALIDATE });
};

export const getUser = () => (dispatch, getState) => {
    if (getState()[modMap.User].user.uid !== ''){
        Promise.resolve();
    } else {
        dispatch(isLoading(true));

        // firestore().collection('users').doc(auth().currentUser.uid)
        //   .get()
        //   .then((user) => {
        //       console.log('USER : ' + JSON.stringify(user.data()));
        //       dispatch(userReceive(user.data()));
        //       dispatch(isLoading(false));
        //   })
        //   .catch(error => {
        //       dispatch(isLoading(false));
        //       showToast(`Something went wrong, please try again\n${ error.message }`);
        //   });
    }
};


export const addUser = ({uid, displayName, email, photoURL, phoneNumber}) => dispatch => {
    dispatch(isLoading(true));

    const userCredentials = {displayName, email, photoURL, phoneNumber, houses: 0, devices: 0 };
    // firestore().collection('users').doc(uid).set(userCredentials)
    //   .then(() => {
    //       dispatch(userReceive({uid, ...userCredentials}));
    //       dispatch(isLoading(false));
    //   })
    //   .catch(error => {
    //       dispatch(isLoading(false));
    //       showToast(`Something went wrong, please try again\n${ error.message }`);
    //   });
};


export const updateUser = ({displayName, email, photoURL, phoneNumber, houses, devices}) => (dispatch, getState) => {
    dispatch(isLoading(true));

    let userCredentials = {};
    if(displayName) userCredentials.displayName = displayName;
    if(email) userCredentials.email = email;
    if(photoURL) userCredentials.photoURL = photoURL;
    if(phoneNumber) userCredentials.phoneNumber = phoneNumber;
    if(houses) userCredentials.houses = houses;
    if(devices) userCredentials.devices = devices;

    // firestore().collection('users').doc(auth().currentUser.uid).update(userCredentials)
    //   .then(() => {
    //       dispatch(userReceive({...getState()[modMap.User].user, ...userCredentials}));
    //       dispatch(isLoading(false));
    //   })
    //   .catch(error => {
    //       dispatch(isLoading(false));
    //       showToast(`Something went wrong, please try again\n${ error.message }`);
    //   });
};
