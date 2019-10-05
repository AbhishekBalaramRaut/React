import React, { Component } from 'react';
import Order from './../../components/Order/Order';
import axios from '../../axios-orders';
import withErrorHandler from './../../hoc/withErrorHandler/withErrorHandler';
import { connect } from 'react-redux';
import * as actionTypes from '../../store/actions/index';
import Spinner from './../../components/UI/Spinner/Spinner';

class Orders extends Component {

    componentDidMount() {
       this.props.onFetchOrders();
    }

    render () {
        let orders = <Spinner />;
        let nonLoaderCode = this.props.orders.length === 0 ? 'No Orders': null
        if(!this.props.loading) {
            orders = (     
                this.props.orders.map(order => {
                  return  <Order key={order.id} 
                    ingredients={order.ingredients} 
                    price={order.price} />
                })
            );
         
        }
        return (<div>
            {nonLoaderCode}
            {orders}
        </div>);
    }
}

const mapStateToProps = state => {
 
    return {
        orders: state.order.orders,
        loading: state.order.loading
     };
 };
 
 const mapDispatchToProps = dispatch => {
     return {
         onFetchOrders: () => dispatch(actionTypes.ordersFetch())
     };
 };
 
 export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Orders, axios));

