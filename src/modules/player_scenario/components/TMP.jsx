import React from 'react';
import {useMainStateMachine} from "./MainStateMachineProvider";
import {machine} from "../constants/machine.constants";

const Tmp = () => {
    const i = machine.contextFields;

    const {state} = useMainStateMachine()
    const currentIndex = state.context[i.data.currentIndex];
    const currentCardIndex = state.context[i.data.currentCardIndex];
    const currentIndexScenario = state.context[i.scenario.currentIndex];
    const delay = state.context[i.pause.delay];
    const soundDelay = state.context[i.sound.delay];
    const isCardPagination = state.context[i.isCardPagination];
    const leftRepeats = state.context[i.sound.leftRepeats];
    const availableVoices = state.context.availableVoices;
    console.log(availableVoices);
    return (
        <div>({state.value}) isCardPagination:{isCardPagination && isCardPagination.toString()}<br/>
            Index:{currentIndex}/{currentCardIndex}/{currentIndexScenario} Delay:{delay} SoundDelay:{soundDelay} leftRepeats:{leftRepeats}
        </div>
    );
};

export {Tmp};