import React from 'react';
import css from "../Components/Navbar.module.css";
import {NavbarItem2} from "../Components/NavbarItem_2/NavbarItem_2";
import {IconWithRotation} from "../../../shared";
import {ArrowDown} from "../../speech_to_text";

const NavbarMobile = ({items=[]}) => {

    return (
            <div className={css.Navbar}>
                {items.map((item, index) =>
                    <NavbarItem2 key={index}
                                item={item}
                                depthLevel={0}
                    >
                        <IconWithRotation component={ArrowDown}/>


                    </NavbarItem2>)}
            </div>
    );
};

export {NavbarMobile};