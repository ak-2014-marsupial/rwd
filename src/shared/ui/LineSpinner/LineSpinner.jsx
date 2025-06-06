import React, {useEffect, useState} from 'react';

import css from "./LineSpinner.module.css"

const LineSpinner = ({isAction, delayAction = 0}) => {
    const [isVisible, setIsVisible] = useState(isAction);
    //implement debounce:
    useEffect(() => {
        let timerId = null
        if (Boolean(delayAction)) {
            clearTimeout(timerId)
            if(isAction){
                timerId= setTimeout(() => {
                    setIsVisible(true)
                }, delayAction)
            } else {
                setIsVisible(false)
            }
        } else setIsVisible(isAction)

        return () => clearTimeout(timerId);
    }, [isAction, delayAction])


    if (!isVisible) return null;
    return (
        <div className={css.container}>
            <div className={css.loading}></div>
        </div>
    );
};

export {LineSpinner};