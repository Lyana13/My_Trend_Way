import t from './types';
import { combineReducers } from 'redux';

const initialState = {
    loginSuccess: false,
    restorePassSuccess: false,
    registrationSuccess: false,
    userAuthData: {
        first_name: '',
        last_name: '',
        phone: '',
        code: '',
        email: '',
        username: '',
        password: '',
        password_confirmation: '',
    },
    userAuthTmp: {
        phoneNum: '',
        countryCode: 'GB'
    }
};

const authReducer = ( state = initialState, action ) => {
    switch (action.type) {
        case t.LOGIN_HAS_ERRORED:
            return {
                ...state,
                loginSuccess: !action.loginHasErrored,
                restorePassSuccess: false,
                registrationSuccess: false,
            };
        case t.LOGIN_SUCCESS:
            return {
                ...state,
                loginSuccess: action.loginSuccess,
                restorePassSuccess: false,
                registrationSuccess: false,
            };
        case t.RESTORE_SUCCESS:
            return {
                ...state,
                restorePassSuccess: action.restoreSuccess,
            };
        case t.REGISTRATION_SUCCESS:
            return {
                ...state,
                registrationSuccess: action.registrationSuccess,
            };
        case t.REG_STEP_1_SUCCESS:
            return {
                ...state,
                userAuthData: {
                    ...state.userAuthData,
                    first_name: action.first_name,
                    last_name: action.last_name,
                },
            };
        case t.REG_STEP_2_1_SUCCESS:
            return {
                ...state,
                userAuthData: {
                    ...state.userAuthData,
                    phone: action.phone,
                },
                userAuthTmp: {
                    ...state.userAuthTmp,
                    phoneNum: action.phoneNum,
                    countryCode: action.countryCode,
                }
            };
        case t.REG_STEP_2_2_SUCCESS:
            return {
                ...state,
                userAuthData: {
                    ...state.userAuthData,
                    code: action.code,
                },
            };
        case t.REG_STEP_3_SUCCESS:
            return {
                ...state,
                userAuthData: {
                    ...state.userAuthData,
                    email: action.email,
                },
            };
        case t.REG_STEP_4_SUCCESS:
            return {
                ...state,
                userAuthData: {
                    ...state.userAuthData,
                    username: action.username,
                },
            };
        case t.REG_STEP_5_SUCCESS:
            return {
                ...state,
                userAuthData: {
                    ...state.userAuthData,
                    password: action.password,
                    password_confirmation: action.password_confirmation,
                },
                loginSuccess: true,
                registrationSuccess: true
            };
        default:
            return state;
    }
};



function loginHasErrored(state = false, action) {
    switch (action.type) {
        case t.LOGIN_HAS_ERRORED:
            return action.loginHasErrored;
        default:
            return state;
    }
}

function loginSuccess(state = false, action) {
    switch (action.type) {
        case t.LOGIN_SUCCESS:
            return action.loginSuccess;
        default:
            return state;
    }
}

function restoreSuccess(state = false, action) {
    switch (action.type) {
        case t.RESTORE_SUCCESS:
            return action.restoreSuccess;
        default:
            return state;
    }
}

function registrationSuccess(state = false, action) {
    switch (action.type) {
        case t.REGISTRATION_SUCCESS:
            return action.registrationSuccess;
        default:
            return state;
    }
}


// const rootReducer = combineReducers({
//     loginHasErrored,
//     loginSuccess,
//     restoreSuccess,
//     registrationSuccess,
// });
//
// export default rootReducer;

export default authReducer;
