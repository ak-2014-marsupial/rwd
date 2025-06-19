import React from 'react';

import css from "./BurgerIcon.module.css";

const BurgerIcon = ({isOpen = false, setIsOpen, hover}) => {

    const classBurgerIcon = [css.burger_icon, "noselect"];
    if (isOpen) classBurgerIcon.push(css.active);
    if (hover) classBurgerIcon.push(css.hover);

    const handleClick = () => {
        if (typeof setIsOpen === "function") {
            return  setIsOpen(prev=>!prev);
        }
        return null
    }

    return (
        <div
            className={classBurgerIcon.join(" ")}
            onClick={handleClick}
        >
            <span></span>
        </div>
    );
};

export {BurgerIcon}