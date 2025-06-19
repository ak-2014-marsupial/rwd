import React from 'react';

import css from "./BurgerMenu.module.css";

import {BurgerIcon} from "../index";


const BurgerMenu = ({isOpen, isHover}) => {
    return (
        <div className={css.burger_menu}
             style={{"--backgroundBurger": isHover ? "var(--hover-color)" : "var(--accent-color)"}}>
            <div className={css.burger}>
                <BurgerIcon isOpen={isOpen}/>
            </div>
        </div>
    )
};

export {BurgerMenu};