import React, {useEffect, useRef, useState, useCallback} from 'react';
import css from "./ProgressBar.module.css";

const ProgressBarWithPause = ({
                                  isStart,
                                  isPause = false,
                                  width = "95%",
                                  duration = 12,
                                  onEnd = null,
                                  lineColor = "var(--warning-color)"
                              }) => {

    const animationInterval = 10; // Milliseconds, how often to update the progress
    const steps = duration * 1000 / animationInterval; // Total number of steps
    const decrementPerStep = 100 / steps; // Percentage to decrement in each step

    const [progress, setProgress] = useState(100);
    const intervalIdRef = useRef(null);
    const timerIdRef = useRef(null);
    const isProcessRef = useRef(false);

    // const resetProgressBar = useCallback(() => {
    //     clearInterval(intervalIdRef.current);
    //     intervalIdRef.current = null;
    //     setProgress(100);
    // }, []);

    const stopProgressBar = useCallback(() => {
        clearInterval(intervalIdRef.current);
        intervalIdRef.current = null;
        setProgress(0); // Explicitly set to 0 when stopped
        isProcessRef.current = false;
    }, []);

    const pauseProgressBar = useCallback(() => {
        clearInterval(intervalIdRef.current);
        intervalIdRef.current = null;
    }, []);

    const handleOnEnd = () => {
        isProcessRef.current = false;
        if (typeof onEnd === "function") onEnd();
    }


    const startProgressBar = useCallback(() => {
        if (intervalIdRef.current) clearInterval(intervalIdRef.current);
        isProcessRef.current = true;
        intervalIdRef.current = setInterval(() => {
            setProgress(prev => {
                const newProgress = Math.max(prev - decrementPerStep, 0);
                if (newProgress <= 0) {
                    clearInterval(intervalIdRef.current);
                    intervalIdRef.current = null;
                    timerIdRef.current = setTimeout(() => {
                        handleOnEnd()
                    }, 10)
                }
                return newProgress;
            });
        }, animationInterval);

    }, [decrementPerStep, animationInterval])

    const continueProgressBar = useCallback(() => {
        startProgressBar()
    }, [startProgressBar]);


    useEffect(() => {
        if (isStart) {
            if (!isProcessRef.current) {
                setProgress(100); // Start at 100% when visible
                startProgressBar()
            } else {
                if (isPause) {
                    pauseProgressBar()
                } else {
                    continueProgressBar()
                }
            }
        } else {
            stopProgressBar();
        }


        return () => {
            clearInterval(intervalIdRef.current);
            clearTimeout(timerIdRef.current)
        };
    }, [isStart, isPause, startProgressBar, stopProgressBar, continueProgressBar, pauseProgressBar]);


    if (!isStart) {
        return null;
    }

    return (
        <div
            className={css.progress_bar}
            style={{
                "--progress": progress,
                width: width,
                "--line-color": lineColor
            }}
            data-label={`Pause...${(duration).toFixed(0)}s`}
        ></div>
    );
};

export {ProgressBarWithPause};