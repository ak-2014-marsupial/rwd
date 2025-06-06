import { useSyncExternalStore} from "react";

const useIsTouchDevice = () => {
    const isTouchDevice = () => {
        return 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    };
    const subscribe = (callback) => {
        window.addEventListener('resize', callback);

        return () => {
            window.removeEventListener('resize', callback);
        };
    };
return useSyncExternalStore(subscribe,isTouchDevice);
}

export {useIsTouchDevice}