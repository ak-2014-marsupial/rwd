import React from 'react';
import {ShowText} from "../ScenarioItems/ShowText/ShowText";
import {VoiceText} from "../ScenarioItems/VoiceText/voiceText";
import {Default} from "../Default/Default";
import {PauseText} from "../ScenarioItems/PauseText/PauseText";

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
    switch (type) {
        case "show":
            RenderComponent = ShowText;
            break;
        case "sound":
            RenderComponent = VoiceText;
            break;
        case "pause":
            RenderComponent = PauseText;
            break
        default:
            RenderComponent = Default;
    }


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