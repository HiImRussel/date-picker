/** Luxon */
import { DateTime } from "luxon";

/** DOM helpers */
/**
 * Create new DOM element
 *
 * @param {String} htmlSelector
 * @param {String} className
 * @param {String} idName
 * @param {String} content
 * @returns
 */
export const createElement = (
    htmlSelector = "div",
    className = "",
    idName = "",
    content = ""
) => {
    const element = document.createElement(htmlSelector);

    element.innerHTML = content;
    element.className = className;

    if (idName.length === 0) return element;

    element.id = idName;

    return element;
};

/**
 * Wrap element with newly created element
 *
 * @param {HTMLElement} domElement - element to wrap
 * @param {String} wrapperHtmlSelector
 * @param {String} wrapperClass
 * @param {String} wrapperID
 */
export const wrapElement = (
    domElement,
    wrapperHtmlSelector = "div",
    wrapperClass = "",
    wrapperID = ""
) => {
    const wrapper = createElement(
        wrapperHtmlSelector,
        wrapperClass,
        wrapperID,
        domElement.outerHTML
    );

    domElement.outerHTML = wrapper.outerHTML;
};

/**
 * Create input element
 *
 * @param {String} type
 * @param {Boolean} readonly
 * @param {String} className
 * @param {String} value
 * @returns
 */
export const createInput = (type, readonly = false, className, value, name) => {
    const input = createElement("input", className);

    input.type = type;
    input.readOnly = readonly;
    input.value = value;

    if (name === undefined || name === null) return input;

    input.name = name;

    return input;
};

/** Date helpers */
/**
 * Change month of date to prev/ next
 *
 * @param {"prev" | "next"} action - action to change "prev", "next"
 * @param {Object} date - date to change
 * @param {Number} date.day
 * @param {Number} date.month
 * @param {Number} date.year
 * @returns
 */
export const changeDate = (action, date) => {
    if (action === "prev") {
        if (date.month - 1 < 1) {
            date.month = 12;
            date.year = date.year - 1;
        } else {
            date.month = date.month - 1;
        }
    } else {
        if (date.month + 1 > 12) {
            date.month = 1;
            date.year = date.year + 1;
        } else {
            date.month = date.month + 1;
        }
    }

    return date;
};

/**
 * Compare if date is todays date
 *
 * @param {Number} day
 * @param {Number} month
 * @param {Number} year
 * @returns
 */
export const isCurrentDate = (day, month, year) => {
    const actualDate = DateTime.now();
    const actualDay = actualDate.day;
    const actualMonth = actualDate.month;
    const actualYear = actualDate.year;

    if (actualMonth !== month || actualYear !== year) return false;

    return actualDay === day;
};

/**
 * Check if date is the samae
 *
 * @param {Object} date - date to compare
 * @param {Number} date.day
 * @param {Number} date.month
 * @param {Number} date.year
 * @param {Object} dateToCompare - date to compare
 * @param {Number} dateToCompare.day
 * @param {Number} dateToCompare.month
 * @param {Number} dateToCompare.year
 * @returns
 */
export const isTheSameDate = (date, dateToCompare) => {
    if (date.month !== dateToCompare.month || date.year !== dateToCompare.year)
        return false;

    return date.day === dateToCompare.day;
};

/**
 * Check if date is set properly
 *
 * @param {Object} date - date to compare
 * @param {Number | null} date.monthDay
 * @param {Number | null} date.month
 * @param {Number | null} date.year
 * @returns
 */
export const isDateSet = (date) => {
    return date.day !== undefined && date.day !== null;
};

/**
 * Compare if date is after other date
 *
 * @param {Object} date - date to compare
 * @param {Number} date.monthDay
 * @param {Number} date.month
 * @param {Number} date.year
 * @param {Object} dateToCompare - date to compare
 * @param {Number} dateToCompare.day
 * @param {Number} dateToCompare.month
 * @param {Number} dateToCompare.year
 * @returns
 */
export const isDayAfter = (date, dateToCompare) => {
    const diff = DateTime.fromObject({
        day: date.monthDay,
        month: date.month,
        year: date.year,
    }).diff(
        DateTime.fromObject({
            day: dateToCompare.day,
            month: dateToCompare.month,
            year: dateToCompare.year,
        })
    );

    return diff.values.milliseconds > 0;
};

/**
 * Compare if date is before other date
 *
 * @param {Object} date - date to compare
 * @param {Number} date.monthDay
 * @param {Number} date.month
 * @param {Number} date.year
 * @param {Object} dateToCompare - date to compare
 * @param {Number} dateToCompare.day
 * @param {Number} dateToCompare.month
 * @param {Number} dateToCompare.year
 * @returns
 */
export const isDayBefore = (date, dateToCompare) => {
    const diff = DateTime.fromObject({
        day: date.monthDay,
        month: date.month,
        year: date.year,
    }).diff(
        DateTime.fromObject({
            day: dateToCompare.day,
            month: dateToCompare.month,
            year: dateToCompare.year,
        })
    );

    return diff.values.milliseconds < 0;
};
