import {useEffect} from "react";

const useClickOutside = (ref, callback) => {
    const handleClick = (e) => {
        if(!ref.current) return
        if (!ref.current.contains(e.target)) {
            callback(e);
        }
    }
    useEffect(() => {
        document.addEventListener("mousedown", handleClick);
        document.addEventListener("touchstart", handleClick);
        return () => {
            document.removeEventListener("mousedown", handleClick)
            document.removeEventListener("touchstart", handleClick)
        }
    });
}

export {useClickOutside}