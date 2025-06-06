import {machine} from "../constants/machine.constants";
import scenarioObj from "./scenarios.json";
import dataObj from "./data.json";
import {addIdToNestedArrays} from "../lib/mainStateMachine.helpers";

const i = machine.contextFields;

const initContext = {
    [i.data.currentNode]: {},
    [i.scenario.currentNode]: {},
    [i.data.currentIndex]: 0,
    [i.data.currentCardIndex]: 0,
    [i.scenario.currentIndex]: 0,
    [i.scenario.currentItem]: {},
    [i.sound.repeats]: 0,
    [i.sound.leftRepeats]: 0,
    [i.sound.delay]: 5,
    [i.pause.delay]: 5,
    [i.error.errorMessages]: "",
    [i.isScenarioCompleted]: false,
    [i.isCardsCompleted]: false,
    [i.isTextSynthesisPending]: false,
    [i.isCardPagination]: true,
    availableVoices:[]
}

const getPlayerScenarioInitData = ({id, scenarioId}) => {
    const scenario = scenarioObj[scenarioId].actions;
    const {data, children, common} = addIdToNestedArrays(dataObj[id]);

    const {
        data: {currentNode: fieldNameOfDataNode, common: fieldNameOfCommon},
        scenario: {currentNode: fieldNameOfScenarioNode, currentItem: fieldNameOfCurrentItem}
    } = machine.contextFields

    if (children) {
        const newData = {
            [fieldNameOfScenarioNode]: scenario,
            [fieldNameOfDataNode]: children,

            [fieldNameOfCurrentItem]: children[0]
        }

        return {...initContext, ...newData}
    }

    if (data && common) {
        const newData = {
            [fieldNameOfScenarioNode]: scenario,
            [fieldNameOfDataNode]: data,
            [fieldNameOfCommon]: common,
            [fieldNameOfCurrentItem]: data[0]
        }
        return {...initContext, ...newData}
    }
}

export {initContext, getPlayerScenarioInitData}

