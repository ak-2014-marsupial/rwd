import React from 'react';
import css from "../Components/Navbar.module.css";
import {NavbarItemTablet} from "../Components/NavbarItemTablet";

const NavbarDesktop = ({items=[]}) => {

    return (
            <div className={css.Navbar}>
                {items.map((item, index) =>
                    <NavbarItemTablet key={index}
                                      isArrowBack={true}
                                      item={item}
                                      tooltipShow={true}
                                      depthLevel={0}
                    />)}
            </div>
    );
};

export  {NavbarDesktop};