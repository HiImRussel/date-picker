/** Helpers */
import { createElement } from "../helpers/datePickerHelpers";

/** Luxon */
import { DateTime } from "luxon";

const createCalendarDay = (day) => {
    const dayContainer = createElement("div", "date-picker__day", "", day);

    return dayContainer;
};

const createCalendar = (
    day,
    month,
    year,
    rootContainer,
    changeMonthMethod,
    calendarProperty,
    className
) => {
    const calendarBoxDOM = rootContainer.querySelector(".js-calendar-box");
    const currentCalendarBox = document.querySelector(
        `.js-calendar--${calendarProperty}`
    );

    if (currentCalendarBox !== null) {
        currentCalendarBox.remove();
    }

    const daysContainer = createElement("div", "date-picker__days-wrapper");
    const datePicker = createElement("div", "date-picker__date");

    const prevButton = createElement(
        "button",
        "date-picker__change-month-btn",
        "",
        "<"
    );
    const nextButton = createElement(
        "button",
        "date-picker__change-month-btn",
        "",
        ">"
    );
    const activeDate = createElement(
        "span",
        "date-picker__active-date",
        "",
        `${month} ${year}`
    );

    prevButton.addEventListener("click", () =>
        changeMonthMethod("prev", calendarProperty)
    );
    nextButton.addEventListener("click", () =>
        changeMonthMethod("next", calendarProperty)
    );

    daysContainer.appendChild(prevButton);
    daysContainer.appendChild(activeDate);
    daysContainer.appendChild(nextButton);

    const newDate = DateTime.fromObject({ day, month, year });
    const daysInMonth = newDate.daysInMonth;

    for (day = 1; day <= daysInMonth; day++) {
        daysContainer.appendChild(createCalendarDay(day));
    }

    const container = createElement(
        "div",
        `date-picker__calendar js-calendar--${calendarProperty} ${className}`
    );

    container.appendChild(datePicker);
    container.appendChild(daysContainer);

    calendarBoxDOM.appendChild(container);
};

export default createCalendar;
