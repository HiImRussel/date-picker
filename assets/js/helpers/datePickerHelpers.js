/** Luxon */
import { DateTime } from "luxon";

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
