import {useEffect} from 'react';
import {machine as m} from "../../../constants/machine.constants";
import {useMainStateMachine} from "../../MainStateMachineProvider";

const PauseText = ({cardIndex, scenarioIndex}) => {
    const {state, send} = useMainStateMachine()
    const {currentScenarioIndex, currentCardIndex} = state.context;
    const isActive = cardIndex === currentCardIndex && currentScenarioIndex === scenarioIndex;


    useEffect(() => {
        if (isActive) {
            if (state.matches(m.state.refresh)) {
                send({type: m.events.REFRESH})
            }
            if (state.matches(m.state.playingScenario)) {
                send({type: m.events.PAUSE_TEXT})
            }
        }
    }, [isActive, state, send]);

    return null;
};

const pauseTextProps = ["cardIndex", "scenarioIndex"]

export {PauseText, pauseTextProps};