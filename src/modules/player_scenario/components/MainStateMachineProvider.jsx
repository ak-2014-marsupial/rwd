import React, {createContext, useContext, useEffect, useRef} from 'react';

import {mainStateMachine} from "../lib/mainStateMachine";
import {useMachine} from "@xstate/react";
import {localStorageKeys as k} from "../index";
import {machine as m} from "../constants/machine.constants";
import {getPlayerScenarioInitData, initContext} from "../data/initContext";
import {checkObject} from "../lib/mainStateMachine.helpers";
import {SpeechVoicesContext} from "../../../app/contexts/SpeechVoicesContext";


const MainStateMachineContext = createContext();

const MainStateMachineProvider = ({playerScenarioObj = {}, children}) => {
    const [state, send] = useMachine(mainStateMachine);
    const isRunning = useRef(false);
    const activePlayerScenarioId = useRef(playerScenarioObj)
    isRunning.current = !state.matches(m.state.idle);

    const {browserVoicesMap, loading} = useContext(SpeechVoicesContext)


    useEffect(() => {
        let initData = {...getPlayerScenarioInitData(playerScenarioObj), browserVoicesMap: {}};

        if (!loading && Object.keys(browserVoicesMap).length > 0) {
            initData = ({...initData, browserVoicesMap})
        }

        if (isRunning.current) {
            // if the current PlayerScenario matches the new one,
            // set the machine to Pause, otherwise IDLE
            const currentPS = JSON.stringify(activePlayerScenarioId.current);
            const newPS = JSON.stringify(playerScenarioObj);
            if (currentPS === newPS) {
                send({type: m.events.PAUSE})
            } else {
                send({type: m.events.IDLE})
            }
        }
        const savedContext = initData ? initData : checkObject(localStorage.getItem(k.appContext));
        if (savedContext) {
            send({type: m.events.SET_DATA, context: savedContext})
        } else {
            send({type: m.events.SET_DATA, context: initContext})
        }

        activePlayerScenarioId.current = playerScenarioObj;

    }, [playerScenarioObj, send, browserVoicesMap, loading]);


    return (
        <MainStateMachineContext.Provider value={{state, send}}>
            {children}
        </MainStateMachineContext.Provider>
    );
};

const useMainStateMachine = () => {
    return useContext(MainStateMachineContext)
}


export {MainStateMachineProvider, useMainStateMachine};