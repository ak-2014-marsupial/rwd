import React, {useState} from 'react';

import {SpeechToText} from "../modules/speech_to_text";
import {ButtonPulse} from "../shared";

const SpeechToTextPage = () => {
    const [transcript, setTranscript] = useState("");
    const handleTranscriptChange = (newTranscript) => {
        setTranscript(newTranscript);
    };
    return (
        <>
            <p>Transcript: {transcript}</p>
            <SpeechToText onTranscriptChange={handleTranscriptChange}/>
            <ButtonPulse/>
        </>
    )

};

export {SpeechToTextPage};