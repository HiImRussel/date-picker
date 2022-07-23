/** Helpers */
import { createElement } from "../helpers/datePickerHelpers";

/** Luxon */
import { DateTime } from "luxon";

const createCalendarDay = (day) => {
    const dayContainer = createElement("div", "date-picker__day", "", day);

    return dayContainer;
};

const createCalendar = (day, month, year, className) => {
    const calendarBoxDOM = document.querySelector(".js-calendar-box");

    const daysContainer = createElement("div", "date-picker__days-wrapper");
    const datePicker = createElement("div", "date-picker__date");

    const newDate = DateTime.fromObject({ day, month, year });
    const daysInMonth = newDate.daysInMonth;

    for (day = 1; day <= daysInMonth; day++) {
        daysContainer.appendChild(createCalendarDay(day));
    }

    const container = createElement(
        "div",
        `date-picker__calendar ${className}`,
        "",
        `${datePicker.outerHTML}${daysContainer.outerHTML}`
    );

    calendarBoxDOM.appendChild(container);
};

export default createCalendar;
