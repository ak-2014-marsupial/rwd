import React, {useEffect, useState} from 'react';

import {machine as m} from "../../constants/machine.constants";
import {ProgressBarWithPause} from "../../index";
import {useMainStateMachine} from "../MainStateMachineProvider";
import {CounterManager} from "../CounterManager/CounterManager";

import css from "./ProgressBarManager.module.css"

const getCurrentDelayFieldName = (context) => {
    if (Object.keys(context).length === 0) return "";
    const currentScenarioIndex = context[m.contextFields.scenario.currentIndex];
    const scenario = context[m.contextFields.scenario.currentNode];
    const type = scenario[currentScenarioIndex]?.type;
    const result = m.contextFields[type]?.delay;
    return result ? result : "";
}


const ProgressBarManager = () => {
    const {state, send} = useMainStateMachine();
    const [isCounterActive, setIsCounterActive] = useState(false)
    const isActive = state.matches(m.state.delaySound) ||
        state.matches(m.state.delayPlayingScenario)
        || isCounterActive;

    const currentDelayFieldName = getCurrentDelayFieldName(state.context)
    const currentDelay = state.context[currentDelayFieldName] * 1000 || 0;
    const currentScenarioDelay = state.context[m.contextFields.scenario.currentItem]?.props?.delay * 1000 || 0;
    const displayObj = {
        true: {name: "delay", value: currentScenarioDelay / 1000},
        false: {name: currentDelayFieldName, value: currentDelay / 1000}
    }
    useEffect(() => {
        // if (!state.matches(m.state.paused)) setIsCounterActive(false)
        if (state.value !== m.state.paused) setIsCounterActive(() => false)
    }, [state.value])

    const toggleIsCounterActiveClick = () => {
        setIsCounterActive(prev => !prev)
        send({type: "TOGGLE_PAUSE_PLAY"});
    }

    const classList = [css.ProgressBarManager];
    classList.push(isActive ? css.open : css.closed)

    const changeCount = ({type, guard}) => {
        switch (type) {
            case "inc":
                send({type: m.events.INCREMENT, data: {payload: displayObj[guard], guard}})
                break;
            case "dec":
                send({type: m.events.DECREMENT, data: {payload: displayObj[guard], guard}})
                break;
            default:
        }
    }
    return (
        <div onClick={toggleIsCounterActiveClick} className={classList.join(" ")}>
            {/*<ProgressBar*/}
            {/*    isVisible={isActive}*/}
            {/*    delay={currentDelay}*/}
            {/*/>*/}
            <ProgressBarWithPause
                isStart={isActive}
                isPause={isActive && isCounterActive}
                duration={currentDelay / 1000}
            />

            <CounterManager
                isVisible={isActive && isCounterActive}
                displayObj={displayObj}
                changeCount={changeCount}
                isActive={isCounterActive}
                onAction={toggleIsCounterActiveClick}
                style={{position: "absolute", top: "-50%"}}
            />
        </div>
    );
};

export {ProgressBarManager};