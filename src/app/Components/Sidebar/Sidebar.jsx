import React, { useState} from 'react';

import css from "./Sidebar.module.css"
import {useNavLinksConfig} from "../../config/menuNavLinks.config";
import {useResponsiveMode} from "../../hooks/useResponsiveMode";
import {NavbarDesktop, NavbarMobile, NavbarTablet} from "../../../modules/navbar";

const Sidebar = ({isOpen,headerHeight="0vh"}) => {
    const {mode} = useResponsiveMode()
    const [tooltipShow, setTooltipShow] = useState(false)
    const navLinks = useNavLinksConfig();
    const classSidebar = [css.side_bar, css[`side_bar_${mode}`]];

    if (mode === "mobile" && isOpen) {
        classSidebar.push(css.side_bar_show)
    }
    if (mode === "tablet" && tooltipShow) {
        classSidebar.push(css.tooltip_show)
    }

    const styleSidebar = (mode) => {
        return {
            transition: {
                tablet: "width 1s ease",
                mobile: 'transform 1s linear'
            }[mode]
        };
    }


    const mapNavbarVariants = (mode, items, tooltipShow, setTooltipShow) => {
        return {
            mobile: NavbarMobile({mode, items}),
            tablet: NavbarTablet({mode, items, tooltipShow, setTooltipShow}),
            desktop: NavbarDesktop({mode, items})
        }[mode]
    }

    return (
        <aside className={classSidebar.join(" ")} style={{"--height-header":headerHeight, ...styleSidebar(mode)}}>
            {mapNavbarVariants(mode, navLinks, tooltipShow, setTooltipShow)}
        </aside>

    );

};

export {Sidebar};