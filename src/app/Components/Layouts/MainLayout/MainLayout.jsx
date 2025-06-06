import React, {useEffect, useState} from 'react';
import {Outlet} from "react-router-dom";

import {useThemeStore} from "../../../hooks/useThemeStore";
import {useResponsiveMode} from "../../../hooks/useResponsiveMode";
import {useFontSizeStore} from "../../../hooks/useFontSizeStore";


import {Header} from "../../Header";
import {Footer} from "../../Footer";
import {Sidebar} from "../../Sidebar/Sidebar";

import css from "./MainLayout.module.css"
import {BuggyComponent, ErrorBoundary} from "../../ErrorBoundary";
import {appConstants} from "../../../../shared";


const MainLayout = () => {
    const {mode, rate} = useResponsiveMode();
    const [theme] = useThemeStore();
    const [fontSize] = useFontSizeStore();
    const [isOpen, setIsOpen] = useState(false);

    const {headerHeight} = appConstants;
    useEffect(() => {
        document.documentElement.style.fontSize = `${+fontSize * rate}px`
    }, [fontSize, rate]);

    const marginLeftMap = {
        mobile: "var(--sidebar-width-zero)",
        tablet: "var(--sidebar-width-sm)",
        desktop: "var(--sidebar-width-xl)"
    }
//todo include <ErrorBoundary>
    return (
        <div className={`app_${theme}_theme ${css.main_container}`} style={{"---height-header": headerHeight}}>
            <Header isOpen={isOpen} setIsOpen={setIsOpen}/>
            <div className={css.container}>
                <Sidebar isOpen={isOpen} headerHeight={headerHeight}/>
                <ErrorBoundary>
                    <main className={css.outlet} style={{marginLeft: marginLeftMap[mode]}}>
                        <BuggyComponent/>
                        <Outlet/>
                    </main>
                </ErrorBoundary>
            </div>
            <Footer/>
        </div>
    );
};

export {MainLayout};