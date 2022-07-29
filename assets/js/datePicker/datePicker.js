/** Luxon */
import { DateTime } from "luxon";

/** Helpers */
import {
    createElement,
    createInput,
    isDateSet,
    wrapElement,
} from "./helpers/datePickerHelpers";

/** Components */
import createCalendar from "./components/calendar";
import initBottom from "./components/datePickerBottom";
import initPickInterval from "./components/pickInterval";

/**
 * Init date picker, first of the finded item by selector will be changed into date picker
 * @param {string} selector - selector of input that will be changed into date picker
 * @param {string} options - options to init date picker
 * @param {boolean} options.hidenInput - disable/endable hiddenInput feature (default false)
 * @param {string} options.hiddenInputOutputFormat - if hidden input is enabled you can change output value date format
 * @param {string} options.inputOutputFormat - date format to output to input triggered by the main selector
 * @param {string} options.inputsInsideCalendarOutputFormat - date format to use inside calendar inputs
 * @param {string} options.mode - calendar mode. Available options "complex", "basic" (default complex and after reach breakpoint will be changed into basic)
 * @param {string} options.breakpoint - breakpoint that will change complex date picker into basic
 */
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
        breakpoint: 900,
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
    let hiddenInputStart;
    let hiddenInputEnd;
    let selectedInterval;

    const mapOptions = () => {
        if (options === undefined || options === null) return;

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

    const setSelectedInterval = (interval) => {
        selectedInterval = interval;
    };

    const handleSaveClick = () => {
        if (!isDateSet(pickedStartDate) || !isDateSet(pickedEndDate)) return;

        const startDate = DateTime.fromObject(pickedStartDate).toFormat(
            defaultOptions.inputOutputFormat
        );
        const endDate = DateTime.fromObject(pickedEndDate).toFormat(
            defaultOptions.inputOutputFormat
        );

        inputElement.value = `${startDate} - ${endDate}`;

        calendarBoxDOM.classList.remove("-active");

        if (!defaultOptions.hiddenInput) return;

        const hiddenInputStartDate = DateTime.fromObject(
            pickedStartDate
        ).toFormat(defaultOptions.hiddenInputOutputFormat);
        const hiddenInputEndDate = DateTime.fromObject(pickedEndDate).toFormat(
            defaultOptions.hiddenInputOutputFormat
        );

        hiddenInputStart.value = hiddenInputStartDate;
        hiddenInputEnd.value = hiddenInputEndDate;
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

        setSelectedInterval("");
        reInitCalendars();

        calendarBoxDOM.classList.remove("-active");
        inputElement.value = "";

        if (!defaultOptions.hiddenInput) return;

        hiddenInputStart.value = "";
        hiddenInputEnd.value = "";
    };

    const handleModeChange = () => {
        const screenSize = document.documentElement.clientWidth;

        if (screenSize > defaultOptions.breakpoint) {
            calendarBoxDOM.classList.remove("-basic");
        } else {
            calendarBoxDOM.classList.add("-basic");
        }
    };

    const createCalendarWrapper = () => {
        const calendarBox = createElement(
            "div",
            `js-calendar-box date-picker__calendar-wrapper ${
                defaultOptions.mode !== "complex" ? "-basic" : ""
            }`
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

        if (defaultOptions.mode !== "complex") return;

        handleModeChange();

        window.addEventListener("resize", handleModeChange);
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
            setSelectedInterval,
            selectedInterval,
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

        inputElement.readOnly = true;

        rootWrapper = inputElement.parentElement;

        if (defaultOptions.hiddenInput) {
            hiddenInputStart = createInput(
                "text",
                true,
                "date-picker__hidden-input",
                ""
            );
            hiddenInputEnd = createInput(
                "text",
                true,
                "date-picker__hidden-input",
                ""
            );

            rootWrapper.appendChild(hiddenInputStart);
            rootWrapper.appendChild(hiddenInputEnd);
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
