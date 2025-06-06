import React, {useEffect, useRef} from 'react';
import {MainStateMachineProvider} from "../MainStateMachineProvider";
import {ErrorsManager} from "../ErrorsManager/ErrorsManager";
import {ProgressBarManager} from "../ProgressBarManager/ProgressBarManager";
import {FrameManager} from "../FrameManager/FrameManager";
import {PaginationManager} from "../PaginationManager/PaginationManager";

import css from "./PlayerScenario.module.css"
import {useParams} from "react-router-dom";
// import {Tmp} from "../TMP";

const PlayerScenario = () => {
    let {id, scenarioId} = useParams();
    let wakeLock = useRef(null);
    useEffect(() => {
        // Запрашиваем блокировку экрана при монтировании компонента
        wakeLock.current = requestWakeLock().then();

        // Освобождаем блокировку экрана при размонтировании компонента
        return () => {
            if (wakeLock.current) {
                releaseWakeLock(wakeLock.current).then();
            }
        };
    }, []);


    return (
        <MainStateMachineProvider playerScenarioObj={{id: +id, scenarioId}}>
            <div className={css.container}>
                {/*<Tmp/>*/}
                <ErrorsManager/>
                <FrameManager/>
                <ProgressBarManager/>
            </div>
            <PaginationManager/>
        </MainStateMachineProvider>
    );
};

export {PlayerScenario};


async function requestWakeLock() {
    if (!('wakeLock' in navigator)) {
        console.error('Screen Wake Lock API is not supported by the browser');
        return;
    }
    try {
        const wakeLock = await navigator.wakeLock.request('screen');
        console.log('Wake Lock is active');
        return wakeLock
    } catch (err) {
        console.error(`WakeLock request error: ${err.message}`);
    }
};

async function releaseWakeLock(wakeLock) {
    if (typeof wakeLock === "function") {
        await wakeLock.release();
        console.log('Wake Lock has been released');
        wakeLock = null; // Сбрасываем переменную
    }
};