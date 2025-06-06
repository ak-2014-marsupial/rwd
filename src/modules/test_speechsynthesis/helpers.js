const textSynthesis = ({text, lang, rate, pitch, onStart, voice,voices, setError}) => {
    const synth = window.speechSynthesis;
    try {
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.onend = () => {
            if (!voice) {
                setError({
                    message: `Якщо ви чули якусь дурню або тишу, це означає, що ваш браузер не підтримує ${lang} мову`,
                    type: "info"
                })
            }
        }
        utterance.onstart = () => {
            onStart()
        }

        utterance.onerror = (error) => {
            setError({message: `Щось не зовсім гарне трапилось з сінтезом мови. Спробуйте ще раз.`, type: "warning"})

            // console.log('Error from textSynthesis: ' + error.message)
        }
        utterance.pitch = pitch;
        utterance.rate = rate;
        utterance.volume = 1;
        utterance.lang = lang;
        utterance.voice = voice;


        setTimeout(() => {
            if (synth.speaking) {
                synth.cancel()
            }
            synth.speak(utterance)
        }, 50);

    } catch (error) {
        setError({
            message: `Сінтезом мови не можливий. Спробуйте ще раз, але це навряд чи допоможе.`,
            type: "error",
            moreInfo: error.message
        })

        // console.log("Failed to create SpeechSynthesisUtterance: ", error.message)
    }

}


const filterLetters = (str) => str.replace(/[^a-zA-Z]/g, '');

// const groupByLang_2 = (arr) => {
//     return arr.reduce((acc, item) => {
//         const langKey = filterLetters(item.lang);
//         if (!acc.has(langKey)) {
//             acc.set(langKey, []);
//         }
//         acc.get(langKey).push(item);
//         return acc;
//     }, new Map()); // Начинаем с пустого Map
// }

const groupByLang = (arr) => {
    return arr.reduce((acc, item) => {
        const langKey = filterLetters(item.lang);

        if (!(langKey in acc)) {
            acc[langKey] = [];
        }
        acc[langKey].push(item);
        return acc;
    }, {});
}

// const addVoicesByLang = (arr = [], obj = {}) => {
//     return arr.map(i => ({...i, voices: obj[filterLetters(i.lang)] || []}));
// };

const getBrowserInfo = () => {
    const regex = /\b(Chrome|Safari|Firefox|Edge)\b/g;
    const userAgent = navigator.userAgent;
    const briefList = userAgent.split(" ").filter(i => i.match(regex));
    return briefList.length > 0 ? briefList.join("  ") : userAgent
}
export {textSynthesis, filterLetters, getBrowserInfo, groupByLang }