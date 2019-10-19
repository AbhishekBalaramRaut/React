import React, { Component } from 'react';
import Order from './../../components/Order/Order';
import axios from '../../axios-orders';
import withErrorHandler from './../../hoc/withErrorHandler/withErrorHandler';
import { connect } from 'react-redux';
import * as actionTypes from '../../store/actions/index';
import Spinner from './../../components/UI/Spinner/Spinner';

class Orders extends Component {

    componentDidMount() {
        // if(!this.props.token) {
        //     this.props.history.push('/auth');
        // }
       this.props.onFetchOrders(this.props.token,this.props.userId);
    }

    loginHandler = () => {
        this.props.history.push('/auth');
    }

    render () {
        let orders = <Spinner />;
        let nonLoaderCode  =null;
        let loginLink = null;

        if(this.props.error) {
            nonLoaderCode = this.props.error;
        } else {
            nonLoaderCode = this.props.orders.length === 0 ? 'No Orders': null;
        }
        
        if(!this.props.token) {
            loginLink = <button name="toLogin" onClick={this.loginHandler}>Click to Login</button>
        }
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
            {loginLink}
        </div>);
    }
}

const mapStateToProps = state => {
 
    return {
        orders: state.order.orders,
        loading: state.order.loading,
        token: state.auth.token,
        error: state.order.error,
        userId: state.auth.userId
     };
 };
 
 const mapDispatchToProps = dispatch => {
     return {
         onFetchOrders: (token,userId) => dispatch(actionTypes.ordersFetch(token,userId))
     };
 };
 
 export default connect(mapStateToProps, mapDispatchToProps)(Orders);

