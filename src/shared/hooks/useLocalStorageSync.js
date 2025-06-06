import {useSyncExternalStore} from "react";

const useLocalStorageSync = (key, initialValue) => {

    const getSnapshot = () => {
        const storedValue = localStorage.getItem(key);
        try {
            const result = JSON.parse(storedValue)
            return result ? result : initialValue;
        } catch (error) {
            return initialValue;
        }
    }

    const subscribe = (callback) => {
        window.addEventListener("storage", callback);
        return () => {
            window.removeEventListener("storage", callback);
        };
    };

    const value = useSyncExternalStore(subscribe, getSnapshot);

    const setValue = (newValue) => {
        localStorage.setItem(key, JSON.stringify(newValue))
        window.dispatchEvent(new Event("storage"));

    }

    return [value, setValue]
}

export {useLocalStorageSync}