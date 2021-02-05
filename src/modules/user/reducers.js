import t from './types';
import {storeUserToken} from '../../utils/helpers';

const initialState = {
    userInvalidate: true,
    user: {
        uid: '',
        displayName: '',
        email: '',
        photoURL: '',
        phoneNumber: null,
        houses: 0,
        devices: 0,
    },
    receivedAt: null,
    userToken: '',
    gettingToken: true,
};

const userReducer = ( state = initialState, action ) => {
    switch (action.type) {
        case t.USER_INVALIDATE:
            storeUserToken('').then(r => {});
            return initialState;
        case t.USER_RECEIVE:
            return {
                ...state,
                userInvalidate: action.user === null,
                user: action.user,
                lastUpdated: action.receivedAt,
            };
        case t.USER_UPDATE_TOKEN:
            storeUserToken(action.userToken).then(r => {});
            return {
                ...state,
                userToken: action.userToken,
            };
        case t.USER_GETTING_TOKEN:
            return {
                ...state,
                gettingToken: action.gettingToken,
            };
        default:
            return state;
    }
};

export default userReducer
