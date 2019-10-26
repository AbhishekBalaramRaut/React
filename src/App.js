import React, { Component } from 'react';
import Layout from './hoc/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import  { Route, Switch, withRouter , Redirect} from 'react-router-dom';
import { connect } from 'react-redux';

import Logout from './containers/Auth/Logout';
import * as actionTypes from './store/actions/index';
import AsyncComponent from './hoc/asyncComponent/asyncComponent';


const asyncCheckout  = AsyncComponent(() => {
  return import('./containers/Checkout/Checkout');
});

const asyncOrders = AsyncComponent(() => {
  return import('./containers/Orders/Orders');
});

const asyncAuth  = AsyncComponent(() => {
  return import('./containers/Auth/Auth');
});


class App extends Component {

  // state = {
  //   show:true
  // }

  componentDidMount() {
    this.props.tryAutoAuthCheck();
  }

  render() {

    let routes = null;
    if(!this.props.isAuthenticated) {
      routes = <Switch>
      <Route path="/auth" component={asyncAuth} />
      <Route path="/" exact component={BurgerBuilder} />
      <Redirect to="/" />
    </Switch>
    } else {
      routes = <Switch>
      <Route path="/checkout" component={asyncCheckout} />
      <Route path="/orders" component={asyncOrders} />
      <Route path="/auth" component={asyncAuth} />
      <Route path="/logout" component={Logout} />
      <Route path="/" exact component={BurgerBuilder} />
      <Redirect to="/" />
      </Switch>
    }

    return (
      <div>
          <Layout>
            {/* <BurgerBuilder />
            <Checkout />  */}
              {routes}
          </Layout>
      </div>
    );
  }
}

const mapStateToProps = state => {

  return {
      isAuthenticated: state.auth.token != null
  };
};

const mapDispatchToProps = dispatch => {
  return {
    tryAutoAuthCheck: () => dispatch(actionTypes.authStateCheck())
  };
}; 

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(App));
