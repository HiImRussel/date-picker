/** Luxon */
import { DateTime } from "luxon";

/** Helpers */
import { createElement, wrapElement } from "../helpers/datePickerHelpers";

/** Calendar */
import createCalendar from "./calendar";

const datePicker = (selector, options) => {
    const calendarsData = {
        firstCalendar: {
            day: DateTime.now().day,
            month: DateTime.now().month,
            year: DateTime.now().year,
        },
        secondCalendar: {
            day: 1,
            month: DateTime.now().plus({ months: 1 }).month,
            year: DateTime.now().plus({ months: 1 }).year,
        },
    };
    let inputElement = document.querySelector(selector);
    let calendarBoxDOM;
    let rootWrapper;

    const createCalendarWrapper = () => {
        const calendarBox = createElement(
            "div",
            "js-calendar-box date-picker__calendar-wrapper"
        );

        rootWrapper.appendChild(calendarBox);

        calendarBoxDOM = rootWrapper.querySelector(".js-calendar-box");
        inputElement = document.querySelector(selector);

        inputElement.addEventListener("click", () => {
            calendarBoxDOM.classList.add("-active");
        });

        document.addEventListener("click", (e) => {
            const isClickInside = rootWrapper.contains(e.target);

            if (isClickInside) return;

            //calendarBoxDOM.classList.remove("-active");
        });
    };

    const changeMonthHandler = (action, calendar) => {
        const dataToChange = calendarsData[calendar];

        if (action === "prev") {
            if (dataToChange.month - 1 < 1) {
                dataToChange.month = 12;
                dataToChange.year = dataToChange.year - 1;
            } else {
                dataToChange.month = dataToChange.month - 1;
            }
        } else {
            if (dataToChange.month + 1 > 12) {
                dataToChange.month = 1;
                dataToChange.year = dataToChange.year + 1;
            } else {
                dataToChange.month = dataToChange.month + 1;
            }
        }

        createCalendar(
            calendarsData[calendar].day,
            calendarsData[calendar].month,
            calendarsData[calendar].year,
            rootWrapper,
            changeMonthHandler,
            "firstCalendar",
            "js-left-column-calendar"
        );
    };

    const initDatePicker = () => {
        wrapElement(
            inputElement,
            "div",
            "date-picker__wrapper js-date-picker-wrapper"
        );

        inputElement = document.querySelector(selector);
        rootWrapper = inputElement.parentElement;

        createCalendarWrapper();
        createCalendar(
            calendarsData.firstCalendar.day,
            calendarsData.firstCalendar.month,
            calendarsData.firstCalendar.year,
            rootWrapper,
            changeMonthHandler,
            "firstCalendar",
            "js-calendar--firstCalendar"
        );
    };

    initDatePicker();
};

export default datePicker;
