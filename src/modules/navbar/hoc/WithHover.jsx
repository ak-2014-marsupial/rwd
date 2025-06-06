import React, {useState} from 'react';

const WithHover = (props) => {
    const {
        active, children, dropdown = false, setIsFocused = () => {
        }, hoverColor = null, ...otherProps
    } = props;
    const [hover, setHover] = useState(0)
    const hoverOn = () => {
        setHover(1);
        setIsFocused(1);
    }
    const hoverOff = () => {
        setHover(0);
        if(dropdown){
            setIsFocused(2) //2 is the mode pined
        }else {
            setIsFocused(0)
        }
    }
    return (
        <div
            {...otherProps}
            onMouseEnter={hoverOn}
            onMouseLeave={hoverOff}
            onTouchStart={hoverOn}
            onTouchEnd={hoverOff}
            style={{backgroundColor: hover ? (hoverColor || "inherit") : "inherit"}}
        >
            {React.Children.map(children, (child) => {
                return React.cloneElement(child, {hover}) // hover must be numeric 0 || 1, not Boolean
            })}
        </div>
    );
};

export {WithHover};