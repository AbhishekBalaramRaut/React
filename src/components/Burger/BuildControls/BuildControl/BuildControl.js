import React from 'react';
import classes from './BuildControl.css';

const buildControl = (props) => {

    return (<div className={classes.BuildControl}>
        <div className={classes.Label}> {props.label} </div>
        <button className={classes.Less} onClick={props.removed}
        disabled={props.disabled} title="Less">--</button>
        {props.count}
        <button className={classes.More} onClick={props.added}
        title="More">+</button>
    </div>
    );
};

export default buildControl;