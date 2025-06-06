import React, {useRef, useState} from 'react';
import css from "../Components/Navbar.module.css";
import {WithHover} from "../hoc/WithHover";
import {HoverAbleBackArrow} from "../Components/HoverAbleBackArrow";
import {NavbarItemTablet} from "../Components/NavbarItemTablet";
import {useClickOutside} from "../index";

const NavbarTablet = (props) => {
    const {items = [], mode, tooltipShow = false, setTooltipShow} = props;
    const [isFocused, setIsFocused] = useState(0);
    let isArrowBack = false;
    const refNavbar = useRef()
    const closeTooltip = () => {
        tooltipShow && setTooltipShow(false);
    }
    useClickOutside(refNavbar, closeTooltip)
    const classTooltip = [css.tooltip];

    if (tooltipShow) {
        classTooltip.push(css.active);
        isArrowBack = true;
    }

    if (!tooltipShow && Boolean(isFocused)) {
        classTooltip.push(css.hoverTooltip);
        isArrowBack = false;
    }

    const renderBackArrow = (title) => {
        return (
            <WithHover setIsFocused={setIsFocused}
                       onClick={() => setTooltipShow(prev => !prev)}>
                <HoverAbleBackArrow title={title} classTooltip={classTooltip} tooltipShow={tooltipShow}
                                    isArrowBack={isArrowBack}/>
            </WithHover>
        )
    }


    return (
            <div className={css.Navbar} ref={refNavbar}>
                {mode === "tablet" ? renderBackArrow(isArrowBack ? "Collapse" : "Expand") : null}
                {items.map((item, index) =>
                    <NavbarItemTablet key={index}
                                      isArrowBack={isArrowBack}
                                      item={item}
                                      tooltipShow={tooltipShow}
                                      depthLevel={0}/>)}
            </div>
    );

};

export {NavbarTablet};