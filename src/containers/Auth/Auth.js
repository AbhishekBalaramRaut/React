import React, { Component } from 'react';
import Input from './../../components/UI/Input/Input';
import Button from './../../components/UI/Button/Button';
import * as classes from './Auth.css';
import { connect } from 'react-redux';
import withErrorHandler from './../../hoc/withErrorHandler/withErrorHandler';
import axios from './../../axios-orders';
import * as actionTypes from './../../store/actions/index';

class Auth extends Component {

    state={
        controls:{
            email: {
                elememtType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Enter Email'
                },
                value: '',
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
                value: '',
                validation: {
                    required: true,
                    minLength: 7
                },
                valid: false,
                touched: false
            },
            
        },
        formIsValid: false
    }

    checkValidity = (value,rules) => {
        let isValid = true;

        if(!rules) {
            return true;
        }

        if(rules.required) {
            isValid = value.trim() !== ''  && isValid;
        }

        if(rules.minLength) {
            isValid = value.trim().length > 7  && isValid;
        }

        return isValid;
    }

    inputChangeHandler = (event,identifierName) => {
        const updatedControls = {
            ...this.state.controls,
            [identifierName] : {
                ...this.state.controls[identifierName],
                value:event.target.value,
                touched:true,
                valid: this.checkValidity(event.target.value,this.state.controls[identifierName].validation)
            }
        }
                
        let formIsValid = true;
        for ( let inputIdentifier in updatedControls) {
            formIsValid = updatedControls[inputIdentifier].valid && formIsValid;
        }
        this.setState({controls:updatedControls,formIsValid: formIsValid});
    }

    authHandler = (event,key) => {
        event.preventDefault();
        this.props.onAuthInit(this.state.controls.email.value,this.state.controls.password.value);
    }

    render() {
        const formElementsArray = [];
        for (let key in this.state.controls) {
            formElementsArray.push({
                id: key,
                config: this.state.controls[key]
            });
        }

        let form = formElementsArray.map(formElement => 
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

        return <div className={classes.Auth}>
                <form onSubmit={this.authHandler}>
                         {form}
                    <Button btnType="Success" disabled={!this.state.formIsValid}> Submit</Button>
                </form>
            </div>
    }
}


const mapDispatchToProps = dispatch => {
    return {
        onAuthInit: (email,password) => dispatch(actionTypes.authInit(email,password))
    };
}; 

export default connect(null,mapDispatchToProps)(withErrorHandler(Auth,axios));