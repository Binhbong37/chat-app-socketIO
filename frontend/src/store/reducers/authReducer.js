import {
    REGISTER_FAIL,
    REGISTER_SUCCESS,
    SUCCESS_MESSAGE_CLEAR,
    ERROR_CLEAR,
    USER_LOGIN_FAIL,
    USER_LOGIN_SUCCESS,
    LOGOUT_SUCCESS,
} from '../types/authType';
import deCodeToken from 'jwt-decode';

const authState = {
    loading: true,
    authenticate: false,
    error: '',
    successMessage: '',
    myInfo: '',
};

const tokenDecode = (token) => {
    const tokenDecoded = deCodeToken(token);
    const expTime = new Date(tokenDecoded.exp * 1000);
    if (new Date() > expTime) {
        return null;
    }
    return tokenDecoded;
};

const getToken = localStorage.getItem('authToken');
console.log({ getToken });
if (getToken) {
    const getInfo = tokenDecode(getToken);
    if (getInfo) {
        authState.myInfo = getInfo;
        authState.authenticate = true;
        authState.loading = false;
    }
}

export const authReducer = (state = authState, action) => {
    const { payload, type } = action;

    switch (type) {
        case REGISTER_FAIL:
        case USER_LOGIN_FAIL:
            return {
                ...state,
                error: payload.errorMess,
                authenticate: false,
                myInfo: '',
                loading: true,
            };
        case REGISTER_SUCCESS:
        case USER_LOGIN_SUCCESS:
            const myInfo = tokenDecode(payload.token);

            return {
                ...state,
                myInfo: myInfo,
                successMessage: payload.successMessage,
                error: '',
                authenticate: true,
                loading: false,
            };
        case SUCCESS_MESSAGE_CLEAR:
            return {
                ...state,
                successMessage: '',
            };
        case ERROR_CLEAR:
            return {
                ...state,
                error: '',
            };
        case LOGOUT_SUCCESS:
            return {
                ...state,
                authenticate: false,
                myInfo: '',
                successMessage: 'Logout Successfull',
            };

        default:
            return state;
    }
};
