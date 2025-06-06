import React from 'react';

import {ArrowDown,IconWithRotation} from "../index";

import css from "./Navbar.module.css"

const HoverableLabel = (props) => {
    const {logo, item, isArrowBack, depthLevel, classTooltip, dropdown, hover} = props;

    let classLabel = [css.label];

    if (hover) {
        if (!isArrowBack && depthLevel === 0) {
            classLabel.push(css.hover_border_left)
            if (dropdown) {
                classTooltip.push(css.hover_border_right_top)
            } else classTooltip.push(css.hover_border_right)
        } else {
            if (dropdown) {
                classLabel.push(css.hover_border_top);
            } else classLabel.push(css.hover_border);
        }
    }

    const renderTitle = (item) => {
        const {component: Component, children, title, props} = item;
        if (children) {
            return (
                <>
                    {item.title}
                    <IconWithRotation component={ArrowDown} active={dropdown}/>
                </>
            )
        }

        if (Component) {
            return (<Component {...props} />)
        } else return title

    }

    const backgroundColor = () => {
        if (hover) return "var(--hover-color)";
        if (dropdown) return "var(--dropdown-color)";
        return "inherit"
    }

    return (
        <div className={classLabel.join(" ")} style={{background: backgroundColor()}}>
            {logo}
            <div className={classTooltip.join(" ")}>
                {renderTitle(item)}
            </div>
        </div>
    );
};

export {HoverableLabel};