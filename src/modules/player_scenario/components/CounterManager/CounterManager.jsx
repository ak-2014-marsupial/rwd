import React, {useEffect, useState} from 'react';

import css from "./CounterManager.module.css"

import {HoldButton, Odometer,CheckBox} from "../../index";


const CounterManager = (
    {
        isVisible = true,
        displayObj,
        changeCount,
        onAction,
        style = {},
        isActive
    }
) => {

    const [isSave, setIsSave] = useState(false);
    const count = displayObj[isSave].value;

    useEffect(() => {
        if (!isActive) {
            setIsSave(false);
        }

    }, [isActive])

    if (!isVisible) return;

    const toggleSave = () => {
        setIsSave(prev => !prev);
    }

    const increment = () => {
        changeCount({type: "inc", guard: isSave})
    }

    const decrement = () => {
        changeCount({type: "dec", guard: isSave})
    }


    const styleBtn = {borderRadius: "50%", padding: "0 0.5rem", border: "1px solid var(--border-color)"}

    return (
        <div className={css.container} style={style} onClick={(e)=>e.stopPropagation()}>

            <div className={`${css.animated_div} ${isActive ? css.open : css.closed}`}>
                <div className={css.button_group}>
                    <HoldButton onAction={decrement} style={styleBtn} disabled={count === 0}>
                        <div style={{fontSize: "2.5rem", padding: "0 0.5rem 0.3rem"}}>
                            -
                        </div>
                    </HoldButton>
                    <div  className={css.distance} ></div>
                    <CheckBox checked={isSave} onChange={toggleSave}>Зберегти</CheckBox>

                    <HoldButton onAction={increment} style={styleBtn} disabled={count === 9}>
                        <div style={{fontSize: "2.5rem", padding: "0 0.2rem"}}>
                            +
                        </div>
                    </HoldButton>
                </div>
            </div>
            <HoldButton className={css.counter} onAction={() => onAction()} style={styleBtn}>
                <Odometer number={count} className={css.odometer}/>
            </HoldButton>
        </div>
    );
};

export {CounterManager};