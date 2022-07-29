/** Helpers */
import { createElement } from "../helpers/datePickerHelpers";

/**
 * Init calendar top section (current watching period of time month and year)
 *
 * @param {HTMLElement} datePicker - current calendar box
 * @param {HTMLElement} daysContainer - current calendar container with days
 * @param {Function} getCalendarsData - function passed from datePicker init to handle data
 * @param {Object} date - date formated by luxon representing currently watching period of time
 * @param {String} calendarAccessor - accessor to calendar data property "firstCalendar" or "secondCalendar"
 */
export const initCalendarTop = (
    datePicker,
    daysContainer,
    getCalendarsData,
    date,
    calendarAccessor
) => {
    const { changeMonthHandler } = getCalendarsData();

    const prevButton = createElement(
        "button",
        "date-picker__change-month-btn",
        "",
        `<svg width="7" height="12" viewBox="0 0 7 12" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M6 1L1 6L6 11" stroke="#667085" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>`
    );
    const nextButton = createElement(
        "button",
        "date-picker__change-month-btn",
        "",
        `<svg width="7" height="12" viewBox="0 0 7 12" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M1 1L6 6L1 11" stroke="#667085" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
        `
    );
    const activeDate = createElement(
        "span",
        "date-picker__active-date",
        "",
        `${date.monthLong} ${date.year}`
    );

    prevButton.addEventListener("click", () =>
        changeMonthHandler("prev", calendarAccessor)
    );
    nextButton.addEventListener("click", () =>
        changeMonthHandler("next", calendarAccessor)
    );

    datePicker.appendChild(prevButton);
    datePicker.appendChild(activeDate);
    datePicker.appendChild(nextButton);

    const days = ["Pn", "Wt", "Śr", "Cz", "Pt", "Sb", "Nd"];

    days.forEach((day) => {
        const dayName = createElement("div", "date-picker__day-name", "", day);

        daysContainer.appendChild(dayName);
    });
};
