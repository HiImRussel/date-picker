/** Luxon */
import { Settings } from "luxon";

/** Date picker */
import datePicker from "./datePicker/datePicker";

/** Luxon Settings */
Settings.defaultZone = "utc";
Settings.defaultLocale = "pl";

const init = () => {
    const datePickerInstance = datePicker(".js-date-picker", {
        hiddenInput: true,
    });
};

init();
