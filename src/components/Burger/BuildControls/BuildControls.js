import React from 'react';

import classes from './BuildControls.css';
import BuildControl from './BuildControl/BuildControl';

const controls = [
    {label:'Salad', type: 'salad'},
    {label:'Bacon', type: 'bacon'},
    {label:'Cheese', type: 'cheese'},
    {label:'Meat', type: 'meat'}
];

const buildControls = (props) => {
     let elementReturned = (<div className={classes.BuildControls}>
         <p>Current price: <strong>{props.currentPrice.toFixed(2)}</strong></p>
         {controls.map(ctrl => (
             <BuildControl added={() => props.ingredientAdded(ctrl.type)} removed={() => props.ingredientRemoved(ctrl.type)}
              key={ctrl.label} label={ctrl.label} 
              disabled={props.disabled[ctrl.type]}
              count={props.ingredients[ctrl.type]}
              />
              ))
            }
            <button disabled={!props.purchasable} className={classes.OrderButton}
                onClick={props.ordered}>Order Now!</button>
     </div>
    );

    return elementReturned;
};

export default buildControls;