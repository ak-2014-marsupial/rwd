import React from 'react';
import {IconWithRotation} from "../../../shared/ui/IconWithRotation/IconWithRotation";
import {SlArrowRight} from "react-icons/sl";
import css from "./Navbar.module.css";

const HoverAbleBackArrow = (props) => {
    const {title, classTooltip, tooltipShow, isArrowBack, hover} = props;

    let classLabel = [css.label];
    if (hover) {
        if(!isArrowBack){
            classLabel.push(css.hover_border_left)
            classTooltip.push(css.hover_border_right)
        }else{
            classLabel.push(css.hover_border)
        }
    }
    const backgroundColor = () => {
        if (hover) return "var(--hover-color)";
        return "inherit"
    }

    return (
        <div className={classLabel.join(" ") } style={{background: backgroundColor()}}>
            <IconWithRotation component={SlArrowRight} active={tooltipShow}/>
            <div className={classTooltip.join(" ")}>
                {title}
            </div>
        </div>
    );
};

export {HoverAbleBackArrow};