import {appConstants} from "../../shared/constants/appConstants";
import {useFontSizeStore} from "../hooks/useFontSizeStore";
import {InputRange} from "../../shared";


const {fontSizeMax, fontSizeMin, fontSizeStep} = appConstants;

const FontSizeChanger = () => {

    const [fontSize, setFontSize] = useFontSizeStore();
    const handleChange = (e) => {
        const value = e.target.value;
        setTimeout(() => setFontSize(value), 150);
    }
    return (
        <InputRange
            title="FontSize"
            min={fontSizeMin}
            max={fontSizeMax}
            step={fontSizeStep}
            value={Number(fontSize) || 16}
            onChange={handleChange}
        />
    );
};

export {FontSizeChanger};
