import React from 'react';

import css from "./CheckBox.module.css"

const CheckBox = ({children, checked, onChange}) => {

    return (
        <label className={css.wrapper}>
            <input type={"checkbox"}
                   checked={checked}
                   onChange={onChange}
                   className={css.element}
            />
            {children}
        </label>
    );
};

export {CheckBox};