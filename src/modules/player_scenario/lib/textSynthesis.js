const textSynthesis = async ({input}) => {
    const {text = "Hello my dear friends", lang, voice, parent: {send}} = input;
    return new Promise((resolve, reject) => {
        try {
            const synth = window.speechSynthesis;
            if (!synth) {
                reject(new Error("SpeechSynthesis does`t support this browser"))
            }
            const utterance = new SpeechSynthesisUtterance(text);
            utterance.onstart = () => {
                send({type: "PENDING_END"})
            }
            utterance.onend = () => {
                // reject(new Error('Speech synthesis error: ' ))
                resolve();
            }
            utterance.onerror = (error) => {
                reject(new Error('from textSynthesis: ' + error.message))
            }

            utterance.pitch = 0.8;
            utterance.rate = 1;
            utterance.volume = 1;
            utterance.lang = lang;
            utterance.voice = voice;

            setTimeout(() => synth.speak(utterance), 70);
        } catch (error) {
            reject(new Error("Failed to create SpeechSynthesisUtterance: ", error.message))
        }
    })
}


export {textSynthesis}