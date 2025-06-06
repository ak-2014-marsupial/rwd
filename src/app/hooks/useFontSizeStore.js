import {appConstants} from "../../shared/constants/appConstants";
import {useLocalStorageSync} from "../../shared";

const useFontSizeStore = () => {
    const {localStorageKeyFontSize, fontSizeMax, fontSizeMin} = appConstants;
    const initialValue = 16;
    const [value, setValue] = useLocalStorageSync(localStorageKeyFontSize, initialValue);

    const validateFontSize = (fontSize) => {
        const numericValue = parseInt(fontSize);
        return numericValue >= fontSizeMin && numericValue <= fontSizeMax
    }

    if (!validateFontSize(value)) {
        setValue(initialValue)
    }

    const updateValue = (newValue) => {

        if (!validateFontSize(newValue)) {
            setValue(initialValue)
        } else {
            setValue(newValue);
        }
    }
    return [value, updateValue]
}

export {useFontSizeStore}