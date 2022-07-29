/** Luxon */
import { DateTime } from "luxon";

/** Helpers */
import {
    createElement,
    createInput,
    isDateSet,
} from "../helpers/datePickerHelpers";

/**
 * Init calendar bottom section with inputs and action buttons
 *
 * @param {HTMLElement} container - container to place section
 * @param {Function} getCalendarsData - function passed from datePicker init to handle data
 */
const initBottom = (container, getCalendarsData) => {
    const {
        pickedStartDate,
        pickedEndDate,
        rootWrapper,
        defaultOptions,
        handleSaveClick,
        handleCancelClick,
    } = getCalendarsData();
    const domBottomWrapper = rootWrapper.querySelector(
        ".js-date-picker-bottom-wrapper"
    );
    const isSetStartDate = isDateSet(pickedStartDate);
    const isSetEndDate = isDateSet(pickedEndDate);
    let outputStartDate = "";
    let outputEndDate = "";

    if (domBottomWrapper !== null && domBottomWrapper !== undefined) {
        domBottomWrapper.remove();
    }

    if (isSetStartDate) {
        outputStartDate = DateTime.fromObject({
            day: pickedStartDate.day,
            month: pickedStartDate.month,
            year: pickedStartDate.year,
        }).toFormat(defaultOptions.inputsInsideCalendarOutputFormat);
    }

    if (isSetEndDate) {
        outputEndDate = DateTime.fromObject({
            day: pickedEndDate.day,
            month: pickedEndDate.month,
            year: pickedEndDate.year,
        }).toFormat(defaultOptions.inputsInsideCalendarOutputFormat);
    }

    const bottomWrapper = createElement(
        "div",
        "js-date-picker-bottom-wrapper date-picker__bottom-wrapper"
    );
    const inputsWrapper = createElement("div", "date-picker__inputs-wrapper");
    const startInput = createInput(
        "text",
        true,
        "date-picker__input",
        outputStartDate
    );
    const endInput = createInput(
        "text",
        true,
        "date-picker__input",
        outputEndDate
    );
    const divider = createElement("span", "date-picker__divider", "", "-");

    inputsWrapper.appendChild(startInput);
    inputsWrapper.appendChild(divider);
    inputsWrapper.appendChild(endInput);
    bottomWrapper.appendChild(inputsWrapper);

    const buttonsWrapper = createElement("div", "date-picker__buttons-wrapper");
    const cancelButton = createElement(
        "button",
        "date-picker__button",
        "",
        "Anuluj"
    );

    cancelButton.addEventListener("click", handleCancelClick);

    const applyButton = createElement(
        "button",
        "date-picker__button -blue",
        "",
        "Zastosuj"
    );

    applyButton.addEventListener("click", handleSaveClick);

    buttonsWrapper.appendChild(cancelButton);
    buttonsWrapper.appendChild(applyButton);
    bottomWrapper.appendChild(buttonsWrapper);

    container.appendChild(bottomWrapper);
};

export default initBottom;
