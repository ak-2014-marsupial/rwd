import React from 'react';
import {Dropdown, IconWithRotation, ArrowDown} from "./index";
import {useLangStore} from "./hook/useLangStore";

const SpeechToTextChangeLanguage = ({languages}) => {

    const [lang, setLang] = useLangStore()

    return (
        <Dropdown options={languages} onChange={setLang} value={lang}>
            <IconWithRotation component={ArrowDown}/>
        </Dropdown>
    );
};

export {SpeechToTextChangeLanguage};