import React, {useEffect, useState} from 'react';
import {useResponsiveMode} from "../../../hooks/useResponsiveMode";
import {useThemeStore} from "../../../hooks/useThemeStore";
import {useFontSizeStore} from "../../../hooks/useFontSizeStore";
import css from "./PlayerScenario.module.css";
import {Sidebar} from "../../Sidebar/Sidebar";
import {Outlet} from "react-router-dom";
import {BurgerMenu, HoldButton} from "../../../../shared";

const PlayerScenarioLayout = () => {
    const {mode, rate} = useResponsiveMode();
    const [theme] = useThemeStore();
    const [fontSize] = useFontSizeStore();
    const [isOpen, setIsOpen] = useState(false);
    useEffect(() => {
        document.documentElement.style.fontSize = `${+fontSize * rate}px`
    }, [fontSize, rate]);

    const marginLeftMap = {
        mobile: "var(--sidebar-width-zero)",
        tablet: "var(--sidebar-width-sm)",
        desktop: "var(--sidebar-width-xl)"
    }

    const toggleSideBar = () => {
        setIsOpen(prev=>!prev)
    }

    return (
        <div className={`app_${theme}_theme ${css.main_container}`}>
            {mode === "mobile" &&
                <HoldButton onAction={toggleSideBar} className={css.hold_button}>
                    <BurgerMenu isOpen={isOpen}/>
                </HoldButton>
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

export  {PlayerScenarioLayout};