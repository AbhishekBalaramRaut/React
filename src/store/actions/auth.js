import * as actionTypes from './actionTypes';
import axios from './../../axios-orders';

export const authStart = () => {
    return {
        type : actionTypes.AUTH_START
    }
}

export const authSuccess = (authData) => {
    return {
        type : actionTypes.AUTH_SUCCESS,
        authData: authData
    }
}

export const authFailed = (error) => {
    return {
        type : actionTypes.AUTH_FAILED,
        error: error
    }
}

export const authInit = (email,password) => {
    return dispatch => {
        dispatch(authStart());
    }
}