/** Luxon */
import { DateTime } from "luxon";

/** Helpers */
import { createElement, createInput } from "../helpers/datePickerHelpers";

const initBottom = (
    container,
    pickedStartDate = "",
    pickedEndDate = "",
    rootWrapper
) => {
    const domBottomWrapper = document.querySelector(
        ".js-date-picker-bottom-wrapper"
    );

    const datePickerBox = rootWrapper.querySelector(".js-calendar-box");

    if (domBottomWrapper !== null && domBottomWrapper !== undefined) {
        domBottomWrapper.remove();
    }

    if (pickedStartDate.length !== 0 && pickedEndDate.length !== 0) {
        pickedStartDate = DateTime.fromObject({
            day: pickedStartDate.day,
            month: pickedStartDate.month,
            year: pickedStartDate.year,
        }).toFormat("dd.MMMM.yyyy");

        if (pickedEndDate.day !== null) {
            pickedEndDate = DateTime.fromObject({
                day: pickedEndDate.day,
                month: pickedEndDate.month,
                year: pickedEndDate.year,
            }).toFormat("dd.MMMM.yyyy");
        } else {
            pickedEndDate = "";
        }
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
        pickedStartDate
    );
    const endInput = createInput(
        "text",
        true,
        "date-picker__input",
        pickedEndDate
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
    const applyButton = createElement(
        "button",
        "date-picker__button -blue",
        "",
        "Zastosuj"
    );

    cancelButton.addEventListener("click", () => {
        datePickerBox.classList.remove("-active");
    });

    buttonsWrapper.appendChild(cancelButton);
    buttonsWrapper.appendChild(applyButton);
    bottomWrapper.appendChild(buttonsWrapper);

    container.appendChild(bottomWrapper);
};

export default initBottom;
