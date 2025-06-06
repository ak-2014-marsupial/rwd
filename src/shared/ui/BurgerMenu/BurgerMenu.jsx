import React from 'react';

import css from "./BurgerMenu.module.css";

const BurgerMenu = ({isOpen = false, setIsOpen, hover}) => {

    const classBurger = [css.burger, "noselect"];
    if (isOpen) classBurger.push(css.active);
    if (hover) classBurger.push(css.hover);

    const handleClick = () => {
        if (typeof setIsOpen === "function") {
            return  setIsOpen(prev=>!prev);
        }
        return null
    }

    return (
        <div
            className={classBurger.join(" ")}
            onClick={handleClick}
        >
            <span></span>
        </div>
    );
};

export {BurgerMenu}