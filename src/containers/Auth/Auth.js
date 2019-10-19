import React, { Component } from 'react';
import Input from './../../components/UI/Input/Input';
import Button from './../../components/UI/Button/Button';
import * as classes from './Auth.css';
import { connect } from 'react-redux';
import withErrorHandler from './../../hoc/withErrorHandler/withErrorHandler';
import axios from './../../axios-orders';
import * as actionTypes from './../../store/actions/index';
import Spinner from './../../components/UI/Spinner/Spinner';
import { Redirect } from 'react-router-dom';
import  {updateObject , checkValidity} from './../../shared/utility';

class Auth extends Component {

    state={
        controls:{
            email: {
                elememtType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Enter Email'
                },
                value: 'a@g.com',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            password: {
                elememtType: 'input',
                elementConfig: {
                    type: 'password',
                    placeholder: 'Enter password'
                },
                value: '123123',
                validation: {
                    required: true,
                    minLength: 3
                },
                valid: false,
                touched: false
            },
            
        },
        formIsValid: true,
        isSignUp: false
    }

    componentDidMount() {
        if(!this.props.building && this.props.authRedirectPath != "/") {
            this.props.setAuthRedirectPath('/');
        }
    }

    inputChangeHandler = (event,identifierName) => {
 
        const updatedControls = updateObject(this.state.controls,{
            [identifierName]: updateObject(this.state.controls[identifierName],{
                value:event.target.value,
                touched: true,
                valid: checkValidity(event.target.value, this.state.controls[identifierName].validation)
            })
        })
                
        let formIsValid = true;
        for ( let inputIdentifier in updatedControls) {
            formIsValid = updatedControls[inputIdentifier].valid && formIsValid;
        }
        this.setState({controls:updatedControls,formIsValid: formIsValid});
    }

    authHandler = (event,key) => {
        event.preventDefault();
        this.props.onAuthInit(this.state.controls.email.value,this.state.controls.password.value,this.state.isSignUp);
    }

    signHandler = () => {
        this.setState(prevState => {
           return  {isSignUp:!prevState.isSignUp}
        });
    }

    render() {
        const formElementsArray = [];
        for (let key in this.state.controls) {
            formElementsArray.push({
                id: key,
                config: this.state.controls[key]
            });
        }

        let form = null;
        const notAuthenticated = this.props.isAuthenticated ? <Redirect to={this.props.authRedirectPath} /> : null
        if(this.props.loading) {
            form = <Spinner />;
        } else {
         form = formElementsArray.map(formElement => 
                          <Input
                                key={formElement.id}
                                 elementType={formElement.config.elememtType} 
                                 elementConfig={formElement.config.elementConfig}
                                 changed={(event) => this.inputChangeHandler(event,formElement.id)} 
                                 value={formElement.config.value}
                                 shouldValidate={formElement.config.validation}
                                 touched={formElement.config.touched}
                                 invalid={!formElement.config.valid} />    
                         );
         }
 
        let error = this.props.error ? <h4>{this.props.error}</h4> : null;
        return <div className={classes.Auth}>
                {notAuthenticated}
                    {error}
                <form onSubmit={this.authHandler}>
                         {form}
                    <Button btnType="Success" disabled={!this.state.formIsValid}> Submit</Button>
                    
                </form>
                <Button btnType="Danger" clicked={this.signHandler}>SWITCH TO {this.state.isSignUp ? 'SIGNIN' : 'SIGNUP'}</Button>
            </div>
    }
}

const mapStateToProps = state => {

    return {
        loading: state.auth.loading,
        isAuthenticated: state.auth.token != null,
        error: state.auth.error,
        building: state.burgerBuilder.building,
        authRedirectPath: state.auth.authRedirectPath
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onAuthInit: (email,password,isSignUp) => dispatch(actionTypes.authInit(email,password,isSignUp)),
        setAuthRedirectPath: (path) => dispatch(actionTypes.setAuthRedirectPath(path))
    };
}; 

export default connect(mapStateToProps,mapDispatchToProps)(Auth);