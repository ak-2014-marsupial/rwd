import React, {useCallback, useEffect, useRef, useState} from 'react';

import {appConstants} from "../../constants";


const initPositionY = (key, defaultValue = 20) => {
    try {
        const storedPosition = localStorage.getItem(key);
        if (storedPosition) {
            return JSON.parse(storedPosition);
        }
    } catch (error) {
        console.error("Failed to parse position from localStorage:", error);
    }
    return defaultValue;
}

const Draggable = ({onAction, offAction, onEnter, children, ...otherProps}) => {
    const [hover, setHover] = useState(false);

    const {localStorageKeyPositionY, positionYMin, positionYUpdateThreshold} = appConstants
    const [positionY, setPositionY] = useState(initPositionY(localStorageKeyPositionY, positionYMin));


    const isDraggingRef = useRef(false);
    const latestPositionRef = useRef(positionY)
    const dragRef = useRef(null);
    const offset = useRef(0);

    const constraints = useRef({minY: positionYMin, maxY: positionYMin,});

    const updateConstraints = useCallback(() => {
        if (dragRef.current) {
            const elementHeight = dragRef.current.offsetHeight;
            constraints.current = {...constraints.current, maxY: Math.round(window.innerHeight - elementHeight)}
        }
    }, []);

    useEffect(() => {
        updateConstraints();

        window.addEventListener('resize', updateConstraints);

        return () => {
            window.removeEventListener('resize', updateConstraints);
            // Сохраняем текущую позицию в localStorage при размонтировании
            try {
                localStorage.setItem(localStorageKeyPositionY, JSON.stringify(latestPositionRef.current));
            } catch (error) {
                console.error("Failed to save position to localStorage:", error);
            }
        };
    }, [updateConstraints, localStorageKeyPositionY]);

    const handlePointerDown = (event) => {
        isDraggingRef.current = true;
        if (typeof onAction === "function") onAction();
        event.target.setPointerCapture(event.pointerId);
        offset.current = Math.round(event.clientY - positionY);
    };

    const handlePointerMove = (event) => {
        if (isDraggingRef.current) {
            const currentY = Math.round(event.clientY - offset.current)
            if (Math.abs(positionY - currentY) > positionYUpdateThreshold) {
                let newPositionY = Math.max(constraints.current.minY, Math.min(currentY, constraints.current.maxY));
                latestPositionRef.current = newPositionY;
                setPositionY(newPositionY);
            }
        }

    };

    const handlePointerUp = (event) => {
        isDraggingRef.current = false;
        if (typeof offAction === "function") offAction();
        event.target.releasePointerCapture(event.pointerId);
        let finalY = Math.round(event.clientY - offset.current);
        finalY = Math.max(constraints.current.minY, Math.min(finalY, constraints.current.maxY));
        latestPositionRef.current = finalY;
        setPositionY(finalY)
    };

    const handlePointerCancel = (event) => {
        isDraggingRef.current = false;
        if (typeof offAction === "function") offAction();
        event.target.releasePointerCapture(event.pointerId);
    };

    const handlePointerEnter = () => {
        if (typeof onEnter == "function") onEnter();
    };

    const handlePointerLeave = () => {
        if (typeof offAction === "function") offAction()
    };

    return (
        <div
            ref={dragRef}
            onPointerEnter={handlePointerEnter}
            onPointerLeave={handlePointerLeave}
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            onPointerCancel={handlePointerCancel}

            style={{
                // background: hover ? "var(--hover-color)" : "var(--accent-color)",
                userSelect: 'none',
                touchAction: 'none',
                draggable: false,
                position: "absolute",
                zIndex: "var(--burger-z-index)",
                right: 0,
                top: positionY,
                cursor: isDraggingRef.current ? 'grabbing' : 'grab',
            }}
            {...otherProps}
        >
            {children}
        </div>
    )
};

export {Draggable};