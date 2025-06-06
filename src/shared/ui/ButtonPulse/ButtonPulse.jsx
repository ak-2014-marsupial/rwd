import React, {memo, useState} from 'react';

import css from "./ButtonPulse.module.css"
import {useIsTouchDevice} from "../../hooks";

const ButtonPulse = memo(({
                              children,
                              onAction,
                              offAction,
                              isPulse = false,
                              backgroundColor ,
                              className
                          }) => {
    const [hover, setHover] = useState(false);
    const [isFocused, setIsFocused] = useState(false)
    const classList = [css.mic_toggle, "noselect", className];
    if (hover) classList.push(css.hover);
    if (isPulse) classList.push(css.pulse)

    const holdOn = () => {
        if (typeof onAction === "function") onAction();
        setHover(true);
    }
    const holdOff = () => {
        if (typeof offAction === "function") offAction();
        !isFocused && setHover(false);
    }

    const hoverOn = () => {
        setIsFocused(true);
        setHover(true);
    }
    const hoverOff = () => {
        setIsFocused(false);
        setHover(false);
    }

    const getProperties = (isTrue) => {
        const obj = {
            true: {onTouchStart: holdOn, onTouchEnd: holdOff},
            false: {onMouseDown: holdOn, onMouseUp: holdOff, onMouseEnter: hoverOn, onMouseLeave: hoverOff}
        }
        return obj[isTrue]
    }

    return (
        <button
            className={classList.join(" ")}
            {...getProperties(useIsTouchDevice())}
            style={{"--background-pulse": backgroundColor}}
        >
            {/*<span>P</span>*/}
            {children}
        </button>
    );
});

export {ButtonPulse};