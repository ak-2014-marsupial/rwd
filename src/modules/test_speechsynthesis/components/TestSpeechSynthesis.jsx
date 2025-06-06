import React, {useCallback, useContext, useEffect, useRef, useState} from 'react';

import css from "./TestSpeechSynthesis.module.css"
import {
    InputRange,
    HoldButton,
    SoundIcon,
    LineSpinner,
    IoMdMore,
    Toast,
    SpeechVoicesContext,
    HorizontalSlider
} from "../index";
import {textSynthesis, getBrowserInfo} from "../helpers";
import {useClickOutside} from "../../../shared";

const TestSpeechSynthesis = () => {
    const [pitch, setPitch] = useState(1);
    const [rate, setRate] = useState(1);
    const [selectedLanguageItem, setSelectedLanguageItem] = useState(null);
    const toastRef = useRef(null)

    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState({});

    const closeToast = useCallback(() => setIsToastOpen(false), []);
    const [isToastOpen, setIsToastOpen] = useState(false)
    const {availableVoices, errorMessage: voicesError, loading} = useContext(SpeechVoicesContext)

    useEffect(() => {
        if (Boolean(Object.keys(errorMessage).length) || Boolean(Object.keys(voicesError).length)) setIsToastOpen(true);
    }, [errorMessage, voicesError])

    const totalLoading = isLoading || loading;

    useEffect(() => {
        setSelectedLanguageItem(availableVoices[0])
    }, [availableVoices])

    useClickOutside(toastRef, closeToast)

    const synthStart = () => {
        setIsLoading(true)
        textSynthesis({
            rate,
            pitch, ...selectedLanguageItem,
            onStart: () => setIsLoading(false),
            setError: setErrorMessage
        })
    }

    const handlerDropdown = (item) => {
        setSelectedLanguageItem(prev => ({...prev, ...item}))
    }


    const handleMore = () => {
        setErrorMessage({
            message: <>
                <div>{navigator?.userAgent}  </div>
                <hr/>
                <div>lang:{selectedLanguageItem?.lang} </div>
            </>, type: "info"
        })
    }
    return (
        <div className={css.container}>
            <div className={css.wrapper_title}>
                <button className={css.btn_more} onClick={handleMore}>
                    <IoMdMore/>
                </button>
                <div className={css.title}>
                    {getBrowserInfo()}<br/>
                </div>
            </div>
            <label htmlFor="text">text to sound</label>
            <textarea
                className={css.textArea}
                id="text"
                rows="6"
                value={selectedLanguageItem?.text || "...Loading ..."}
                onChange={(e) => setSelectedLanguageItem(prev => ({...prev, text: e.target.value}))}
            ></textarea>
            <div style={{width: "100%", height: "0.5rem"}}>
                <LineSpinner isAction={totalLoading}/>
            </div>
            <HorizontalSlider items={availableVoices} isHighlight={true} onAction={handlerDropdown}
                              value={selectedLanguageItem?.lang}/>
            <div className={css.wrap_inputRange}>

                <div className={css.inputRange}>
                    <label className={css.label} htmlFor="rate">Швидкість {rate}</label>
                    <InputRange
                        min={0.8}
                        max={1.2}
                        step={0.1}
                        value={rate}
                        onChange={(e) => setRate(e.target.value)}
                        id={"rate"}
                    />
                </div>

                <div className={css.inputRange}>
                    <label className={css.label} htmlFor="pitch">Тон голосу {pitch}</label><br/>
                    <InputRange
                        min={0.8}
                        max={1.2}
                        step={0.1}
                        value={pitch}
                        onChange={(e) => setPitch(e.target.value)}
                        id={"pitch"}
                    />
                </div>
            </div>

            <HoldButton className={css.btn} onAction={synthStart}>
                <SoundIcon/>
            </HoldButton>

            <Toast ref={toastRef} isOpen={isToastOpen} message={errorMessage} onClose={closeToast}/>
        </div>
    );
};

export {TestSpeechSynthesis};