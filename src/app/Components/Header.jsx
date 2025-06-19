import React from 'react';

import {useResponsiveMode} from "../hooks/useResponsiveMode";

import {BurgerIcon, HoldButton} from "../../shared";
import css from "./Layouts/MainLayout/MainLayout.module.css"

const Header = ({isOpen, setIsOpen}) => {
    const {mode} = useResponsiveMode();

    const toggleSideBar = () => {
        if (typeof setIsOpen === "function") setIsOpen(prev => !prev)
    }

    return (
        <header className={css.header}>

            {mode === "mobile" &&
                <HoldButton onAction={toggleSideBar}>
                    <BurgerIcon isOpen={isOpen}/>
                </HoldButton>
            }
        </header>
    );
};

export {Header};