import React, {useEffect} from 'react';
import {useMainStateMachine} from "../MainStateMachineProvider";
import {machine as m} from "../../constants/machine.constants";

const Default = ({cardIndex, scenarioIndex}) => {
    const {state, send} = useMainStateMachine();
    const {currentScenarioIndex, currentCardIndex} = state.context;
    const isActive = cardIndex === currentCardIndex && currentScenarioIndex === scenarioIndex
    useEffect(() => {
        if (isActive) {
            if (state.matches(m.state.refresh)) {
                send({type: m.events.REFRESH})
            }
            if (state.matches(m.state.playingScenario)) {
                send({type: m.events.NEXT_STEP})
            }
        }
    }, [isActive, state, send]);


    // const isNotVisible = () => {
    //     if (cardIndex > currentCardIndex) {
    //         return true;
    //     }
    //     if (cardIndex === currentCardIndex && scenarioIndex > currentScenarioIndex) return true
    // }
    //
    // if (isNotVisible()) return null;

    return (
        <div>
            Default {cardIndex}/{scenarioIndex}
        </div>
    );
};

export {Default};