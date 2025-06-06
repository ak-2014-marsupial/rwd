import React, { useState} from 'react';
import {useNavigate} from "react-router-dom";

import {WithHover} from "../hoc/WithHover";
import css from "./Navbar.module.css"
import {HoverableLabel} from "./HoverableLabel";
import {DefaultIcon} from "../index";

const NavbarItemTablet = (props) => {
    const {item, isArrowBack, tooltipShow, depthLevel} = props;
    const [dropdown, setDropdown] = useState(false);
    const navigate = useNavigate();
    const [isFocused, setIsFocused] = useState(0);
    const classTooltip = [css.tooltip, "noselect"];
    let tooltipVisible = false;


    if (tooltipShow) {
        classTooltip.push(css.active);
        tooltipVisible = tooltipShow;
    }
    if (!tooltipShow && Boolean(isFocused)) {
        classTooltip.push(css.hoverTooltip);
        if (isFocused === 2) classTooltip.push(css.hoverPined) //mode pinned
        tooltipVisible = dropdown;
    }

    const actionCB = (item) => {
        if (item.children) {
            setDropdown(prev => !prev)
        } else if (item?.path) {
            navigate(item.path)
        }
    }

    const renderLogo = () => {
        const {icon: Icon, props} = item;
        const style = {width: "var(--logo-width)", margin: "0 auto"};
        if (depthLevel >= 1) {
            if (!isArrowBack) {
                return <div style={{margin: "0 auto"}}></div>
            } else return <div style={style}></div>
        }
        let logo = <div><DefaultIcon className="icon" style={style}/></div>
        if (item.icon) {
            logo = <div><Icon {...props} style={style}/></div>
        }
        return logo
    }

    return (
        <div className="noselect">
            <WithHover setIsFocused={setIsFocused} dropdown={dropdown} onClick={() => actionCB(item)}>
                <HoverableLabel item={item}
                                classTooltip={classTooltip}
                                dropdown={dropdown}
                                logo={renderLogo()}
                                depthLevel={depthLevel}
                                isArrowBack={isArrowBack}
                />
            </WithHover>

            {item?.children && (
                <div className={classTooltip.join(" ")} >
                    <div className={dropdown ? css.expanded : css.collapsed} aria-expanded={dropdown} >
                        {item.children.map((item, index) => (
                            <div key={index}>
                                <NavbarItemTablet item={item} isArrowBack={isArrowBack} tooltipShow={tooltipVisible}
                                                  depthLevel={depthLevel + 1}/>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    )

};

export {NavbarItemTablet};