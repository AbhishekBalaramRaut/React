import React, { Component } from 'react';
import Layout from './hoc/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Checkout from './containers/Checkout/Checkout';
import  { Route, Switch, withRouter , Redirect} from 'react-router-dom';
import { connect } from 'react-redux';
import Orders from './containers/Orders/Orders';
import Auth from './containers/Auth/Auth';
import Logout from './containers/Auth/Logout';
import * as actionTypes from './store/actions/index';

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
      <Route path="/auth" component={Auth} />
      <Route path="/" exact component={BurgerBuilder} />
      <Redirect to="/" />
    </Switch>
    } else {
      routes = <Switch>
      <Route path="/checkout" component={Checkout} />
      <Route path="/orders" component={Orders} />
      <Route path="/auth" component={Auth} />
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