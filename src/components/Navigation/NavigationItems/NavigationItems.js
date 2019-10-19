import React from 'react';
import classes from './NavigationItems.css';
import NavigationItem from './NavigationItem/NavigationItem';
import Aux from './../../../hoc/Auxi/Auxilliary';

const navigationItems = (props) => {
    return (<ul className={classes.NavigationItems}>
        {props.isAuthenticated ? 
        <Aux>
        <NavigationItem link="/" exact>Burger Builder</NavigationItem>
        <NavigationItem link="/orders">Orders</NavigationItem> </Aux> :
        null}
        {props.isAuthenticated ?
        <NavigationItem link="/logout">Log Out</NavigationItem>:
        <NavigationItem link="/auth">Sign In / Sign Up</NavigationItem>
        }
    </ul>);
};

export default navigationItems;