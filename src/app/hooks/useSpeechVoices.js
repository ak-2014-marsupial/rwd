import {useEffect, useState} from "react";
import languages from "../../modules/test_speechsynthesis/data/textSpeechSynthesis.json";
import {filterLetters, groupByLang} from "../../modules/test_speechsynthesis/helpers";


const useSpeechVoices = () => {
    /**
     * Custom hook for getting available Speech Synthesis API voices.
     *Returns an array of voices, loading state, and possible error.
     */

    const [voices, setVoices] = useState([]);
    const [browserVoicesMap, setBrowserVoicesMap] = useState({})

    const [loading, setLoading] = useState(true);
    const [errorMessage, setErrorMessage] = useState({})
    const leftAttempt = "nothing";

    useEffect(() => {
        const populateVoiceList = () => {
            let voices = languages
            if ('speechSynthesis' in window) {
                const browserVoices = window.speechSynthesis.getVoices();

                if (browserVoices.length > 0) {
                    voices = languages.map(l => {
                        const voice = browserVoices.filter(v => {
                            return filterLetters(v.lang) === filterLetters(l.lang)
                        })[0];
                        return {...l, voice}
                    })
                    setVoices(voices);
                    setBrowserVoicesMap(groupByLang(browserVoices))

                    setLoading(false);
                    setErrorMessage({})
                } else {
                    // Если голосов нет сразу, это нормально.
                    // Они могут появиться позже через событие voiceschanged.
                    // Продолжаем ждать, не меняя loading и error.
                    // (Логика обработки, когда голоса не появляются вообще,
                    // будет зависеть от того, как долго вы готовы ждать или какой таймаут установить)
                }
            } else {
                setErrorMessage({message: "SpeechSynthesis does`t support this browser", type: "warning"})
                setLoading(false);
                setVoices([]); // Убедимся, что список голосов пуст при ошибке
            }
        };

        // 1. Пробуем получить голоса сразу при монтировании хука
        populateVoiceList();

        // 2. Добавляем слушатель события voiceschanged
        // Это событие срабатывает, когда список голосов изменяется (например, когда они загружаются)
        if ('speechSynthesis' in window) {
            window.speechSynthesis.onvoiceschanged = () => {
                populateVoiceList(); // Повторно получаем голоса при изменении
            };
        }

        // Очистка слушателя события при размонтировании компонента, который использует хук
        return () => {
            if ('speechSynthesis' in window) {
                window.speechSynthesis.onvoiceschanged = null;
            }
        };
    }, []); // Пустой массив зависимостей означает, что эффект запустится только один раз при монтировании

    return {availableVoices: voices, loading, errorMessage, leftAttempt, browserVoicesMap};
}

export {useSpeechVoices}