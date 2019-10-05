import * as actionTypes from './actionTypes';
import axios from './../../axios-orders';

export const purchaseBurgerSuccess = (id,orderData) => {
    return {
        type : actionTypes.PURCHASE_BURGER_SUCCESS,
        orderId: id,
        orderData: orderData
    }
}

export const purchaseBurgerFailed = (error) => {
    return {
        type : actionTypes.PURCHASE_BURGER_FAILED,
        error:error
    }
}

export const purchaseBurgerInit = () => {
    return {
        type : actionTypes.PURCHASE_BURGER_INIT,
        loading:true
    }
}

export const purchaseBurgerStart = (orderData) => {
    return dispatch => {
        dispatch(purchaseBurgerInit());
        axios.post('/orders.json',orderData)
        .then(response =>  {
        dispatch(purchaseBurgerSuccess(response.data.name, orderData));
           })
        .catch(error => {
            dispatch(purchaseBurgerFailed(error));
        });
    }
        
}

export const purchaseInit = () => {
    return {
        type : actionTypes.PURCHASE_INIT
    }
}

export const orderFetchFailed = (error) => {
    return {
        type : actionTypes.ORDER_FETCH_FAILED,
        error:error
    }
}

export const orderFetchSuccess = (orders) => {
    return {
        type : actionTypes.ORDER_FETCH_SUCCESS,
        loading:false,
        orders: orders
    }
}

export const ordersFetch = () => {
    return dispatch => {
        dispatch(orderFetchStart());
        axios.get('/orders.json')
        .then(res  => {
            const fetchedOrders = [];
            for(let key in res.data) {
                fetchedOrders.push({
                    ...res.data[key],
                    id: key});
            }
            dispatch(orderFetchSuccess(fetchedOrders));
        })
        .catch(error => {
            dispatch(orderFetchFailed(error));
        });
    }
        
}

export const orderFetchStart = () => {
    return {
        type : actionTypes.ORDER_FETCH_START
    }
}