import React, {useEffect, useState} from 'react';
import {useResponsiveMode} from "../../../hooks/useResponsiveMode";
import {useThemeStore} from "../../../hooks/useThemeStore";
import {useFontSizeStore} from "../../../hooks/useFontSizeStore";
import css from "./PlayerScenario.module.css";
import {Sidebar} from "../../Sidebar/Sidebar";
import {Outlet} from "react-router-dom";
import {BurgerMenu} from "../../../../shared";
import {Draggable} from "../../../../shared/ui/Draggable/Draggable";

const PlayerScenarioLayout = () => {
    const {mode, rate} = useResponsiveMode();
    const [theme] = useThemeStore();
    const [fontSize] = useFontSizeStore();
    const [isOpen, setIsOpen] = useState(false);
    const [burgerHover, setBurgerHover] = useState(false)
    useEffect(() => {
        document.documentElement.style.fontSize = `${+fontSize * rate}px`
    }, [fontSize, rate]);

    const marginLeftMap = {
        mobile: "var(--sidebar-width-zero)",
        tablet: "var(--sidebar-width-sm)",
        desktop: "var(--sidebar-width-xl)"
    }

    const toggleSideBar = () => {
        setIsOpen(prev => !prev)
    }

    return (
        <div className={`app_${theme}_theme ${css.main_container}`}>
            {mode === "mobile" &&
                <Draggable onAction={toggleSideBar}
                           offAction={() => setBurgerHover(false)}
                           onEnter={() => setBurgerHover(true)}
                >
                    <BurgerMenu isOpen={isOpen} isHover={burgerHover}/>
                </Draggable>

            }

            <div className={css.container}>
                <Sidebar isOpen={isOpen}/>

                <main className={css.outlet} style={{marginLeft: marginLeftMap[mode]}}>
                    <Outlet/>
                </main>
            </div>
        </div>
    );
};

export {PlayerScenarioLayout};