import React, {forwardRef} from 'react';

import css from "./InputRange.module.css"

const InputRange = forwardRef(
    (props, ref) => {
        const {title, min, max, step = 1, value = 0, width = "90%", onChange, style,...otherProps} = props
        return (
            <div style={{display: "flex", alignItems: "center", justifyContent: "space-between", width: "100%"}}>
                <div>{title}</div>
                <div className="icon">
                    <input type="range" className={css.progressBar}
                           ref={ref}
                           min={min}
                           max={max}
                           step={step}
                           value={value}
                           onChange={(e) => onChange(e)}
                           style={{...style, width}}
                           {...otherProps}
                    />
                </div>
            </div>
        )
    }
)

export {InputRange};