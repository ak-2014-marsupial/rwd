import React, {useEffect} from 'react';
import {HoldButton, SpeechRecognition, useSpeechRecognition, languages} from "./index";

import css from "./SpeechToText.module.css";
import {SpeechToTextChangeLanguage} from "./index";
import {useLangStore} from "./hook/useLangStore";

const SpeechToText = (props) => {
    const {onTranscriptChange} = props;
    const {transcript, listening, resetTranscript} = useSpeechRecognition();

    const [keyLang] = useLangStore()
    const startListening = () => {
        resetTranscript();
        SpeechRecognition.startListening({continuous: true, keyLang})
    }

    const stopListening = () => {
        SpeechRecognition.stopListening();
    }

    useEffect(() => {
        onTranscriptChange(transcript)
    }, [transcript, onTranscriptChange]);

    return (
        <div className={[css.speech_to_text, listening ? css.hold_microphone : ""].join(" ")}>
            <SpeechToTextChangeLanguage languages={languages}/>

            <HoldButton onAction={startListening} offAction={stopListening}><div style={{fontSize:"1.5rem",padding:"0.5rem"}}>Start</div></HoldButton>
        </div>
    );
};

export {SpeechToText};