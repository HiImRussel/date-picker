/** Luxon */
import { DateTime } from "luxon";

/** DOM helpers */
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

export const createInput = (type, readonly = false, className, value) => {
    const input = createElement("input", className);

    input.type = type;
    input.readOnly = readonly;
    input.value = value;

    return input;
};

/** Date helpers */
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

export const isCurrentDate = (day, month, year) => {
    const actualDate = DateTime.now();
    const actualDay = actualDate.day;
    const actualMonth = actualDate.month;
    const actualYear = actualDate.year;

    if (actualMonth !== month || actualYear !== year) return false;

    return actualDay === day;
};

export const isTheSameDate = (date, dateToCompare) => {
    if (date.month !== dateToCompare.month || date.year !== dateToCompare.year)
        return false;

    return date.day === dateToCompare.day;
};

export const isDateSet = (date) => {
    return date.day !== undefined && date.day !== null;
};

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