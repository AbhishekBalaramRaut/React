import * as actionTypes from '../actions/actionTypes';
import  {updateObject} from '../../shared/utility';

const INITIAL_STATE = {
    ingredients: {
        salad: 0,
        cheese: 0,
        meat: 0,
        bacon: 0
    },
    totalPrice: 0,
    error: false,
    building: false
}; 

const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7
}

const builderReducer = (state = INITIAL_STATE , action) => {
    switch (action.type) {
        case actionTypes.ADD_INGREDIENT:
            const updatedIngredient = {[action.ingredientName]: state.ingredients[action.ingredientName] + 1 };
            const updatedIngredients = updateObject(state.ingredients,updatedIngredient);
            const updatedState = {
                ingredients: updatedIngredients,
                totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName],
                building: true
            }
            return updateObject(state,updatedState);
            
        case actionTypes.REMOVE_INGREDIENT:
            let price = Math.abs(state.totalPrice - INGREDIENT_PRICES[action.ingredientName]);
            if(price <= 0) {
                price = 0;
            }
            const updatedIng = {[action.ingredientName]: state.ingredients[action.ingredientName] - 1 };
            const updatedIngs = updateObject(state.ingredients,updatedIng);
            const changedState = {
                ingredients: updatedIngs,
                totalPrice: state.totalPrice - INGREDIENT_PRICES[action.ingredientName],
                building: true
            }
            return updateObject(state,changedState);
  
        case actionTypes.SET_INGREDIENTS : 
            return updateObject(state, {
                ingredients: {
                    salad: action.ingredients.salad,
                    bacon: action.ingredients.bacon,
                    cheese: action.ingredients.cheese,
                    meat: action.ingredients.meat,
                },
                totalPrice:0,
                error:false,
                building: false
            });
     
        case actionTypes.LOAD_INGREDIENTS_FAILED : 
            return updateObject(state, {error:true,building: false});
        default:
            return state;
    }
}

export default builderReducer;
