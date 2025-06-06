// import {machine as m} from "../constants/machine.constants";

const getTextSynthesisOptions = (context) => {
    try {
        const {
            currentIndex,
            currentCardIndex,
            currentScenarioIndex,
            data,
            common,
            scenario,
            browserVoicesMap
        } = context;

        const field = scenario[currentScenarioIndex].field;
        const item = data[currentIndex].scenarioItems[currentCardIndex][field]
        const text = item.title;
        const lang = item.lang || common["lang"][field];
        if (!text || !lang) throw new Error("Якась дурня в getTextSynthesisOptions");
        const langKey = lang.replace(/[^a-zA-Z]/g, '')
        const voices = browserVoicesMap[langKey] || [];
        return {text, lang, voice: voices[0]}
    } catch (error) {
        console.log(error.message)
        // throw error
    }
}

const checkObject = (obj) => {
    const result = JSON.parse(obj);
    if (!result || (typeof result === 'object' && Object.keys(result).length === 0)) {
        return null;
    }
    return result;
}

// const updateScenarioItem = (context, event, delta) => {
//     const {payload, guard} = event.data;
//     const newValue = Math.max(0, Math.min((payload.value + delta) * (event.data.delta || 1), 9 * (event.data.delta || 1)));
//     let result = {[payload.name]: newValue};
//
//     if (guard) {
//         const currentItem = context[m.contextFields.scenario.currentItem];
//         const newCurrentItem = {...currentItem, props: {...currentItem.props, ...result}};
//         const scenario = context[m.contextFields.scenario.currentNode];
//         const currentIndexScenario = context[m.contextFields.scenario.currentIndex];
//         scenario.splice(currentIndexScenario, 1, newCurrentItem);
//         return {currentItem: newCurrentItem, scenario};
//     }
//     return result;
// }

const addIdToNestedArrays = (obj) => {
    // Рекурсивная функция для обхода объекта
    function recursiveAddId(current) {
        if (Array.isArray(current)) {
            return current.map((item, index) => {
                // Если элемент - объект, рекурсивно обрабатываем его
                if (typeof item === 'object' && item !== null) {
                    return {...item, id: index, ...recursiveAddId(item)};
                }
                // Если элемент не объект, просто возвращаем его
                return item;
            });
        } else if (typeof current === 'object' && current !== null) {
            // Обрабатываем объект, рекурсивно вызывая для его значений
            return Object.fromEntries(
                Object.entries(current).map(([key, value]) => [key, recursiveAddId(value)])
            );
        }
        return current; // Возвращаем значение, если это не массив и не объект
    }

    return recursiveAddId(obj);
}

export {getTextSynthesisOptions, checkObject, addIdToNestedArrays}