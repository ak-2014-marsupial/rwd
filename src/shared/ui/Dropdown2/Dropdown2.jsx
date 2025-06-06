import React, {useRef, useState} from 'react';

import css from "./Dropdown.module.css"
import {HoldButton} from "../HoldButton/HoldButton";
import {useClickOutside} from "../../hooks";

const Dropdown2 = ({options = [], keyField, value = null, onChange, children}) => {

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
    }
// for children as arrow component:
    const childrenWithProps = React.Children.map(children, (child) =>
        React.cloneElement(child, {active: isDropdown})
    );

    if (!options.length) return null


    return (
        <div className={css.dropdown} ref={refDropdown}>
            <HoldButton
                onAction={toggleDropdown}
                width="100%"
            >
                <div className={css.label}>
                    {value}
                    {childrenWithProps}
                </div>
            </HoldButton>


            <div className={[css.dropdown_menu, isDropdown ? css.expanded : css.collapsed].join(" ")}>
                {options
                    .map((item, index) =>
                        <HoldButton
                            key={item[keyField]}
                            className={item[keyField] === value ? css.hidden : css.visible}
                            borderRadius={false}
                            onAction={() => handleClick( item)}>
                            <div className={css.dropdown_menu_item}> {item[keyField]}</div>
                        </HoldButton>)}


            </div>
        </div>
    );
};

export {Dropdown2};