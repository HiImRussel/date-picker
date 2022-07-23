/** Luxon */
import { DateTime, Settings } from "luxon";

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
        this.wrapElement(
            this.inputElement,
            "div",
            "date-picker__wrapper js-date-picker-wrapper"
        );

        this.createCalendar();
    }

    wrapElement(
        domElement,
        wrapperHtmlSelector = "div",
        wrapperClass = "",
        wrapperID = ""
    ) {
        const wrapper = this.createElement(
            wrapperHtmlSelector,
            wrapperClass,
            wrapperID,
            domElement.outerHTML
        );

        domElement.outerHTML = wrapper.outerHTML;
    }

    createElement(
        htmlSelector = "div",
        className = "",
        idName = "",
        content = ""
    ) {
        const element = document.createElement(htmlSelector);

        element.innerHTML = content;
        element.className = className;
        element.id = idName;

        return element;
    }

    addEventListenerToElement(element, eventName, method) {
        element.addEventListener(eventName, method);
    }

    createCalendar() {
        const calendarBox = this.createElement(
            "div",
            "js-calendar-box date-picker__calendar-wrapper"
        );
        let input = document.querySelector(this.selector);
        const rootWrapper = input.parentElement;

        rootWrapper.innerHTML += calendarBox.outerHTML;
        input = document.querySelector(this.selector);
        const calendarBoxDOM = document.querySelector(".js-calendar-box");

        this.addEventListenerToElement(input, "click", () => {
            calendarBoxDOM.classList.add("-active");
        });

        this.addEventListenerToElement(document, "click", (e) => {
            const isClickInside = rootWrapper.contains(e.target);

            if (isClickInside) return;

            calendarBoxDOM.classList.remove("-active");
        });
    }
}

export default DatePicker;
