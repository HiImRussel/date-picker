/** Luxon */
import { Settings } from "luxon";

/** Date picker */
import datePicker from "./datePicker/datePicker";

/** Luxon Settings */
Settings.defaultZone = "utc";
Settings.defaultLocale = "pl";

const init = () => {
    datePicker(".js-date-picker", {
        hiddenInput: true,
        mode: "basic",
    });

    datePicker(".js-date-picker-sec");
};

init();
