/** Helpers */
import {
    isDateSet,
    isTheSameDate,
    isDayBefore,
} from "../helpers/datePickerHelpers";

/**
 * Handle day click and set start/end date
 *
 * @param {Object} date - clicked date
 * @param {Number | null} date.day - date day
 * @param {Number | null} date.month - date month
 * @param {Number | null} date.year - date year
 * @param {Function} getCalendarsData - function passed from datePicker init to handle data
 */
export const handleDayClick = (date, getCalendarsData) => {
    const {
        pickedStartDate,
        pickedEndDate,
        setStartDate,
        setEndDate,
        reInitCalendars,
        rootWrapper,
        setSelectedInterval,
    } = getCalendarsData();

    const isLikeStart = isTheSameDate(
        { day: date.monthDay, month: date.month, year: date.year },
        pickedStartDate
    );
    const isLikeEnd = isTheSameDate(
        { day: date.monthDay, month: date.month, year: date.year },
        pickedEndDate
    );

    if ((isLikeStart || isLikeEnd) && isDateSet(pickedEndDate)) {
        setStartDate({
            day: date.monthDay,
            month: date.month,
            year: date.year,
        });
        setEndDate({ day: null, month: null, year: null });

        reInitCalendars();

        return;
    }

    if (!isDateSet(pickedStartDate)) {
        setStartDate({
            day: date.monthDay,
            month: date.month,
            year: date.year,
        });
    } else if (!isDateSet(pickedEndDate)) {
        const isBeforeStart = isDayBefore(
            { monthDay: date.monthDay, month: date.month, year: date.year },
            pickedStartDate
        );

        if (isBeforeStart) {
            setStartDate({
                day: date.monthDay,
                month: date.month,
                year: date.year,
            });
            setEndDate(pickedStartDate);
            reInitCalendars();

            return;
        }

        setEndDate({
            day: date.monthDay,
            month: date.month,
            year: date.year,
        });
    } else {
        setStartDate({
            day: date.monthDay,
            month: date.month,
            year: date.year,
        });
        setEndDate({ day: null, month: null, year: null });
    }

    setSelectedInterval(null);

    const allIntervals = rootWrapper.querySelectorAll(
        ".js-date-picker-interval-btn"
    );

    allIntervals.forEach((item) => {
        item.classList.remove("-active");
    });

    reInitCalendars();
};
