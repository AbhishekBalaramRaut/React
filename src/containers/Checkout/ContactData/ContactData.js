import React, { Component } from 'react';
import Button from './../../../components/UI/Button/Button';
import classes from './ContactData.css';
import axios from './../../../axios-orders';
import Spinner from './../../../components/UI/Spinner/Spinner';
import Input from './../../../components/UI/Input/Input';
import { connect } from 'react-redux';
import withErrorHandler from './../../../hoc/withErrorHandler/withErrorHandler';
import * as actionTypes from './../../../store/actions/index';
import  {updateObject , checkValidity} from './../../../shared/utility';

class ContactData extends Component {
    state = {
       orderForm: {
            name: {
                elememtType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Name'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            street: {
                elememtType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Street'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            zipCode: {
                elememtType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'ZIP Code'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            country: {
                elememtType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Country'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            email: {
                elememtType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your E-mail'
                },
                value: '',
                validation: {
                    required: true
                },
                
                touched: false
            },
            deliveryMethod: {
                elememtType: 'select',
                elementConfig: {
                    options: [
                            {value: 'fastest', displayValue: 'Fastest'},
                            {value: 'cheapest', displayValue: 'Cheapest'}
                    ]
                },
                value: 'cheapest',
                validation: {},
                valid: true
            }
       },
       formIsValid:false,
        loading: false
    }

    inputChangeHandler = (event,inputIdentifier) => {
        event.preventDefault();

        const updatedFormElement = updateObject(this.state.orderForm[inputIdentifier],{
            value:event.target.value,
            touched: true,
            valid: checkValidity(event.target.value, this.state.orderForm[inputIdentifier].validation)
        });

        const updatedOrderForm = updateObject(this.state.orderForm,{
            [inputIdentifier]: updatedFormElement
        })
 
        let formIsValid = true;
        for ( let inputIdentifier in updatedOrderForm) {
            formIsValid = updatedOrderForm[inputIdentifier].valid && formIsValid;
        }

        this.setState({orderForm : updatedOrderForm, formIsValid: formIsValid});

    }

    orderHandler = (event) => {
        event.preventDefault();
        const formData = {};

        for(let formElementIdentifier in this.state.orderForm) {
            formData[formElementIdentifier] = this.state.orderForm[formElementIdentifier].value;
        }

        const order ={
            ingredients: this.props.ings,
            price: this.props.price,
            orderData: formData,
            userId: this.props.userId
        }
        this.props.onOrderBurger(order,this.props.token);
        // axios.post('/orders.json',order)
        //      .then(response =>  {
        //          console.log(response);
        //          this.setState({loading:false});
        //          this.props.history.push('/');
        //         })
        //      .catch(error => {
        //          console.log(error);
        //          this.setState({loading:false,purchasing: false});
        //      });
             
        console.log(this.props.ings);
    }
    
    render() {
        const formElementsArray = [];
        for (let key in this.state.orderForm) {
            formElementsArray.push({
                id: key,
                config: this.state.orderForm[key]
            });
        }
        let form = (<form onSubmit={this.orderHandler}>

             {formElementsArray.map(formElement => 
                <Input
                    key={formElement.id}
                     elementType={formElement.config.elememtType} 
                     elementConfig={formElement.config.elementConfig}
                     changed={(event) => this.inputChangeHandler(event,formElement.id)} 
                     value={formElement.config.value}
                     shouldValidate={formElement.config.validation}
                     touched={formElement.config.touched}
                     invalid={!formElement.config.valid} />    
             )
             }
            <Button btnType="Success" disabled={!this.state.formIsValid}> ORDER</Button>
        </form>);

        if(this.props.loading) {
            form = <Spinner />;
        }

        return (
            <div className={classes.ContactData}>
                <h4>Enter Your contact data</h4>
                {form}
            </div>
        );
    }
}

const mapStateToProps = state => {
    
        return {
            ings: state.burgerBuilder.ingredients,
            price: state.burgerBuilder.totalPrice,
            loading: state.order.loading,
            token: state.auth.token,
            userId: state.auth.userId
        };
    };

const mapDispatchToProps = dispatch => {
    return {
        onOrderBurger: (orderData,token) => dispatch(actionTypes.purchaseBurgerStart(orderData,token))
    };
}; 

export default connect(mapStateToProps,mapDispatchToProps)(withErrorHandler(ContactData,axios));