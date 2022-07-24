/** Luxon */
import { DateTime } from "luxon";

/** Helpers */
import { createElement, wrapElement } from "../helpers/datePickerHelpers";

/** Calendar */
import createCalendar from "./calendar";
import initBottom from "./datePickerBottom";

/** Pick interval */
import initPickInterval from "./pickInterval";

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
    let pickedStartDate = {
        day: null,
        month: null,
        year: null,
    };
    let pickedEndDate = {
        day: null,
        month: null,
        year: null,
    };
    let inputElement = document.querySelector(selector);
    let calendarBoxDOM;
    let rootWrapper;

    const getPickedStartDate = () => {
        return pickedStartDate;
    };

    const getPickedEndDate = () => {
        return pickedEndDate;
    };

    const setStartDate = (date) => {
        pickedStartDate = date;
    };

    const setEndDate = (date) => {
        pickedEndDate = date;
    };

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
            const rootWrapper = document.querySelector(selector).parentElement;

            const isClickInside = rootWrapper.contains(e.target);

            if (isClickInside) return;

            calendarBoxDOM.classList.remove("-active");
        });
    };

    const createRightColumn = () => {
        const calendarRightColumn = createElement(
            "div",
            "js-date-right-column date-picker__right-column"
        );

        rootWrapper
            .querySelector(".js-calendar-box")
            .appendChild(calendarRightColumn);
    };

    const createDatesPickerWrapper = () => {
        const calendarBox = createElement(
            "div",
            "js-date-pickers-wrapper date-picker__date-pickers-wrapper"
        );

        rootWrapper
            .querySelector(".js-date-right-column")
            .appendChild(calendarBox);
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
            calendar,
            `js-calendar--${calendar}`,
            getPickedStartDate,
            getPickedEndDate,
            setStartDate,
            setEndDate,
            reInitCalendars
        );
    };

    const reInitCalendars = () => {
        inputElement = document.querySelector(selector);
        rootWrapper = inputElement.parentElement;

        createCalendar(
            calendarsData.secondCalendar.day,
            calendarsData.secondCalendar.month,
            calendarsData.secondCalendar.year,
            rootWrapper,
            changeMonthHandler,
            "secondCalendar",
            "js-calendar--secondCalendar",
            getPickedStartDate,
            getPickedEndDate,
            setStartDate,
            setEndDate,
            reInitCalendars
        );
        createCalendar(
            calendarsData.firstCalendar.day,
            calendarsData.firstCalendar.month,
            calendarsData.firstCalendar.year,
            rootWrapper,
            changeMonthHandler,
            "firstCalendar",
            "js-calendar--firstCalendar",
            getPickedStartDate,
            getPickedEndDate,
            setStartDate,
            setEndDate,
            reInitCalendars
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

        initPickInterval(rootWrapper.querySelector(".js-calendar-box"));

        createRightColumn();

        createDatesPickerWrapper();

        initBottom(rootWrapper.querySelector(".js-date-right-column"));

        createCalendar(
            calendarsData.firstCalendar.day,
            calendarsData.firstCalendar.month,
            calendarsData.firstCalendar.year,
            rootWrapper,
            changeMonthHandler,
            "firstCalendar",
            "js-calendar--firstCalendar",
            getPickedStartDate,
            getPickedEndDate,
            setStartDate,
            setEndDate,
            reInitCalendars
        );
        createCalendar(
            calendarsData.secondCalendar.day,
            calendarsData.secondCalendar.month,
            calendarsData.secondCalendar.year,
            rootWrapper,
            changeMonthHandler,
            "secondCalendar",
            "js-calendar--secondCalendar",
            getPickedStartDate,
            getPickedEndDate,
            setStartDate,
            setEndDate,
            reInitCalendars
        );
    };

    initDatePicker();
};

export default datePicker;
