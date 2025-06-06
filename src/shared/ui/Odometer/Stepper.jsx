import React from 'react';

import css from "./Odometer.module.css"

const Stepper = ({ num }) => {
    return (
        <div
            className={css.stepper}
            style={{
                transform: `translateY(-${num * 1.5}rem)`, // Смещение на высоту цифры
            }}
        >
            {[...Array(10).keys()].map((digit) => (
                <span key={digit}>{digit}</span>
            ))}
        </div>
    );
};


export  {Stepper};