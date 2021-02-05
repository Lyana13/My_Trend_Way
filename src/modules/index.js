import { combineReducers, createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import ModMap from './map';

import loading, {isLoading} from './loading';
import auth, {authTypes} from './auth';
import user, {userTypes, setUserToken, gettingToken} from './user';//getUserData,
import {getUserToken} from '../utils/helpers';
// import items, {itemsTypes} from './items';


const reducers = combineReducers({
    'isLoading':loading,
    [ModMap.Auth]:auth,
    [ModMap.User]:user,
    // [ModMap.Items]:items,
});
// export default reducers;

const store = createStore(reducers, applyMiddleware(thunk));
// store.dispatch(getUserData());
export default store;

getUserToken()
    .then(token => {
        store.dispatch(setUserToken(token));
        store.dispatch(gettingToken(false));
    })


export { default as ModMap } from './map';
export { login, loginFB, loginAP, regStep1, regStep2_1, regStep2_2, regStep3, regStep4, regStep5, logout, restorePassword } from './auth';
export { getUser, updateUser } from './user';
// export { getPlaces, addPlace, getDevices, addDevice } from './items';
