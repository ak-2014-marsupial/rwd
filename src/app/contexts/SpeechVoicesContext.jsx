import React, {createContext} from 'react';
import {useSpeechVoices} from "../hooks/useSpeechVoices";

export const SpeechVoicesContext = createContext({
    availableVoices: [],
    browserVoicesMap: {},
    loading: true,
    errorMessage: {},
});

export const SpeechVoicesProvider = ({children}) => {
    const {availableVoices, browserVoicesMap, loading, errorMessage} = useSpeechVoices();
    const contextValue = {availableVoices, browserVoicesMap, loading, errorMessage};

    return (
        <SpeechVoicesContext.Provider value={contextValue}>
            {children}
        </SpeechVoicesContext.Provider>
    );
};
