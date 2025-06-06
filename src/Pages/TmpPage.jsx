import React, {useEffect, useState} from 'react';
import {ProgressBarWithPause} from "../shared/index";


const TmpPage = () => {
    const [isPaused, setIsPaused] = useState(false);
    const [isStart, setIsStart] = useState(false);

    const styleBtn = {fontSize: "2rem", color: "white", background: "blue", height: "3rem"}
    const messageObj = {message: "Hello dear friends", type: "info"}

    const onEnd = () => {
        console.log("onEnd")
        setIsStart(false)
    }
    return (
        <div
            style={{display: "flex", marginTop: "10rem", flexDirection: "column", gap: "0.5rem", alignItems: "center"}}>
            <div style={{height: "1rem", width: "100%"}}>
                <ProgressBarWithPause isStart={isStart} isPause={isPaused} duration={12} delay={12000} onEnd={onEnd}/>
            </div>
            <Toast isStart={isStart} message={messageObj} onEnd={onEnd}/>
            <button style={styleBtn}
                    onClick={() => setIsPaused(prev => !prev)}>
                Pause {isPaused.toString()}
            </button>
            <button style={styleBtn}
                    onClick={() => setIsStart(prev => !prev)}>
                Start {isStart.toString()}
            </button>
        </div>
    );
};

export {TmpPage};

const Toast = ({message, isStart, onEnd}) => {
    const [isPause, setIsPause] = useState(false);
    useEffect(() => {
        if (!isStart) {
            setIsPause(false)
        }
    }, [isStart]);


    return (
        <div style={{border: "1px solid red", width: "100%"}} onClick={() => setIsPause(prev => !prev)}>

            <h3>{message?.message}</h3>
            <div style={{height: "1rem", width: "100%"}}>
                <ProgressBarWithPause isPause={isPause} isStart={isStart} delay={12000} onEnd={onEnd}/>
            </div>

        </div>
    )
}