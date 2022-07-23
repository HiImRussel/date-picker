/** Luxon */
import { DateTime, Settings } from "luxon";

/** Helpers */
import { createElement, wrapElement } from "../helpers/datePickerHelpers";

/** Calendar */
import createCalendar from "./calendar";

/** Luxon Settings */
Settings.defaultZone = "utc";
Settings.defaultLocale = "pl";

class DatePicker {
    constructor(selector, options = {}) {
        this.inputElement = document.querySelector(selector);
        this.selector = selector;
        this.options = options;

        this.initDatePicker();
    }

    initDatePicker() {
        wrapElement(
            this.inputElement,
            "div",
            "date-picker__wrapper js-date-picker-wrapper"
        );

        this.createCalendarWrapper();
        createCalendar(
            DateTime.now().toFormat("dd"),
            DateTime.now().toFormat("MM"),
            DateTime.now().toFormat("yyyy"),
            "js-left-column-calendar"
        );
    }

    createCalendarWrapper() {
        const calendarBox = createElement(
            "div",
            "js-calendar-box date-picker__calendar-wrapper"
        );
        let input = document.querySelector(this.selector);
        const rootWrapper = input.parentElement;

        rootWrapper.appendChild(calendarBox);

        const calendarBoxDOM = document.querySelector(".js-calendar-box");
        input = document.querySelector(this.selector);

        input.addEventListener("click", () => {
            calendarBoxDOM.classList.add("-active");
        });

        document.addEventListener("click", (e) => {
            const isClickInside = rootWrapper.contains(e.target);

            if (isClickInside) return;

            calendarBoxDOM.classList.remove("-active");
        });
    }
}

export default DatePicker;
