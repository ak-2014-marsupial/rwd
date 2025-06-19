import React from 'react';
import {Default} from "../Default/Default";
import {scenarioItems} from "../ScenarioItems/index.";

const Frame = ({dataItem, currentScenario, cardIndex, scenarioIndex, currentCardIndex, currentScenarioIndex}) => {
    const {type, field} = currentScenario;

    function isNotVisible() {
        if (cardIndex > currentCardIndex) {
            return true;
        }
        if (cardIndex === currentCardIndex && scenarioIndex > currentScenarioIndex) {
            return true
        }
    }

    let RenderComponent = null;
    RenderComponent = scenarioItems[type].component || Default;

    // console.log(type, {field, word: dataItem[field], scenarioIndex, cardIndex})

    if (isNotVisible()) return null;
    return (
        <RenderComponent
            word={dataItem[field]}
            cardIndex={cardIndex}
            scenarioIndex={scenarioIndex}
            field={field}
        />
    );
};

export {Frame};