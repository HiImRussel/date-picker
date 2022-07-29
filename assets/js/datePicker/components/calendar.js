/** Helpers */
import { changeDate, createElement } from "../helpers/datePickerHelpers";

/** Luxon */
import { DateTime } from "luxon";

/** Componnets */
import { initCalendarTop } from "./calendarTop";
import { initCalendarDays } from "./calendarDays";
import { initBasicModeIntervals } from "./basicModeIntervals";
import { initBasicModeInputs } from "./basicModeInputs";

const createCalendar = (getCalendarsData, calendarAccessor) => {
    const { calendarsData, datesPickerWrapper, rootWrapper } =
        getCalendarsData();

    const calendarDay = calendarsData[calendarAccessor].day;
    const calendarMonth = calendarsData[calendarAccessor].month;
    const calendarYear = calendarsData[calendarAccessor].year;

    const calendarDate = DateTime.fromObject({
        day: calendarDay,
        month: calendarMonth,
        year: calendarYear,
    });

    const prevMonth = changeDate("prev", {
        day: calendarDay,
        month: calendarMonth,
        year: calendarYear,
    });
    const prevMonthDate = DateTime.fromObject({
        day: prevMonth.day,
        month: prevMonth.month,
        year: prevMonth.year,
    });

    const currentCalendarBox = rootWrapper.querySelector(
        `.js-calendar--${calendarAccessor}`
    );

    // prevent from checking if is inside box (click outside auto close)
    if (currentCalendarBox !== null) {
        currentCalendarBox.style.display = "none";
        setTimeout(() => currentCalendarBox.remove(), 0);
    }

    const daysContainer = createElement("div", "date-picker__days-wrapper");
    const datePicker = createElement("div", "date-picker__date");
    const basicModeIntervalsBox = createElement(
        "div",
        "date-picker__basic-mode-intervals"
    );
    const basicModeInputs = createElement(
        "div",
        "date-picker__basic-mode-inputs"
    );

    initCalendarTop(
        datePicker,
        daysContainer,
        getCalendarsData,
        calendarDate,
        calendarAccessor
    );
    initBasicModeInputs(basicModeInputs, getCalendarsData);
    initBasicModeIntervals(basicModeIntervalsBox, getCalendarsData);
    initCalendarDays(
        calendarDate,
        prevMonthDate,
        daysContainer,
        getCalendarsData,
        calendarAccessor
    );

    const container = createElement(
        "div",
        `date-picker__calendar js-calendar--${calendarAccessor}`
    );

    container.appendChild(datePicker);
    container.appendChild(basicModeInputs);
    container.appendChild(basicModeIntervalsBox);
    container.appendChild(daysContainer);

    datesPickerWrapper.appendChild(container);
};

export default createCalendar;
