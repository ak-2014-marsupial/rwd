import React, {forwardRef, useState} from 'react';
import {BsInfoCircle as InfoIcon} from "react-icons/bs";
import {ImWarning as WarningIcon} from "react-icons/im";
import {BiErrorAlt as ErrorIcon} from "react-icons/bi";

import css from "./Toast.module.css"
import {ProgressBarWithPause} from "../index";

const Toast = forwardRef((props, ref) => {

    const {autoClose = true, isOpen = false, onClose, message, duration = 12, children} = props
    const {message: title, type} = message;

    const [isPause, setIsPause] = useState(false)
    const handleClickOnToast = () => {
        setIsPause(prev => !prev)
    }
    const handlerOnEnd = () => {
        if (autoClose) {
            if (typeof onClose === "function") onClose()
        }
    }
    const toastClasses = ["noselect", css.container];
    toastClasses.push(type ? css[`${type}`] : "");
    toastClasses.push(isOpen ? css.show : "")
    return (
        <div ref={ref} className={toastClasses.join(" ")} onClick={handleClickOnToast}>
            <div className={css.toast}>
                <div className={css.label}>
                    {type === "info" ? <InfoIcon/> : null}
                    {type === "warning" ? <WarningIcon/> : null}
                    {type === "error" ? <ErrorIcon/> : null}
                </div>
                <div className={css.title}>{title}</div>
            </div>
            {children}
            <div style={{width: "100%", height: "1rem"}}>
                <ProgressBarWithPause isStart={isOpen} isPause={isPause} duration={duration} onEnd={handlerOnEnd}/>
            </div>
        </div>
    );
})

export {Toast};