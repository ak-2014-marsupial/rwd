import {useSyncExternalStore} from "react";

const useIsOnline = (query) => {
    const getSnapshot = () => {
        return navigator.onLine;
    };

    const subscribe = (callback) => {
        window.addEventListener('online', callback);
        window.addEventListener('offline', callback);
        return () => {
            window.removeEventListener('online', callback);
            window.removeEventListener('offline', callback);
        }
    }
    return  useSyncExternalStore(subscribe, getSnapshot);
}

    export {useIsOnline};