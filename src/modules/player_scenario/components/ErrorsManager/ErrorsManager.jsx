import React from 'react';
import {HoldButton, Modal} from "../../index";
import {machine as m} from "../../constants/machine.constants";
import {useMainStateMachine} from "../MainStateMachineProvider";

const ErrorsManager = () => {
    const {state,send} = useMainStateMachine();
    return (
        <Modal
            isVisible={state.matches(m.state.error)}
            onClose={() => send({type: m.events.RETRY})}
        >
            <>
                <h5>{state.context.errorMessages} </h5>
                <HoldButton onAction={() => send({type: m.events.RETRY})}>RETRY</HoldButton>
            </>
        </Modal>
    );
};

export  {ErrorsManager};