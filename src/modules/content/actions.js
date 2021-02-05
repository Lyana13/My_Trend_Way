import t from './types';
import {AccessToken, LoginManager} from 'react-native-fbsdk';
import {isLoading} from '../loading';
import {insert, showToast} from '../../utils/helpers';
import SETTINGS from '../../utils/settings';
import modMap from '../map';
import _ from 'lodash';

function regStepSuccess(iData, iType) {
    return {
        ...iData,
        type: iType,
    };
}


export const login = (iEmail, iPass) => dispatch => {
    dispatch(isLoading(true));

    const formData = new FormData();
    formData.append('email', iEmail);
    formData.append('password', iPass);

    return fetch(SETTINGS.REST_URL + '/auth/sign-up/login', {
        method: 'POST',
        headers: { Accept: 'application/json' },
        body: formData,
    })
        .then(response => response.json())
        .then(result => {
            console.log(' > > > LOGIN : ' + JSON.stringify(result))
            if(result.errors){
                dispatch(loginSuccess(false));
                showToast(`Login Failed\nInvalid email or password`);
            }else{
                dispatch(loginSuccess(true));
                dispatch(setUserToken(result.token));
            }
            dispatch(isLoading(false));
            return result;
        })
        .catch(error => {
            dispatch(isLoading(false));
            showToast(`Something went wrong :\n${ error.message }`);
        });
};

export const loginFB = () => dispatch => {
  dispatch(isLoading(true));

  LoginManager.logInWithPermissions(['public_profile', 'email'])
    .then(result => result.isCancelled ? Promise.reject(new Error('Sign in action cancelled')) : AccessToken.getCurrentAccessToken() )
    .then(data => {
            console.log('FACEBOOK : ' + JSON.stringify(data));
        // return firebase.auth().signInWithCredential( firebase.auth.FacebookAuthProvider.credential( data.accessToken ) )
    }
        )
    // .then(currentUser => {
    //   dispatch(loginSuccess(true));
    //   if(!currentUser.user.email)currentUser.user.updateEmail(currentUser.user.providerData[0].email);
    //   return currentUser;
    // })
    // .then(currentUser => {
    //   dispatch(isLoading(false));
    //   console.log("<<<<< USER : " + JSON.stringify(currentUser));
    //   if(currentUser.additionalUserInfo.isNewUser) dispatch(addUser(currentUser.user));
    // })
    .catch(error => {
      dispatch(isLoading(false));
      showToast(`Facebook login fail with error :\n${ error.message }}`);
    });
};


export const loginAP = () => dispatch => {
    dispatch(isLoading(true));

    appleAuth.performRequest({
        requestedOperation: AppleAuthRequestOperation.LOGIN,
        requestedScopes: [AppleAuthRequestScope.EMAIL, AppleAuthRequestScope.FULL_NAME],
    })
        .then(result => {
            console.log('APPLE : ' + JSON.stringify(result));
            // return result.identityToken ? firebase.auth().signInWithCredential(firebase.auth.AppleAuthProvider.credential(result.identityToken, result.nonce)) : Promise.reject(new Error('Sign in action cancelled'));
        })
        // .then(currentUser => {
        //     dispatch(loginSuccess(true));
        //     if(!currentUser.user.email)currentUser.user.updateEmail(currentUser.user.providerData[0].email);
        //     return currentUser;
        // })
        // .then(currentUser => {
        //     dispatch(isLoading(false));
        //     console.log("<<<<< USER : " + JSON.stringify(currentUser));
        //     if(currentUser.additionalUserInfo.isNewUser) dispatch(addUser(currentUser.user));
        // })
        .catch(error => {
            dispatch(isLoading(false));
            showToast(`Apple login fail with error :\n${ error.message }}`);
        });
}

export const regStep1 = (first_name, last_name) => dispatch => {
    dispatch(isLoading(true));

    const formData = new FormData();
    formData.append('first_name', first_name);
    formData.append('last_name', last_name);

    return fetch(SETTINGS.REST_URL + '/auth/sign-up/name', {
        method: 'POST',
        headers: { Accept: 'application/json' },
        body: formData,
    })
        .then(response => response.json())
        .then(result => {
            if(!result.errors) dispatch(regStepSuccess({first_name, last_name}, t.REG_STEP_1_SUCCESS))
            dispatch(isLoading(false));
            return result;
        })
        .catch(error => {
            dispatch(isLoading(false));
            showToast(`Something went wrong, please try again\n${ error.message }`);
        });
}


