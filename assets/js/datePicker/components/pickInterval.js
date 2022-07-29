/** Helpers */
import { createElement } from "../helpers/datePickerHelpers";

/** Methods */
import { handleIntervalClick } from "../methods/handleIntervalClick";

/**
 * Initialize dates interval picker in complex mode
 *
 * @param {HTMLElement} rootWrapper - root wrapper of date-picker
 * @param {Function} getCalendarsData  - function passed from datePicker init to handle data
 */
const initPickInterval = (rootWrapper, getCalendarsData) => {
    const wrapper = createElement("div", "date-picker__interval-wrapper");

    const intervalButtonToday = createElement(
        "div",
        "js-date-picker-interval-btn date-picker__interval-btn",
        "",
        "Dzisiaj"
    );

    intervalButtonToday.dataset["interval"] = "today";

    intervalButtonToday.addEventListener("click", (e) =>
        handleIntervalClick(e, "today", getCalendarsData)
    );

    const intervalButtonTommorow = createElement(
        "div",
        "js-date-picker-interval-btn date-picker__interval-btn",
        "",
        "Jutro"
    );

    intervalButtonTommorow.dataset["interval"] = "tommorrow";

    intervalButtonTommorow.addEventListener("click", (e) =>
        handleIntervalClick(e, "tommorrow", getCalendarsData)
    );

    const intervalButtonThisWeek = createElement(
        "div",
        "js-date-picker-interval-btn date-picker__interval-btn",
        "",
        "Ten tydzień"
    );

    intervalButtonThisWeek.dataset["interval"] = "thisWeek";

    intervalButtonThisWeek.addEventListener("click", (e) =>
        handleIntervalClick(e, "thisWeek", getCalendarsData)
    );

    const intervalButtonNextWeek = createElement(
        "div",
        "js-date-picker-interval-btn date-picker__interval-btn",
        "",
        "Przyszły tydzień"
    );

    intervalButtonNextWeek.dataset["interval"] = "nextWeek";

    intervalButtonNextWeek.addEventListener("click", (e) =>
        handleIntervalClick(e, "nextWeek", getCalendarsData)
    );

    const intervalButtonThisMonth = createElement(
        "div",
        "js-date-picker-interval-btn date-picker__interval-btn",
        "",
        "Ten miesiąc"
    );

    intervalButtonThisMonth.dataset["interval"] = "thisMonth";

    intervalButtonThisMonth.addEventListener("click", (e) =>
        handleIntervalClick(e, "thisMonth", getCalendarsData)
    );

    const intervalButtonNextMonth = createElement(
        "div",
        "js-date-picker-interval-btn date-picker__interval-btn",
        "",
        "Przyszły miesiąc"
    );

    intervalButtonNextMonth.dataset["interval"] = "nextMonth";

    intervalButtonNextMonth.addEventListener("click", (e) =>
        handleIntervalClick(e, "nextMonth", getCalendarsData)
    );

    const intervalButtonThisYear = createElement(
        "div",
        "js-date-picker-interval-btn date-picker__interval-btn",
        "",
        "Ten rok"
    );

    intervalButtonThisYear.dataset["interval"] = "thisYear";

    intervalButtonThisYear.addEventListener("click", (e) =>
        handleIntervalClick(e, "thisYear", getCalendarsData)
    );

    const intervalButtonNextYear = createElement(
        "div",
        "js-date-picker-interval-btn date-picker__interval-btn",
        "",
        "Przyszły rok"
    );

    intervalButtonNextYear.dataset["interval"] = "nextYear";

    intervalButtonNextYear.addEventListener("click", (e) =>
        handleIntervalClick(e, "nextYear", getCalendarsData)
    );

    const intervalButtonAll = createElement(
        "div",
        "js-date-picker-interval-btn date-picker__interval-btn",
        "",
        "Wszsytkie terminy"
    );

    intervalButtonAll.dataset["interval"] = "all";

    intervalButtonAll.addEventListener("click", (e) =>
        handleIntervalClick(e, "all", getCalendarsData)
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
