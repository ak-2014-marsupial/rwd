import {ShowText, showTextProps} from "./ShowText/ShowText";
import {PauseText, pauseTextProps} from "./PauseText/PauseText";
import {VoiceText, voiceTextProps} from "./VoiceText/VoiceText";

const scenarioItems = {
    "show": {component: ShowText, props: showTextProps},
    "sound": {component: VoiceText, props: voiceTextProps},
    "pause": {component: PauseText, props: pauseTextProps},
}

export {scenarioItems}