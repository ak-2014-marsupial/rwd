import languages from "../data/textSpeechSynthesis.json";
import {filterLetters} from "../helpers";
import {useEffect, useState} from "react";

const useSpeechVoice_old = () => {
    const [attempt, setAttempt] = useState(3)
    const [voices, setVoices] = useState([])
    const [leftAttempt, setLeftAttempt] = useState("");
    const [errorMessage, setErrorMessage] = useState({});
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        const synth = window.speechSynthesis;
        let timerId = null;
        if (!synth) {
            setErrorMessage({message: "SpeechSynthesis does`t support this browser", type: "warning"})
        }
        const populateVoiceList = () => {
            setLoading(true);
            const browserVoices = synth.getVoices();

            let voices = languages
            if (Boolean(browserVoices.length)) {
                voices = languages.map(l => {
                    const voice = browserVoices.filter(v => {
                        return filterLetters(v.lang) === filterLetters(l.lang)
                    })[0];
                    return {...l, voice}
                })
                setAttempt(0);


            } else {
                setAttempt(prev => prev -= 1)
            }
            setVoices(voices);
        };
        if (attempt > 0) {
            setLeftAttempt(prev => prev + "/" + attempt)
            clearTimeout(timerId);
            timerId = setTimeout(() => {
                populateVoiceList();
                setLoading(false)
            }, 100);

        }
        return () => clearTimeout(timerId);

    }, [attempt]);

    return {voices, errorMessage, leftAttempt, loading}
}

export {useSpeechVoice_old}