import React, {useEffect, useRef} from 'react';
import {useMainStateMachine} from "../MainStateMachineProvider";
import {Frame} from "../Frame/Frame";

import css from "./FrameManager.module.css"

const FrameManager = () => {

    const {state} = useMainStateMachine();
    const lastItemRef = useRef(null);
    const {currentIndex, currentCardIndex, currentScenarioIndex} = state.context;

    useEffect(() => {
        if (lastItemRef.current) {
            lastItemRef.current.scrollIntoView({behavior: "smooth"});
        }
    }, [currentScenarioIndex, currentCardIndex]);

    if (Object.keys(state.context).length === 0) return null

    const scenario = state.context?.scenario;
    const title = state.context?.data[currentIndex]?.title || "";
    const scenarioItems = state.context?.data[currentIndex]?.scenarioItems || [];

    const renderFrames = (scenario, item) =>
        (<div key={item.id} className={css.card}>
            {scenario.map(s => (
                <Frame
                    // key={`${item.id} ${s.step}`}
                    key={s.id}
                    dataItem={item}
                    cardIndex={item.id}
                    scenarioIndex={s.id}
                    currentScenario={s}
                    currentCardIndex={currentCardIndex}
                    currentScenarioIndex={currentScenarioIndex}
                />
            ))}
        </div>)


    return (
        <>
            {title && <div className={css.text}>{title}</div>}
            {scenarioItems && scenario && scenarioItems.map(item => (renderFrames(scenario, item)))}
            <div ref={lastItemRef}></div>
        </>
    );
};

export {FrameManager};