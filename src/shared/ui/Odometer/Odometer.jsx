import React from 'react';
import {Stepper} from "./Stepper";

import css from "./Odometer.module.css"

const Odometer = ({number, className, style}) => {
    const nums = `${number}`.split(""); // Разбиваем число на массив цифр
    const odometerClasses = [css.odometer, className]

    return (
        <div className={odometerClasses.join(" ")} style={style}>
            {nums.map((value, index) => (
                <Stepper key={index} num={parseInt(value, 10)}/>
            ))}
        </div>
    );
};

export {Odometer};