export const regStep2_1 = (phone, phoneNum, countryCode) => dispatch => {
    dispatch(isLoading(true));

    const formData = new FormData();
    formData.append('phone', phone);

    return fetch(SETTINGS.REST_URL + '/auth/sign-up/phone', {
        method: 'POST',
        headers: { Accept: 'application/json' },
        body: formData,
    })
        .then(response => response.json())
        .then(result => {
            if(result.errors){
                showToast(`Something went wrong :\n${ result.errors.phone[0] }`);
            }else{
                dispatch(regStepSuccess({phone, phoneNum, countryCode}, t.REG_STEP_2_1_SUCCESS))
            }
            dispatch(isLoading(false));
            return result;
        })
        .catch(error => {
            dispatch(isLoading(false));
            showToast(`Something went wrong, please try again\n${ error.message }`);
        });
}

export const regStep2_2 = (phone, code) => dispatch => {
    dispatch(isLoading(true));

    const formData = new FormData();
    formData.append('code', Number(code));
    formData.append('phone', phone);

    return fetch(SETTINGS.REST_URL + '/auth/sign-up/phone-verification', {
        method: 'POST',
        headers: { Accept: 'application/json' },
        body: formData,
    })
        .then(response => response.json())
        .then(result => {
            if(result.errors){
                showToast(`Something went wrong :\n${ result.errors.code[0] }`);
            }else{
                dispatch(regStepSuccess({phone, code}, t.REG_STEP_2_2_SUCCESS))
            }
            dispatch(isLoading(false));
            return result;
        })
        .catch(error => {
            dispatch(isLoading(false));
            showToast(`Something went wrong, please try again\n${ error.message }`);
        });
}

export const regStep3 = (email) => dispatch => {
    dispatch(isLoading(true));

    const formData = new FormData();
    formData.append('email', email);

    return fetch(SETTINGS.REST_URL + '/auth/sign-up/email', {
        method: 'POST',
        headers: { Accept: 'application/json' },
        body: formData,
    })
        .then(response => response.json())
        .then(result => {
            console.log('> > > > STEP 3 EMAIl : ' + JSON.stringify(result));
            if(result.errors) {
                showToast(`Something went wrong :\n${ result.errors.email[0] }`);
            }else{
                dispatch(regStepSuccess({email}, t.REG_STEP_3_SUCCESS));
            }
            dispatch(isLoading(false));
            return result;
        })
        .catch(error => {
            dispatch(isLoading(false));
            showToast(`Something went wrong, please try again\n${ error.message }`);
        });
}

export const regStep4 = (username) => dispatch => {
    dispatch(isLoading(true));

    const formData = new FormData();
    formData.append('username', username);

    return fetch(SETTINGS.REST_URL + '/auth/sign-up/username', {
        method: 'POST',
        headers: { Accept: 'application/json' },
        body: formData,
    })
        .then(response => response.json())
        .then(result => {
            if(result.errors) {
                showToast(`Something went wrong :\n${ result.errors.username[0] }`);
            }else{
                dispatch(regStepSuccess({username}, t.REG_STEP_4_SUCCESS))
            }
            dispatch(isLoading(false));
            return result;
        })
        .catch(error => {
            dispatch(isLoading(false));
            showToast(`Something went wrong, please try again\n${ error.message }`);
        });
}

export const regStep5 = (password, password_confirmation) => (dispatch, getState) => {
    let userData = getState()[modMap.Auth].userAuthData;
    dispatch(isLoading(true));

    const formData = new FormData();
    _.map(userData, (data, index) => {
        formData.append(index, data)
    });
    formData.append('password', password);
    formData.append('password_confirmation', password_confirmation);

    return fetch(SETTINGS.REST_URL + '/auth/sign-up/complete', {
        method: 'POST',
        headers: { Accept: 'application/json' },
        body: formData,
    })
        .then(response => response.json())
        .then(result => {
            if(!result.errors) dispatch(regStepSuccess({password, password_confirmation}, t.REG_STEP_5_SUCCESS))
            console.log('>> REG RESP : ' + JSON.stringify(result));
            dispatch(setUserToken(result.token));
            dispatch(isLoading(false));
            return result;
        })
        .catch(error => {
            dispatch(isLoading(false));
            showToast(`Something went wrong, please try again\n${ error.message }`);
        });
}


export const logout = () => dispatch => {
  dispatch(isLoading(true));
  // auth()
  //   .signOut()
  //   .then(() => {
  //     dispatch(isLoading(false));
  //     dispatch(clearUser());
  //   })
  //   .catch(error => {
  //     dispatch(isLoading(false));
  //     showToast(`Something went wrong :\n${ error.message }`);
  //   });
};


export function restorePassword(iMail) {
    return (dispatch) => {
        dispatch(isLoading(true));

        fetch(api + '?users')//'?email='+iMail
            .then((response) => {
                if (!response.ok) {
                    throw Error(response.statusText);
                }
                return response;
            })
            .then((response) => response.json())
            .then((data) => {
                // if(data.result){
                    dispatch(restoreSuccess(true));
                    dispatch(isLoading(false));
                // }
            })
            .catch(() => dispatch(loginHasErrored(true)));
    };
}
