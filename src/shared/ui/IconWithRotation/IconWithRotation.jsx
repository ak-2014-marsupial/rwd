import React from 'react';
import css from "./IconWithRotation.module.css"

const IconWithRotation = ({component: Component, active, ...props}) => {
    return (
        <div className={active ? ` ${css.logo} ${css.rotate}` : css.logo} >
            <svg style={{width:"1.5rem",height:"1.5rem"}}>
                <g>
                    <Component style={{fontSize: "1.5rem", ...props}}/>
                </g>
            </svg>
        </div>
    );
};

export {IconWithRotation};