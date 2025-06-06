import React, {memo, useEffect, useState} from 'react';

import {useIsTouchDevice} from "../index";
import css from "./HoldButton.module.css"

const HoldButton = memo(({
                             children,
                             onAction,
                             offAction,
                             width,
                             border = true,
                             borderRadius = true,
                             className = "",
                             stickingMode = true,
                             ...props
                         }) => {
    const [hover, setHover] = useState(false);
    const [isFocused, setIsFocused] = useState(false);
    let timerId = null;


    useEffect(() => {
        return () => (clearTimeout(timerId))
    }, [timerId]);

    // function implement a sticking mode
    const handleSetHoverFalse = () => {
        if(Boolean(stickingMode)){
            timerId = setTimeout(() => setHover(false), 2000)
        } else setHover(false)
    }

    const style = {border: "1px solid var(--border-color)"}
    if (borderRadius) style["borderRadius"] = "0.5rem";
    if (width) style["width"] = width;
    if (!border) style.border = "none";


    const holdOn = () => {
        if (typeof onAction === "function") onAction();
        setHover(true);
    }
    const holdOff = () => {
        if (typeof offAction === "function") offAction();
        // !isFocused && setHover(false);
        !isFocused && handleSetHoverFalse();
    }

    const hoverOn = () => {
        setIsFocused(true);
        setHover(true);
    }
    const hoverOff = () => {
        setIsFocused(false);
        // setHover(false);
        handleSetHoverFalse();
    }

    const getProperties = (isTrue) => {
        const obj = {
            true: {onTouchStart: holdOn, onTouchEnd: holdOff, ...props},
            false: {onMouseDown: holdOn, onMouseUp: holdOff, onMouseEnter: hoverOn, onMouseLeave: hoverOff, ...props}
        }
        return obj[isTrue]
    }

    const buttonClasses = [css.btn, "noselect", className];
    if (hover) buttonClasses.push(css.hover);

    return (
        <button
            style={style}
            className={buttonClasses.join(" ")}
            {...getProperties(useIsTouchDevice())}
        >
            {children}
        </button>
    );
})

export {HoldButton};

