/** Helpers */
import {
    isDateSet,
    isTheSameDate,
    isDayBefore,
} from "../helpers/datePickerHelpers";

export const handleDayClick = (date, getCalendarsData) => {
    const {
        pickedStartDate,
        pickedEndDate,
        setStartDate,
        setEndDate,
        reInitCalendars,
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

    reInitCalendars();
};
