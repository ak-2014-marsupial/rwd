import {assign, createMachine, fromPromise} from 'xstate';

import {textSynthesis} from "./textSynthesis";
import {getTextSynthesisOptions} from "./mainStateMachine.helpers";

import {machine as m} from "../constants/machine.constants";

const commonTransitions = {
    IDLE: {target: m.state.idle},
    PAUSE: {target: m.state.paused},
    NEXT: [
        {target: m.state.paused, actions: m.actions.nextIndex, guard: "isIndexPagination"},
        {target: m.state.paused, actions: m.actions.nextCardIndex, guard: "isNestedPagination"},
    ],
    PREV: [
        {target: m.state.paused, actions: m.actions.prevIndex, guard: "isIndexPagination"},
        {target: m.state.paused, actions: m.actions.prevCardIndex, guard: "isNestedPagination"},
    ]
};

const mainStateMachine = createMachine(
    {
        id: 'wordMachine',
        initial: 'idle',
        context: {},

        states: {
            idle: {
                on: {
                    SET_DATA: {target: m.state.idle, actions: m.actions.setData},
                    RUN: {target: m.state.playingScenario},
                },
            },
            playingScenario: {
                entry: assign(() => ({isCardPagination: false})),
                always: [
                    // todo make transition if delay=0
                    {actions: m.actions.nextIndex, guard: "isCardComplete"},
                    {actions: m.actions.nextCardIndex, guard: "isScenarioComplete"},
                ],

                on: {
                    ...commonTransitions,

                    NEXT_STEP: {actions: m.actions.nextScenarioStep, target: m.state.playingScenario},
                    SOUND: {target: m.state.sound},
                    PAUSE_TEXT: [
                        {target: m.state.delayPlayingScenario, guard: "isDelayPlayingScenario"}
                    ],
                },
            },
            scenarioStep: {
                always: {target: m.state.playingScenario, actions: m.actions.nextScenarioStep}
            },
            sound: {
                always: [
                    {target: m.state.scenarioStep, guard: "isRepeatsComplete"},
                    {target: m.state.textSynthesis}

                ],
                on: {
                    ...commonTransitions,
                    NEXT_REPEAT: [
                        {target: m.state.playingScenario, guard: "isRepeatsComplete"},
                        {target: m.state.delaySound, guard: "isDelaySound", actions: m.actions.nextRepeat},
                        {target: m.state.sound, actions: m.actions.nextRepeat}
                    ],

                }
            },
            delayPlayingScenario: {
                after: {
                    DELAY: {target: m.state.playingScenario, actions: m.actions.nextScenarioStep}
                },
                on: {
                    RUN: {target: m.state.playingScenario},
                    ...commonTransitions
                },
            },
            delaySound: {
                after: {
                    DELAY_SOUND: {target: m.state.sound}
                },
                on: {
                    ...commonTransitions,
                    RUN: {target: m.state.playingScenario},
                    "TOGGLE_PAUSE_PLAY": {target: m.state.paused}
                },
            },
            paused: {
                entry: assign(() => ({isCardPagination: true})),
                always: {actions: () => window.speechSynthesis.cancel()},
                on: {
                    ...commonTransitions,
                    RUN: {target: m.state.refresh},
                    INCREMENT: {target: m.state.paused, actions: [m.actions.increment, m.actions.saveToLocalStorage]},
                    DECREMENT: {target: m.state.paused, actions: [m.actions.decrement, m.actions.saveToLocalStorage]},
                    // REFRESH: {target: m.state.sound, actions: () => console.log("REFRESH")},
                    REFRESH: {target: m.state.refresh},
                    "TOGGLE_PAUSE_PLAY": {target: m.state.sound}
                },
            },
            refresh: {
                always: {target: m.state.sound, actions: [m.actions.nextScenarioStep]},
                // on: {
                //     REFRESH: {target: m.state.sound, actions: [m.actions.nextScenarioStep]},
                // }
            },
            textSynthesis: {
                entry: assign(() => ({isTextSynthesisPending: true})),
                invoke: {
                    id: "textSynthesis",
                    src: fromPromise(({input}) => textSynthesis({input})),

                    input: ({context, self}) => {
                        return {parent: self, ...getTextSynthesisOptions(context)}
                    },
                    onDone: {target: m.state.delaySound, actions: m.actions.nextRepeat},
                    onError: {
                        target: m.state.error,
                        actions: m.actions.handleError
                    }
                },
                on: {
                    ...commonTransitions,
                    "PENDING_END": {actions: assign(() => ({isTextSynthesisPending: false}))},
                }
            },
            error: {
                on: {
                    RETRY: {target: m.state.playingScenario, actions: assign(() => ({errorMessages: ""}))},
                    RESET: {target: m.state.idle},
                    HANDLE_ERROR: {
                        actions: assign(({context, event}) => {
                            console.log("HANDLE_ERROR");
                            return {errorMessages: event.error}
                        }),
                        target: m.state.paused
                    }
                }
            },
        },
    }, {
        actions: {
            setData: assign(({event}) => (event.context)),

            setSound: assign(({context}) => {
                    // const currentIndex = context[m.contextFields.scenario.currentIndex];
                    // const {repeats, delay} = context.scenario[currentIndex].props
                    // return {soundDelay: delay, leftSoundRepeats: repeats}
                    return {}
                }
            ),

            nextScenarioStep: assign(({context}) => {
                const {[m.contextFields.scenario.currentIndex]: currentIndexScenario, scenario} = context;
                const dataLength = scenario.length;
                const newScenarioIndex = (currentIndexScenario + 1) % dataLength
                const newScenarioItem = scenario[newScenarioIndex];
                const {repeats: newRepeats, delay: newDelay} = context.scenario[newScenarioIndex].props

                return {
                    [m.contextFields.scenario.currentIndex]: newScenarioIndex,
                    [m.contextFields.scenario.currentItem]: newScenarioItem,
                    [m.contextFields.isScenarioCompleted]: dataLength - 1 === currentIndexScenario,
                    [m.contextFields.sound.delay]: newDelay ? newDelay : 1,
                    [m.contextFields.sound.leftRepeats]: newRepeats ? newRepeats : 0
                }
            }),

            nextRepeat: assign(({context}) => {
                const {leftSoundRepeats} = context;
                return {leftSoundRepeats: leftSoundRepeats - 1}
            }),

            nextCardIndex: assign(({context}) => {
                const {currentIndex, currentCardIndex, currentScenarioIndex, data} = context
                if (data.length === 0) return {}

                const dataLength = data[currentIndex].scenarioItems?.length;
                const isCardComplete = dataLength - 1 === currentCardIndex;
                const newCardIndex = isCardComplete ? currentCardIndex : (currentCardIndex + 1) % dataLength;
                const newScenarioIndex = isCardComplete ? currentScenarioIndex : 0;
                return {
                    [m.contextFields.data.currentCardIndex]: newCardIndex,
                    [m.contextFields.scenario.currentIndex]: newScenarioIndex,
                    [m.contextFields.isScenarioCompleted]: false,
                    [m.contextFields.isCardsCompleted]: isCardComplete
                }
            }),
            prevCardIndex: assign(({context}) => {
                const {currentIndex, currentCardIndex, currentScenarioIndex, data} = context;
                if (data.length === 0) return {}
                const dataLength = data[currentIndex].scenarioItems.length;
                const isCardComplete = currentCardIndex === 0;
                const newCardIndex = isCardComplete ? currentCardIndex : (currentCardIndex - 1) % dataLength;
                const newScenarioIndex = isCardComplete ? currentScenarioIndex : 0;
                return {
                    [m.contextFields.data.currentCardIndex]: newCardIndex,
                    [m.contextFields.scenario.currentIndex]: newScenarioIndex,
                    [m.contextFields.isScenarioCompleted]: false,
                    [m.contextFields.isCardsCompleted]: isCardComplete
                }
            }),
            nextIndex: assign(({context}) => {
                const {currentIndex, data} = context;
                const dataLength = data.length;
                const newIndex = (currentIndex + 1) % dataLength;
                return {
                    [m.contextFields.data.currentIndex]: newIndex,
                    [m.contextFields.data.currentCardIndex]: 0,
                    [m.contextFields.isCardsCompleted]: false,
                    [m.contextFields.isCardPagination]: false
                }
            }),
            prevIndex: assign(({context}) => {
                const {currentIndex, data} = context;
                const dataLength = data.length;
                const newIndex = (currentIndex - 1 + data.length) % dataLength;
                return {
                    [m.contextFields.data.currentIndex]: newIndex,
                    [m.contextFields.data.currentCardIndex]: 0,
                    [m.contextFields.isCardsCompleted]: false,
                    [m.contextFields.isCardPagination]: false
                }
            }),

            increment: assign(({context, event}) => {
                const {payload, guard} = event.data;
                const delta = event.data.delta || 1;
                let result = {}
                result = {[payload.name]: Math.min((payload.value + 1) * delta, 9 * delta)}
                if (!guard) {
                    return result
                } else {
                    const currentItem = context[m.contextFields.scenario.currentItem];
                    const newCurrentItem = {...currentItem, props: {...currentItem.props, ...result}}

                    const scenario = context[m.contextFields.scenario.currentNode];
                    const currentIndexScenario = context[m.contextFields.scenario.currentIndex]
                    scenario.splice(currentIndexScenario, 1, newCurrentItem)

                    return {currentItem: newCurrentItem, scenario}
                }
            }),
            decrement: assign(({context, event}) => {
                const {payload, guard} = event.data;
                const delta = event.data.delta || 1;
                let result = {}
                result = {[payload.name]: Math.max((payload.value - 1) * delta, 0)}
                if (!guard) {
                    return result
                } else {
                    const currentItem = context[m.contextFields.scenario.currentItem];
                    const newCurrentItem = {...currentItem, props: {...currentItem.props, ...result}}

                    const scenario = context[m.contextFields.scenario.currentNode];
                    const currentIndexScenario = context[m.contextFields.scenario.currentIndex]
                    scenario.splice(currentIndexScenario, 1, newCurrentItem)

                    return {currentItem: newCurrentItem, scenario}
                }
            }),
            [m.actions.saveToLocalStorage]: ({context, event}) => {
                // const {payload, guard} = event.data;
                // const {currentItem} = context
                // if (!guard) return {}
                // // localStorage.setItem(k.appContext, JSON.stringify(context))
                //
                //
                // const payloadKeys = Object.keys(payload);
                // const key = payloadKeys[0]
                //
                // console.log("saveToLocalStorage:", {[key]: context[m.contextFields.sound.leftRepeats]});
                // return {}
            },
            handleError: ({context, event}) => {
                context.errorMessages = event.error.message
            },
        },
        guards: {
            isScenarioComplete: ({context}) => {
                return context.isScenarioCompleted;
            },
            isCardComplete: ({context}) => {
                return context.isCardsCompleted;
            },
            isNestedPagination: ({context}) => {
                const {isCardPagination, isCardsCompleted} = context;
                return isCardPagination || !isCardsCompleted
            },
            isIndexPagination: ({context}) => {
                const {isCardPagination, isCardsCompleted} = context
                return !isCardPagination || isCardsCompleted
            },

            isRepeatsComplete: ({context}) => {
                return context.leftSoundRepeats === 0
            },
            isDelaySound: ({context}) => context.soundDelay > 0,
            isDelayPlayingScenario: ({context}) => context.delay > 0
        },
        delays: {
            DELAY: ({context}) => context.delay * 1000,
            DELAY_SOUND: ({context}) => context.soundDelay * 1000,
        }
    })
;


export {mainStateMachine}

