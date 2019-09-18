import React from 'react';
import classesButton from './Button.css';

const button = (props) => {
    return <button className={[classesButton.Button,classesButton[props.btnType]].join(' ')} 
    onClick={props.clicked} disabled={props.disabled}>{props.children}</button> 
};

export default button;