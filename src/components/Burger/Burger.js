import React from 'react';
import classes from './Burger.css';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';
// import {withRouter} from 'react-router-dom';

const burger = (props) => {
    console.log(props);
    let ingredients = Object.keys(props.ingredients).map(igKey => {
        return [...Array(props.ingredients[igKey])].map((_,i) => {
           return  <BurgerIngredient key={igKey + i} type={igKey}></BurgerIngredient>
        });
    }).reduce((arr,el) => {
        console.log(arr+el);
        return arr.concat(el);
    },[]);

    if(ingredients.length === 0) {
        ingredients = <div>Please start adding ingredients! </div>;
    }
    return (
        <div className={classes.Burger}>
            <BurgerIngredient type="bread-top"></BurgerIngredient>
            {/* <BurgerIngredient type="cheese"></BurgerIngredient>
            <BurgerIngredient type="meat"></BurgerIngredient> */}
            {ingredients}
            <BurgerIngredient type="bread-bottom"></BurgerIngredient>
        </div>  
    );
};

export default burger;