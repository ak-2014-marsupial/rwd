const machine = {
    contextFields: {
        sound: {delay: "soundDelay", repeats: "soundRepeats", leftRepeats: "leftSoundRepeats"},
        error: {errorMessages: "errorMessages"},
        data: {currentIndex: "currentIndex", currentNode: "data",currentCardIndex:"currentCardIndex",common:"common"},//currentNode:"currentDataNode"
        scenario: {currentIndex: "currentScenarioIndex", currentNode: "scenario",currentItem:"currentItem"},//currentNode:"CurrentScenarioNode"
        pause: {delay: "delay"},
        isScenarioCompleted:"isScenarioCompleted",
        isCardsCompleted:"isCardsCompleted",
        isCardPagination:"isCardPagination",
        isTextSynthesisPending:"isTextSynthesisPending"
    },
    state: {
        idle: "idle",
        playingScenario: "playingScenario",
        scenarioStep: "scenarioStep",
        sound: "sound",
        delayPlayingScenario: "delayPlayingScenario",
        delaySound: "delaySound",
        paused: "paused",
        refresh: "refresh",
        textSynthesis: "textSynthesis",
        error: "error"
    },
    actions: {
        setData: "setData",
        setSound: "setSound",
        nextScenarioStep: "nextScenarioStep",
        nextCardIndex:"nextCardIndex",
        nextRepeat: "nextRepeat",
        nextIndex: "nextIndex",
        prevIndex: "prevIndex",
        prevCardIndex:"prevCardIndex",
        handleError: "handleError",
        increment: "increment",
        decrement: "decrement",
        saveToLocalStorage: "saveToLocalStorage"
    },
    events: {
        SET_DATA: "SET_DATA",
        RUN: "RUN",
        NEXT_STEP: "NEXT_STEP",
        SOUND: "SOUND",
        NEXT_REPEAT: "NEXT_REPEAT",
        REFRESH: "REFRESH",
        RETRY: "RETRY",
        RESET: "RESET",
        PAUSE: "PAUSE",
        NEXT: "NEXT",
        PREV: "PREV",
        INCREMENT: "INCREMENT",
        DECREMENT: "DECREMENT",
        // DEC_REPEAT: "DEC_REPEAT",
        // INC_REPEAT: "INC_REPEAT",
        PAUSE_TEXT: "PAUSE_TEXT",
        IDLE:"IDLE"
    }
}

export {machine}