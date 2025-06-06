import {useRef} from "react";

const useRenderCount = () => {
    const count = useRef(0);
    count.current++;
    return count.current
}

export {useRenderCount}