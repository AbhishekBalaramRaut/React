import * as actionTypes from './actionTypes';
import axios from './../../axios-orders';

export const authStart = () => {
    return {
        type : actionTypes.AUTH_START
    }
}

export const authSuccess = (userId, token) => {
    return {
        type : actionTypes.AUTH_SUCCESS,
        userId: userId,
        idToken: token
    }
}

export const authFailed = (error) => {
    return {
        type : actionTypes.AUTH_FAILED,
        error: error
    }
}

export const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    localStorage.removeItem('expirationDate');
    return {
        type : actionTypes.LOG_OUT
    }
}

export const checkAuthAccess = (expirationTime) => {
    return dispatch => {
    setTimeout(() => {
        dispatch(logout());
    },expirationTime*1000);
    }
}

export const authInit = (email,password,isSignUp) => {
    return dispatch => {
        dispatch(authStart());
        const authData = {
            email:email,
            password: password,
            returnSecureToken:true
        }
        let url = "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCfNL8w5-o9SfxBWhUdJ_hI-H9KfavqzNE";
        if(!isSignUp) {
            url = "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCfNL8w5-o9SfxBWhUdJ_hI-H9KfavqzNE";
        }
     
        axios.post(url,authData)
        .then(response => {
            console.log(response);
            if(!response) {
                dispatch(authFailed("Something went wrong"))
            }
            if(response && response['data']) {
                const expirationTime = new Date(new Date().getTime() + response.data.expiresIn*1000);
                localStorage.setItem('token', response.data.idToken);
                localStorage.setItem('expirationDate',expirationTime);
                localStorage.setItem('userId',response.data.localId);
                dispatch(authSuccess(response.data.localId, response.data.idToken));
                dispatch(checkAuthAccess(response.data.expiresIn));
            }
        })
        .catch((error) => {
            dispatch(authFailed(error.response.data.error.message))``;  
        })

    }
}

export const setAuthRedirectPath = (path) => {
    return {
        type : actionTypes.SET_AUTH_REDIRECT_PATH,
        path: path
    }
}

export const authStateCheck = (path) => {
    return dispatch => {
        const token = localStorage.getItem('token');

        if(!token) {
             dispatch(logout());
        } else {
            const expirationDate = new Date(localStorage.getItem('expirationDate'));

            if(expirationDate > new Date()) {
                dispatch(logout());
            } else {
                const userId = localStorage.getItem('userId');
                dispatch(authSuccess(token,userId));
                dispatch(checkAuthAccess((expirationDate.getTime() - new Date().getTime()) /1000) );
            }
        }
    }
}