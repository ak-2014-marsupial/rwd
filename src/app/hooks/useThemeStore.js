import {useLocalStorageSync} from "../../shared";
import {appConstants} from "../../shared/constants/appConstants";

const useThemeStore = () => {
    const initTheme = appConstants.availableThemes[0] || "light";
    return useLocalStorageSync(appConstants.localStorageKeyTheme, initTheme)
};

export {useThemeStore};
