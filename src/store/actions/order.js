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

export const purchaseBurgerStart = (orderData,token) => {
    return dispatch => {
        dispatch(purchaseBurgerInit());
        //?auth='+token
        axios.post('/orders.json?auth='+token,orderData)
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

export const ordersFetch = (token,userId) => {
    return dispatch => {
        // if(!token) {
            
        //     dispatch(orderFetchFailed("Your session has expired"));
        // } else {
         
        
        dispatch(orderFetchStart());
        //?auth='+token
        //axios.get('/orders.json/4.json')
        let queryParams = '?auth='+token+'&orderBy="userId"&equalTo="'+userId+'"';
        axios.get('/orders.json'+queryParams)
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
            dispatch(orderFetchFailed(error.response.data.error));
        });

       // }
    }
        
}

export const orderFetchStart = () => {
    return {
        type : actionTypes.ORDER_FETCH_START
    }
}