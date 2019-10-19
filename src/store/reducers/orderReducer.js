import * as actionTypes from '../actions/actionTypes';
import {updateObject} from '../../shared/utility';

const INITIAL_STATE = {
    orders: [], 
    loading: false,
    purchased: false,
    error: null
}; 

const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7
}

const orderReducer = (state = INITIAL_STATE , action) => {
    switch (action.type) {
        case actionTypes.PURCHASE_BURGER_SUCCESS:
            const newOrder = updateObject(state,{
                id: action.orderId
            });
            return updateObject(state, {
                loading:false,
                purchased:true,
                orders: state.orders.concat(newOrder)
            })
            
        case actionTypes.PURCHASE_BURGER_FAILED:
            return updateObject(state, {loading: false});
        case actionTypes.PURCHASE_BURGER_INIT : 
            return updateObject(state, {loading: true});
        case actionTypes.PURCHASE_INIT : 
            return updateObject(state, {purchased: false});
        case actionTypes.ORDER_FETCH_SUCCESS:
            return updateObject(state, {
                loading:false,
                orders: action.orders,
                error: null});
  
        case actionTypes.ORDER_FETCH_FAILED:
            return updateObject(state, {error: action.error, loading: false});
  
        case actionTypes.ORDER_FETCH_START : 
            return updateObject(state, {loading: true,error: null});
        default:
            return state;
    }
}

export default orderReducer;
