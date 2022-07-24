/** Helpers */
import { createElement } from "../helpers/datePickerHelpers";

const initPickInterval = (rootWrapper) => {
    const wrapper = createElement("div", "date-picker__interval-wrapper");

    const intervalButtonToday = createElement(
        "div",
        "date-picker__interval-btn",
        "",
        "Dzisiaj"
    );
    const intervalButtonTommorow = createElement(
        "div",
        "date-picker__interval-btn",
        "",
        "Jutro"
    );
    const intervalButtonThisWeek = createElement(
        "div",
        "date-picker__interval-btn",
        "",
        "Ten tydzień"
    );
    const intervalButtonNextWeek = createElement(
        "div",
        "date-picker__interval-btn",
        "",
        "Przyszły tydzień"
    );
    const intervalButtonThisMonth = createElement(
        "div",
        "date-picker__interval-btn",
        "",
        "Ten miesiąc"
    );
    const intervalButtonNextMonth = createElement(
        "div",
        "date-picker__interval-btn",
        "",
        "Przyszły miesiąc"
    );
    const intervalButtonThisYear = createElement(
        "div",
        "date-picker__interval-btn",
        "",
        "Ten rok"
    );
    const intervalButtonNextYear = createElement(
        "div",
        "date-picker__interval-btn",
        "",
        "Przyszły rok"
    );
    const intervalButtonAll = createElement(
        "div",
        "date-picker__interval-btn",
        "",
        "Wszsytkie terminy"
    );

    wrapper.appendChild(intervalButtonToday);
    wrapper.appendChild(intervalButtonTommorow);
    wrapper.appendChild(intervalButtonThisWeek);
    wrapper.appendChild(intervalButtonNextWeek);
    wrapper.appendChild(intervalButtonThisMonth);
    wrapper.appendChild(intervalButtonNextMonth);
    wrapper.appendChild(intervalButtonThisYear);
    wrapper.appendChild(intervalButtonNextYear);
    wrapper.appendChild(intervalButtonAll);

    rootWrapper.appendChild(wrapper);
};

export default initPickInterval;
