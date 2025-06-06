import React, {useRef, useState} from 'react';

import css from "./Dropdown.module.css"
import {HoldButton} from "../HoldButton/HoldButton";
import {useClickOutside} from "../../hooks";

const Dropdown = ({options = {}, value = null, onChange, children}) => {

    const refDropdown = useRef(null)
    const [isDropdown, setIsDropdown] = useState(false);

    const handleClose = () => {
        if (isDropdown) {
            setTimeout(() => setIsDropdown(false), 50)
        }
    }
    useClickOutside(refDropdown, handleClose);

    const toggleDropdown = () => {
        setIsDropdown(prev => !prev);
    }
    const handleClick = (value) => {
        if (typeof onChange === "function") onChange(value);
        // setIsDropdown(false);
    }
// for children as arrow component:
    const childrenWithProps = React.Children.map(children, (child) =>
        React.cloneElement(child, {active: isDropdown})
    );

    if (!Object.keys(options).length) return null


    return (
        <div className={css.dropdown} ref={refDropdown}>
            <HoldButton
                onAction={toggleDropdown}
                width="100%"
            >
                <div className={css.label}>
                    {options[value]}
                    {childrenWithProps}
                </div>
            </HoldButton>


            <div className={[css.dropdown_menu, isDropdown ? css.expanded : css.collapsed].join(" ")}>
                {Object.keys(options)
                    .map(key => <HoldButton
                        key={key}
                        className={key === value? css.hidden:css.visible}
                        borderRadius={false}
                        onAction={() => handleClick(key)}>
                        <div className={css.dropdown_menu_item}> {options[key]}</div>
                    </HoldButton>)}

            </div>
        </div>
    );
};

export {Dropdown};