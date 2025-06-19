import React, {memo, useEffect, useState} from 'react';

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
                             ...otherProps
                         }) => {
    const [hover, setHover] = useState(false);
    let timerId = null;


    useEffect(() => {
        return () => (clearTimeout(timerId))
    }, [timerId]);

    // function implement a sticking mode
    const handleSetHoverFalse = () => {
        if (Boolean(stickingMode)) {
            timerId = setTimeout(() => setHover(false), 2000)
        } else setHover(false)
    }

    const style = {border: "1px solid var(--border-color)"}
    if (borderRadius) style["borderRadius"] = "0.5rem";
    if (width) style["width"] = width;
    if (!border) style.border = "none";

    const handlePointerEnter = () => {
        setHover(true)
    };
    const handlePointerCancel = () => {
        handleSetHoverFalse()
    }


    const handlePointerLeave = () => {
        handleSetHoverFalse()
    };
    const handlePointerDown = () => {
        if (typeof onAction === "function") onAction();
    }

    const buttonClasses = [css.btn, "noselect", className];
    if (hover) buttonClasses.push(css.hover);


    return (
        <button
            style={style}
            className={buttonClasses.join(" ")}
            onPointerEnter={handlePointerEnter}
            onPointerLeave={handlePointerLeave}
            onPointerDown={handlePointerDown}
            // onPointerMove={handlePointerMove}
            onPointerUp={handlePointerLeave}
            onPointerCancel={handlePointerCancel}
            {...otherProps}

        >
            {children}
        </button>
    );
})

export {HoldButton};

