import * as actionTypes from './actionTypes';
import axios from './../../axios-orders';

export const addIngs = (ingName) => {
    return {
        type : actionTypes.ADD_INGREDIENT,
        ingredientName: ingName
    }
}

export const removeIngs = (ingName) => {
    return {
        type : actionTypes.REMOVE_INGREDIENT,
        ingredientName: ingName
    }
}

export const setIngs = (ings) => {
    return  {
        type: actionTypes.SET_INGREDIENTS,
        ingredients: ings
    }
}

export const loadIngsFailed = (error) => {
    return  {
        type: actionTypes.LOAD_INGREDIENTS_FAILED,
        error: error
    }
}

export const loadIngs = () => {
    return dispatch => {
        axios.get('/ingredients.json')
            .then(response => {
                dispatch(setIngs(response.data));
            })
            .catch(error => {
                dispatch(loadIngsFailed(error))
            });
    }
}