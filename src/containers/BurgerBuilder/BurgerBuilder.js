import React, { Component } from 'react';
import Aux from '../../hoc/Auxi/Auxilliary';
import Burger from './../../components/Burger/Burger';
import BuildControls from './../../components/Burger/BuildControls/BuildControls';
import Modal from './../../components/UI/Modal/Modal';
import OrderSummary from './../../components/Burger/OrderSummary/OrderSummary';
import axios from './../../axios-orders';
import Spinner from './../../components/UI/Spinner/Spinner';
import withErrorHandler from './../../hoc/withErrorHandler/withErrorHandler';
import { connect } from 'react-redux';
import * as actionTypes from '../../store/actions/index';

export class BurgerBuilder extends Component {

    state = {
        purchasing: false,
        loading: false    
    }

    componentDidMount() {
        this.props.onLoadIngredients();
        // axios.get('/ingredients.json')
        //     .then(response => {
        //         this.setState({ingredients: response.data});
        //     })
        //     .catch(error => {
        //         console.log(error);
        //         this.setState({error:true});
        //     });
    }

    updatePurchaseState(ingredients) {
        // const ingredients = {
        //     ...this.props.ings
        // }
        const sum = Object.keys(ingredients)
            .map(igKey => {
                return ingredients[igKey];
            })
            .reduce((sum, e1) => {
                return sum + e1;
            }, 0);
        return sum > 0;
        // if (sum < 1) {
        //     this.setState({ purchasable: sum >= 1, totalPrice: 0 });
        // } else {
        //     this.setState({ purchasable: sum >= 1 });
        // }
    }

    // addIngredientHandler = (type) => {
    //     const oldCount = this.props.ings[type];
    //     const updatedCount = oldCount + 1;
    //     const updatedIngredients = {
    //         ...this.props.ings
    //     }
    //     updatedIngredients[type] = updatedCount;
    //     const priceAddition = INGREDIENT_PRICES[type];
    //     const oldPrice = this.props.price;
    //     const newPrice = oldPrice + priceAddition;
    //     this.setState({ totalPrice: newPrice, ingredients: updatedIngredients });
    //     this.updatePurchaseState(updatedIngredients);
    // }

    // removeIngredientHandler = (type) => {
    //     const oldCount = this.props.ings[type];
    //     if (oldCount <= 0) {
    //         return;
    //     }
    //     const updatedCount = oldCount - 1;
    //     const updatedIngredients = {
    //         ...this.props.ings
    //     }
    //     updatedIngredients[type] = updatedCount;
    //     const priceDeduction = INGREDIENT_PRICES[type];
    //     const oldPrice = this.props.price;
    //     const newPrice = oldPrice - priceDeduction;
    //     this.setState({ totalPrice: newPrice, ingredients: updatedIngredients });
    //     this.updatePurchaseState(updatedIngredients);
    // }

    purchasableHandler = () => {
        if(this.props.isAuthenticated) {
            this.setState({ purchasing: true });
        } else {
            this.props.setAuthRedirectPath('/checkout');
            this.props.history.push('/auth');
        }
    }

    purchaseCancelHandler = () => {
        this.setState({ purchasing: false });
    }

    purchaseContinueHandler = () => {
        // alert('you chose to continue');
        //    this.setState({loading:true});
        //     const order ={
        //         ingredients: this.props.ings,
        //         price: this.props.price,
        //         customer: {
        //             name: 'adada',
        //             address: {
        //                 street: "asdsad",
        //                 zipCode: "400710",
        //                 country: "India"
        //             },
        //             email: "asdasd123@gmail.com"
        //         },
        //         deliveryMethod: "fastest"
        //     }
        //     axios.post('/orders.json',order)
        //          .then(response =>  {
        //              console.log(response);
        //              this.setState({loading:false,purchasing: false});
        //             })
        //          .catch(error => {
        //              console.log(error);
        //              this.setState({loading:false,purchasing: false});
        //          });
        this.props.onPurchaseInit();
        this.props.history.push('/checkout');
    }

    render() {
        const disableInfo = {
            ...this.props.ings
        }

        for (let key in disableInfo) {
            disableInfo[key] = disableInfo[key] <= 0
        }
        let orderSummary = null;

        let burger = this.props.error ? <p>Ingredients cant be loaded!</p> : <Spinner />;
        if (this.props.ings && !this.props.error) {
            burger = <Aux><Burger ingredients={this.props.ings}></Burger>
                <BuildControls ingredientAdded={this.props.onIngredientAdded}
                    ingredients={this.props.ings}
                    ingredientRemoved={this.props.onIngredientRemoved}
                    disabled={disableInfo} currentPrice={this.props.price}
                    purchasable={this.updatePurchaseState(this.props.ings)}
                    isAuth={this.props.isAuthenticated} ordered={this.purchasableHandler} /></Aux>;
            orderSummary = <OrderSummary ingredients={this.props.ings}
                purchaseCanceled={this.purchaseCancelHandler}
                purchaseContinued={this.purchaseContinueHandler}
                price={this.props.price}
            ></OrderSummary>;
        }

        return (
            <Aux>
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
                    {orderSummary}
                </Modal>
                {burger}
            </Aux>
        );
    }
}

const mapStateToProps = state => {

    return {
        ings: state.burgerBuilder.ingredients,
        price: state.burgerBuilder.totalPrice,
        error: state.burgerBuilder.error,
        isAuthenticated: state.auth.token != null
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onIngredientAdded: (ingredientName) => dispatch(actionTypes.addIngs(ingredientName)),
        onIngredientRemoved: (ingredientName) => dispatch(actionTypes.removeIngs(ingredientName)),
        onLoadIngredients: () => dispatch(actionTypes.loadIngs()),
        onPurchaseInit: () => dispatch(actionTypes.purchaseInit()),
        setAuthRedirectPath: (path) => dispatch(actionTypes.setAuthRedirectPath(path))
    };
};

//Enable below statement when running the app
export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));

// Enable below statement when jest test
//export default BurgerBuilder;