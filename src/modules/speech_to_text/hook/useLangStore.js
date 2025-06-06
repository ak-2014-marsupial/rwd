import {languages, useLocalStorageSync, localStorageKeyLang} from "../index";

const useLangStore = () => {
    return useLocalStorageSync(localStorageKeyLang, Object.keys(languages)[0])
}

export {useLangStore}