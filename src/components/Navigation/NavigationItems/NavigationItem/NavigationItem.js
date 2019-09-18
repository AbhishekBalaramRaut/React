
import React from 'react';
import classes from './NavigationItem.css';
import {NavLink} from 'react-router-dom';

const navigationItem = (props) => {
    return (<ul className={classes.NavigationItem}>
        <li>
            <NavLink to={props.link} activeClassName={classes.active} exact={props.exact}>
                {props.children}
            </NavLink>
               
        </li>
    </ul>);
};

export default navigationItem;