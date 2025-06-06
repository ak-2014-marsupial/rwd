import React, {useEffect} from 'react';

import css from "./ShowText.module.css"
import {machine as m} from "../../../constants/machine.constants";
import {useMainStateMachine} from "../../MainStateMachineProvider";

const ShowText = ({word, cardIndex, scenarioIndex, field}) => {
    const {state, send} = useMainStateMachine();
    const {currentScenarioIndex, currentCardIndex} = state.context;
    const isActive = cardIndex === currentCardIndex && currentScenarioIndex === scenarioIndex
    const {title="", words=[]} = word;
    useEffect(() => {
        if (isActive) {

            if (state.matches(m.state.refresh)) {
                send({type: m.events.REFRESH})
            }
            if (state.matches(m.state.playingScenario)) {
                send({type: m.events.NEXT_STEP})
            }
        }
    }, [isActive, state, send]);

    const getColorText = (field) => {
        const mapColorsByField = {
            foreign: "var(--text-color)",
            native: "var(--dropdown-color)",

            // foreign: "var(--primary-color)",
            // native: "var(--secondary-color)"
        }

        return mapColorsByField[field] || "var(--text-color)"
    }

    const highlightWords = (text, words) => {
        const regex = new RegExp(`(${words.join('|')})`, 'gi'); // Создаем регулярное выражение для поиска слов
        const parts = text.split(regex); // Разделяем текст на части по совпадениям

        return parts.map((part, index) => {
            // Если часть совпадает с одним из слов, оборачиваем в <span> с классом для подсветки
            if (words.some(word => word.toLowerCase() === part.toLowerCase())) {
                return <span key={index} style={{fontStyle:"italic",textDecoration: "underline  var(--error-color)"}}>{part}</span>;
            }
            return part; // Возвращаем часть текста без изменений
        });
    };

    return (
        <div className={css.show_text} style={{color: getColorText(field)}}>
            {highlightWords(title, words)}
        </div>
    );
};

export {ShowText};