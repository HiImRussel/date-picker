/** Luxon */
import { DateTime } from "luxon";

/** Helpers */
import {
    createElement,
    createInput,
    wrapElement,
} from "./helpers/datePickerHelpers";

/** Components */
import createCalendar from "./components/calendar";
import initBottom from "./components/datePickerBottom";
import initPickInterval from "./components/pickInterval";

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
    const defaultOptions = {
        hiddenInput: false,
        hiddenInputOutputFormat: "dd.MMMM.yyyy",
        inputOutputFormat: "dd.MMMM.yyyy",
        inputsInsideCalendarOutputFormat: "dd.MM.yyyy",
        mode: "complex",
        breakpoint: 768,
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
    let datesPickerWrapper;

    const mapOptions = () => {
        for (const [key, value] of Object.entries(options)) {
            if (
                defaultOptions[key] === undefined ||
                defaultOptions[key] === null
            )
                return;

            defaultOptions[key] = value;
        }
    };

    const setStartDate = (date) => {
        pickedStartDate = date;
    };

    const setEndDate = (date) => {
        pickedEndDate = date;
    };

    const handleSaveClick = () => {
        const startDate = DateTime.fromObject(pickedStartDate).toFormat(
            defaultOptions.inputOutputFormat
        );
        const endDate = DateTime.fromObject(pickedEndDate).toFormat(
            defaultOptions.inputOutputFormat
        );

        inputElement.value = `${startDate} - ${endDate}`;

        calendarBoxDOM.classList.remove("-active");
    };

    const handleCancelClick = () => {
        const allIntervals = rootWrapper.querySelectorAll(
            ".js-date-picker-interval-btn"
        );

        pickedStartDate = {
            day: null,
            month: null,
            year: null,
        };
        pickedEndDate = {
            day: null,
            month: null,
            year: null,
        };

        allIntervals.forEach((item) => {
            item.classList.remove("-active");
        });

        reInitCalendars();

        calendarBoxDOM.classList.remove("-active");
        inputElement.value = "";
    };

    const createCalendarWrapper = () => {
        const calendarBox = createElement(
            "div",
            "js-calendar-box date-picker__calendar-wrapper"
        );

        rootWrapper.appendChild(calendarBox);

        calendarBoxDOM = rootWrapper.querySelector(".js-calendar-box");
        inputElement = document.querySelector(selector);

        inputElement.addEventListener("click", () =>
            calendarBoxDOM.classList.add("-active")
        );

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

        datesPickerWrapper = calendarBox;

        rootWrapper
            .querySelector(".js-date-right-column")
            .appendChild(calendarBox);
    };

    const getCalendarsData = () => {
        return {
            calendarsData,
            pickedStartDate,
            pickedEndDate,
            inputElement,
            rootWrapper,
            calendarBoxDOM,
            defaultOptions,
            changeMonthHandler,
            setStartDate,
            setEndDate,
            reInitCalendars,
            datesPickerWrapper,
            handleSaveClick,
            handleCancelClick,
        };
    };

    const reInitCalendars = () => {
        inputElement = document.querySelector(selector);
        rootWrapper = inputElement.parentElement;

        createCalendar(getCalendarsData, "firstCalendar");
        createCalendar(getCalendarsData, "secondCalendar");

        initBottom(
            rootWrapper.querySelector(".js-date-right-column"),
            getCalendarsData
        );
    };

    const changeMonthHandler = (action, calendarAccessor) => {
        const dataToChange = calendarsData[calendarAccessor];

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

        reInitCalendars();
    };

    const initDatePicker = () => {
        mapOptions();

        wrapElement(
            inputElement,
            "div",
            "date-picker__wrapper js-date-picker-wrapper"
        );

        inputElement = document.querySelector(selector);
        rootWrapper = inputElement.parentElement;

        if (defaultOptions.hiddenInput) {
            const hiddenInput = createInput(
                "text",
                true,
                "date-picker__hidden-input",
                ""
            );

            rootWrapper.appendChild(hiddenInput);
        }

        createCalendarWrapper();

        initPickInterval(
            rootWrapper.querySelector(".js-calendar-box"),
            getCalendarsData
        );

        createRightColumn();

        createDatesPickerWrapper();

        initBottom(
            rootWrapper.querySelector(".js-date-right-column"),
            getCalendarsData
        );

        createCalendar(getCalendarsData, "firstCalendar");
        createCalendar(getCalendarsData, "secondCalendar");
    };

    initDatePicker();
};

export default datePicker;
