/** Luxon */
import { DateTime } from "luxon";

/** Helpers */
import {
    createElement,
    createInput,
    isDateSet,
} from "../helpers/datePickerHelpers";

export const initBasicModeInputs = (container, getCalendarsData) => {
    const { pickedStartDate, pickedEndDate, defaultOptions } =
        getCalendarsData();
    const isSetStartDate = isDateSet(pickedStartDate);
    const isSetEndDate = isDateSet(pickedEndDate);
    let outputStartDate = "";
    let outputEndDate = "";

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

    container.appendChild(startInput);
    container.appendChild(divider);
    container.appendChild(endInput);
};
