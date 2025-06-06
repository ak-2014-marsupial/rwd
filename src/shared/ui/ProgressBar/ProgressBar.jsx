import React, {useEffect, useRef, useState, useCallback} from 'react';
import css from "./ProgressBar.module.css";

const ProgressBar = ({
                         isVisible,
                         width = "95%",
                         delay,
                         onEnd = null,
                         lineColor = "var(--warning-color)"
                     }) => {
    // Ensure delay is treated as milliseconds for consistency.
    // If the intent was for `delay` to be the total duration of the progress bar,
    // then the interval calculation needs to be adjusted.
    // For now, assuming `delay` is the interval for each step of the progress.
    const animationInterval = 10; // Milliseconds, how often to update the progress
    const steps = delay / animationInterval; // Total number of steps
    const decrementPerStep = 100 / steps; // Percentage to decrement in each step

    const [progress, setProgress] = useState(100);
    const intervalIdRef = useRef(null);
    const timerIdRef = useRef(null)

    // const resetProgressBar = useCallback(() => {
    //     clearInterval(intervalIdRef.current);
    //     intervalIdRef.current = null;
    //     setProgress(100);
    // }, []);

    const stopProgressBar = useCallback(() => {
        clearInterval(intervalIdRef.current);
        intervalIdRef.current = null;
        setProgress(0); // Explicitly set to 0 when stopped
    }, []);

    // const pauseProgressBar = useCallback(() => {
    //     clearInterval(intervalIdRef.current);
    //     intervalIdRef.current = null;
    // }, []);


    const startProgressBar = useCallback(() => {
        if (intervalIdRef.current) clearInterval(intervalIdRef.current);
        intervalIdRef.current = setInterval(() => {
            setProgress(prev => {
                const newProgress = Math.max(prev - decrementPerStep, 0);
                if (newProgress <= 0) {
                    clearInterval(intervalIdRef.current);
                    intervalIdRef.current = null;
                    if (typeof onEnd === "function") {
                        timerIdRef.current = setTimeout(() => onEnd(), 10)
                    }
                }
                return newProgress;
            });
        }, animationInterval);

    }, [decrementPerStep, animationInterval, onEnd]);

    // const continueProgressBar = useCallback(() => {
    //     startProgressBar()
    // }, [startProgressBar])

    useEffect(() => {

        if (isVisible) {
            setProgress(100); // Start at 100% when visible
            startProgressBar()


        } else {
            stopProgressBar();
        }


        return () => {
            clearInterval(intervalIdRef.current);
            clearTimeout(timerIdRef.current)
        };
    }, [isVisible, startProgressBar, stopProgressBar]);


    if (!isVisible) {
        return null;
    }

    return (
        <div
            className={css.progress_bar}
            style={{
                "--progress": progress, // Renamed for clarity
                width: width,
                "--line-color": lineColor
            }}
            data-label={`Pause...${(delay / 1000).toFixed(0)}s`} // Show delay in seconds
        ></div>
    );
};

export {ProgressBar};