import * as actionTypes from '../actions/actionTypes';
import  {updateObject} from '../../shared/utility';

const INITIAL_STATE = {
   token: null,
   userId: null,
   error: null,
   loading: false,
   authRedirectPath: '/'
}; 

const authReducer = (state = INITIAL_STATE , action) => {
    switch (action.type) {
        case actionTypes.AUTH_START:
            return updateObject(state,{
                error:null,
                loading:true
            });
            
        case actionTypes.AUTH_FAILED:
 
            return updateObject(state,{
                error:action.error,
                loading:false
            });
  
        case actionTypes.AUTH_SUCCESS : 
            return updateObject(state,{
                userId: action.userId,
                error:null,
                token: action.idToken,
                loading:false
            });
        case actionTypes.LOG_OUT:
 
            return updateObject(state,{
                userId:null,
                token:null
            });
        case actionTypes.SET_AUTH_REDIRECT_PATH:
 
            return updateObject(state,{
                authRedirectPath:action.path
            });
        default:
            return state;
    }
}

export default authReducer;
