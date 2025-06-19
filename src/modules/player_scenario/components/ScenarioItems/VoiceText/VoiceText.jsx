import React, {useEffect, useState} from 'react';
import {CounterManager} from "../../CounterManager/CounterManager";

import {machine as m} from "../../../constants/machine.constants";

import {LineSpinner} from "../../../index";
import {useMainStateMachine} from "../../MainStateMachineProvider";

const VoiceText = ({cardIndex, scenarioIndex}) => {

    const {state, send} = useMainStateMachine()

    const {leftSoundRepeats, currentScenarioIndex, currentCardIndex, isTextSynthesisPending} = state.context;
    // console.log("VoiceText",{cardIndex,currentCardIndex,scenarioIndex,currentScenarioIndex})
    const isActive = cardIndex === currentCardIndex && currentScenarioIndex === scenarioIndex

    const [isCounterActive, setIsCounterActive] = useState(false);

    useEffect(() => {
        if (isActive) {
            send({type: m.events.SOUND})
        }
    }, [isActive, send]);

    useEffect(() => {
        if (state.matches(m.state.refresh)) {
            send({type: m.events.REFRESH})
        }
        if (state.matches(m.state.playingScenario) || state.matches(m.state.sound)) {
            send({type: m.events.NEXT_REPEAT});
        }
        if (state.matches(m.state.textSynthesis)) {
            setIsCounterActive(false)
        }

    }, [send, state]);
    const soundRepeats = state.context[m.contextFields.scenario.currentItem]?.props.repeats || 1;
    const displayObj = {
        true: {name: "repeats", value: soundRepeats},
        false: {name: m.contextFields.sound.leftRepeats, value: leftSoundRepeats}
    }

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

    const onAction = () => {
        if (isCounterActive) {
            send({type: m.events.REFRESH})

        } else {
            send({type: m.events.PAUSE})
        }
        setIsCounterActive(prev => !prev)
    }

    return (
        <>
            {isActive && <LineSpinner isAction={isTextSynthesisPending} delayAction={1000}/>}
            <CounterManager
                isVisible={isActive}
                displayObj={displayObj}
                changeCount={changeCount}
                isActive={isCounterActive}
                onAction={onAction}
            />
        </>
    );
};

const voiceTextProps = ["cardIndex", "scenarioIndex"]


export {VoiceText, voiceTextProps};