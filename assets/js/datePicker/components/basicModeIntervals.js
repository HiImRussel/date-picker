/** Helpers */
import { createElement } from "../helpers/datePickerHelpers";

/** Methods */
import { handleIntervalClick } from "../methods/handleIntervalClick";

export const initBasicModeIntervals = (container, getCalendarsData) => {
    const { selectedInterval } = getCalendarsData();

    const intervalThisWeek = createElement(
        "button",
        `js-date-picker-interval-btn date-picker__basic-mode-interval-btn ${
            selectedInterval === "thisWeek" ? "-active" : ""
        }`,
        "",
        "Ten tydzień"
    );

    intervalThisWeek.dataset["interval"] = "thisWeek";
    intervalThisWeek.addEventListener("click", (e) =>
        handleIntervalClick(e, "thisWeek", getCalendarsData)
    );

    const intervalThisMonth = createElement(
        "button",
        `js-date-picker-interval-btn date-picker__basic-mode-interval-btn ${
            selectedInterval === "thisMonth" ? "-active" : ""
        }`,
        "",
        "Ten meisiąc"
    );

    intervalThisMonth.dataset["interval"] = "thisMonth";
    intervalThisMonth.addEventListener("click", (e) =>
        handleIntervalClick(e, "thisMonth", getCalendarsData)
    );

    const intervalThisYear = createElement(
        "button",
        `js-date-picker-interval-btn date-picker__basic-mode-interval-btn ${
            selectedInterval === "thisYear" ? "-active" : ""
        }`,
        "",
        "Ten rok"
    );

    intervalThisYear.dataset["interval"] = "thisYear";
    intervalThisYear.addEventListener("click", (e) =>
        handleIntervalClick(e, "thisYear", getCalendarsData)
    );

    container.appendChild(intervalThisWeek);
    container.appendChild(intervalThisMonth);
    container.appendChild(intervalThisYear);
};
