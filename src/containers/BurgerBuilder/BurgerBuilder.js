import React, { Component } from 'react';
import Aux from '../../hoc/Auxi/Auxilliary';
import Burger from './../../components/Burger/Burger';
import BuildControls from './../../components/Burger/BuildControls/BuildControls';
import Modal from './../../components/UI/Modal/Modal';
import OrderSummary from './../../components/Burger/OrderSummary/OrderSummary';
import axios from './../../axios-orders';
import Spinner from './../../components/UI/Spinner/Spinner';
import withErrorHandler from './../../hoc/withErrorHandler/withErrorHandler';

const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7
}

class BurgerBuilder extends Component {

    state ={
        ingredients:null,
        totalPrice: 0,
        purchasable: false,
        purchasing: false,
        loading: false,
        error:false
    }

    componentDidMount() {
        axios.get('/ingredients.json')
            .then(response => {
                this.setState({ingredients: response.data});
            })
            .catch(error => {
                console.log(error);
                this.setState({error:true});
            });
    }

    updatePurchaseState(ingredients) {
        // const ingredients = {
        //     ...this.state.ingredients
        // }
        const sum = Object.keys(ingredients)
        .map(igKey => {
            return ingredients[igKey];
        })
        .reduce((sum,e1) => {
            return sum + e1;
        },0);

        if(sum < 1) {
            this.setState({purchasable: sum >= 1, totalPrice: 0}); 
        } else {
            this.setState({purchasable: sum >= 1}); 
        }
    }

    addIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        const updatedCount = oldCount + 1;
        const updatedIngredients = {
            ...this.state.ingredients
        }
        updatedIngredients[type] = updatedCount;
        const priceAddition = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice + priceAddition;
        this.setState({totalPrice: newPrice, ingredients: updatedIngredients});
        this.updatePurchaseState(updatedIngredients);
    }

    removeIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        if(oldCount <= 0) {
            return;
        }
        const updatedCount = oldCount - 1;
        const updatedIngredients = {
            ...this.state.ingredients
        }
        updatedIngredients[type] = updatedCount;
        const priceDeduction = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice - priceDeduction;
        this.setState({totalPrice: newPrice, ingredients: updatedIngredients});
        this.updatePurchaseState(updatedIngredients);
    }

    purchasableHandler = () => {
        this.setState({purchasing: true});
    }

    purchaseCancelHandler = () => {
        this.setState({purchasing: false});
    }

    purchaseContinueHandler = () => {
       // alert('you chose to continue');
    //    this.setState({loading:true});
    //     const order ={
    //         ingredients: this.state.ingredients,
    //         price: this.state.totalPrice,
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
        let queryParams = [];
        for( let  i in this.state.ingredients) {
            queryParams.push(encodeURIComponent(i) + '='+ encodeURIComponent(this.state.ingredients[i]));
        }
        queryParams.push('price='+ this.state.totalPrice);
        const queryString = queryParams.join('&');
        this.props.history.push({
            pathname: '/checkout',
            search: '?' + queryString
            });
    }

    render() {
        const disableInfo = {
            ...this.state.ingredients
        }

        for(let key in disableInfo) {
            disableInfo[key] = disableInfo[key] <= 0
        }
        let orderSummary = null;

        let burger = this.state.error ? <p>Ingredients cant be loaded!</p> : <Spinner />;
        if(this.state.ingredients) {
             burger = <Aux><Burger ingredients={this.state.ingredients}></Burger> 
            <BuildControls ingredientAdded={this.addIngredientHandler}
                ingredients={this.state.ingredients}
                ingredientRemoved={this.removeIngredientHandler} 
                disabled={disableInfo} currentPrice={this.state.totalPrice}
                purchasable={this.state.purchasable}
                ordered={this.purchasableHandler}/></Aux>;
            orderSummary = <OrderSummary ingredients={this.state.ingredients}
                purchaseCanceled={this.purchaseCancelHandler}
                purchaseContinued={this.purchaseContinueHandler}
                price={this.state.totalPrice}
                ></OrderSummary>;
        }

        if(this.state.loading) {
            orderSummary = <Spinner />
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

export default withErrorHandler(BurgerBuilder, axios);