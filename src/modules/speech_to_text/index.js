import SpeechRecognition, {useSpeechRecognition,} from "react-speech-recognition";
import {HoldButton, Dropdown, IconWithRotation, useLocalStorageSync,BurgerIcon} from "../../shared/index";
import {SlArrowDown} from "react-icons/sl";
import {appConstants} from "../../shared/constants/appConstants";

const languagesDefault = {
    'uk-UK': "Ukr",
    'en-GB': "Eng",
}
const languages = appConstants.languages || languagesDefault;
const localStorageKeyLang=appConstants.localStorageKeyLang || "app-lang";
export {
    SpeechRecognition,
    useSpeechRecognition,
    HoldButton,
    Dropdown,
    BurgerIcon,
    IconWithRotation,
    SlArrowDown as ArrowDown,
    languages,
    localStorageKeyLang,
    useLocalStorageSync,
}
export {SpeechToText} from "./SpeechToText";
export {SpeechToTextChangeLanguage} from "./SpeechToTextChangeLanguage";