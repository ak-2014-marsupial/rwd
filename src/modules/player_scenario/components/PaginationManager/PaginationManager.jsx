import React from 'react';

import {useMainStateMachine} from "../MainStateMachineProvider";

import {ButtonPulse, HoldButton, GrCaretNext, GrCaretPrevious, AiOutlineSound, PiPauseBold} from "../../index";
import {machine as m} from "../../constants/machine.constants";

import css from "./PaginationManager.module.css"

const PaginationManager = () => {
    const {state, send} = useMainStateMachine();

    const {currentIndex, currentCardIndex, data} = state.context;
    const dataLength = data?.length;
    const cardsLength = data && data[currentIndex]?.scenarioItems?.length;

    const isAtStart = currentIndex === 0 && currentCardIndex === 0;
    const isAtEnd = currentIndex === dataLength - 1 && currentCardIndex === cardsLength - 1;
    const isRun = !state.matches(m.state.idle) && !state.matches(m.state.paused);
    const isPaused = !state.matches(m.state.paused)

    const handleRun = () => {
        send({type: "RUN"})
    }
    const handlePrevious = () => {
        send({type: "PREV"})
    }
    const handlePause = () => {
        send({type: "PAUSE"})
    }
    const handleNext = () => {
        send({type: "NEXT"})
    }
    const classList = [css.animated_div];
    classList.push(isPaused ? css.closed : css.open)
    return (
        <div className={css.display_manager}>
            <div className={classList.join(" ")}>

                <HoldButton onAction={handlePrevious} disabled={isAtStart}>
                    <div style={{fontSize: "1.5rem", padding: "0.5rem"}}>
                        <GrCaretPrevious/>
                    </div>
                </HoldButton>

                <HoldButton onAction={handleNext} disabled={isAtEnd}>
                    <div style={{fontSize: "1.5rem", padding: "0.5rem"}}>
                        <GrCaretNext/>
                    </div>
                </HoldButton>

            </div>

            <ButtonPulse isPulse={!isRun} onAction={isRun ? handlePause : handleRun} className={css.btn_pulse}>
                <div className="icon">
                    {!isRun ? <AiOutlineSound/> : <PiPauseBold/>}
                </div>
            </ButtonPulse>
        </div>
    );
};

export {PaginationManager};