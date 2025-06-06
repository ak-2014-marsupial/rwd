import React, {useState} from 'react';
import {useThemeStore} from "../hooks/useThemeStore";
import {Switcher} from "../../shared";

const ThemeSwitcher = (props) => {
    const {size, width} = props;
    const [active, setActive] = useState(false);
    const mapTheme = {
        true: {key:"light",name:"Light Theme"},
        false: {key:"dark",name:"Dark Theme"},
    }

    const [, setTheme] = useThemeStore()

    const toggleChecked = () => {
        setTheme(mapTheme[active].key)
        setActive(prev => !prev)
    }
    return (<>
            {mapTheme[!active].name}
            <Switcher active={active} setActive={toggleChecked} size={size} width={width}/>
        </>
    );
};

export {ThemeSwitcher};