import React from 'react';

import css from "./Modal.module.css"

const Modal = ({onClose, isVisible = true, children}) => {
    if (!isVisible) return null;
    return (
        <div className={css.overlay} onClick={onClose}>
            <div className={css.content} onClick={(e)=>{e.stopPropagation()}}>
                <button className={css.button} onClick={onClose}>×</button>
                {children}
            </div>
        </div>
    );
};

export {Modal};