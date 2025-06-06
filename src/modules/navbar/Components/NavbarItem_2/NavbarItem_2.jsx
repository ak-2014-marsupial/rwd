import React, {useRef, useState} from 'react';
import {HoldButton, IconWithRotation, useClickOutside} from "../../../../shared";

import css from "./NavbarItem_2.module.css"
import {ArrowDown, DefaultIcon} from "../../index";
import {useNavigate} from "react-router-dom";

const NavbarItem2 = ({item, children, depthLevel}) => {

    const [dropdown, setDropdown] = useState(false);
    const navigate = useNavigate();
    const indent = 2;

    const refNavbarItem = useRef(null);

    const closeDropdown = () => {
        setTimeout(() => setDropdown(false), 50)
    }

    useClickOutside(refNavbarItem, closeDropdown);


    const handleClick = (item) => {
        if (item.children) {
            setDropdown(prev => !prev);
        } else if (item.path) {
            navigate(item.path)
        }
    }


    const renderTitle = (item) => {
        const {icon: Icon, component: Component, title, props} = item;
        const style = {width: "var(--logo-width)", margin: "0 auto"};
        let logo = null;
        if (depthLevel === 0) {
            if (item.icon) {
                logo = <Icon {...props} style={style}/>
            } else logo = <DefaultIcon className="icon" style={style}/>
        }

        if (Component) {
            return (<Component {...props}/>)
        } else return <div>{logo} {title}</div>
    }
// for children as arrow component:
    const childrenWithProps = React.Children.map(children, (child) =>
        React.cloneElement(child, {active: dropdown})
    );

    return (
        <div className={["noselect", css.navbar_item].join(" ")}
             ref={refNavbarItem}
             style={{marginLeft: `${(depthLevel > 0 ? 1 : 0) * indent}rem`}}
        >
            <HoldButton
                borderRadius={false}
                onAction={() => handleClick(item)}
                width="100%"
                border={false}
            >
                <div className={[css.label].join(" ")}>
                    {renderTitle(item)}
                    {item?.children && childrenWithProps}
                </div>
            </HoldButton>

            <div className={[css.dropdown, dropdown ? css.expanded : css.collapsed].join(" ")}>
                {item?.children && item.children.map((item, index) =>
                    <NavbarItem2
                        key={index}
                        item={item}
                        depthLevel={depthLevel + 1}
                    >
                        <IconWithRotation component={ArrowDown}/>
                    </NavbarItem2>
                )}
            </div>
        </div>
    );
};

export {NavbarItem2};