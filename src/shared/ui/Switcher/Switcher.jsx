import React from 'react';

import css from "./Switcher.module.css"

const Switcher = ({active,setActive,width="20%",size="1.5rem"}) => {

    return (
        <div style={{width}} >
            <input className={css.switcher_input}  type="checkbox" checked={active} onChange={()=>{}} id="dark-mode"/>
            <label className={css.switcher_label} style={{'--after-size':size}} htmlFor="dark-mode" onClick={setActive}></label>
        </div>
    );
};

export {Switcher};