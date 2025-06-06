import React, {useState} from 'react';

import {LiaChevronLeftSolid, LiaChevronRightSolid} from "react-icons/lia";
import css from "./HorizontalSlider.module.css";
import {HoldButton} from "../HoldButton/HoldButton";

const HorizontalSlider = ({items = [], isHighlight = false, value, onAction, count = 3, step = 2, width = 70}) => {
    const [position, setPosition] = useState(0);
    const nextSlide = () => {
        setPosition((prev) => Math.max(prev - width * step, -width * (items.length - count)));
    };
    const prevSlide = () => {
        setPosition((prev) => Math.min(prev + width * step, 0));
    };

    const handlerClick = (item) => {
        onAction(item);
    };
    return (
        <div className={css.container}>
            <HoldButton className={css.btn} onAction={prevSlide}>
                <LiaChevronLeftSolid/>
            </HoldButton>

            <div className={css.wrap_slider}
                 style={{"--count": count, "--slide-width": width + "px"}}>
                <div className={css.slider} style={{translate: `${position}px`}}>
                    {items.map(item => (
                        <div key={item.lang}
                             className={`${css.slide} ${isHighlight && item.voice ? css.support : css.no_support}`}
                             onClick={() => handlerClick(item)}
                        >
                            <div className={css.item}
                                 style={{background: `${item.lang === value ? "var(--warning-color)" : "var(--accent-color)"}`}}>{item.lang}</div>
                        </div>
                    ))}
                </div>
            </div>
            <HoldButton className={css.btn} onAction={nextSlide}>
                <LiaChevronRightSolid/>
            </HoldButton>
        </div>
    );
};
export {HorizontalSlider};