import {useMediaQuery} from "../../shared";


const useResponsiveMode = () => {
    const isMobile = useMediaQuery('(max-width: 50rem)');
    const isTablet = useMediaQuery('(min-width: 50.1rem) and (max-width: 85rem)');
    const isDesktop = useMediaQuery('(min-width: 85.1rem)');
    if (isMobile) {
        return {mode: "mobile", rate: 1.2}
    } else if (isTablet) {
        return {mode: "tablet", rate: 1.2}
    } else if (isDesktop) {
        return {mode: "desktop", rate: 1}
    }
}

export {useResponsiveMode}