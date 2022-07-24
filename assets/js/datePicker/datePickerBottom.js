/** Helpers */
import { createElement, createInput } from "../helpers/datePickerHelpers";

const initBottom = (container) => {
    const bottomWrapper = createElement("div", "date-picker__bottom-wrapper");
    const inputsWrapper = createElement("div", "date-picker__inputs-wrapper");
    const startInput = createInput("text", true, "date-picker__input");
    const endInput = createInput("text", true, "date-picker__input");
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

    buttonsWrapper.appendChild(cancelButton);
    buttonsWrapper.appendChild(applyButton);
    bottomWrapper.appendChild(buttonsWrapper);

    container.appendChild(bottomWrapper);
};

export default initBottom;
