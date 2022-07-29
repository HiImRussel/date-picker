/** Luxon */
import { DateTime } from "luxon";

/**
 * Handle interval click and select period of time
 *
 * @param {Event} e -click item event
 * @param {"today" | "tommorrow" | "thisWeek" | "nextWeek" | "thisMonth" | "nextMonth" | "thisYear" | "nextYear" | "all"} interval - picked item interval
 * @param {Function} getCalendarsData - function passed from datePicker init to handle data
 */
export const handleIntervalClick = (e, interval, getCalendarsData) => {
    const {
        setStartDate,
        setEndDate,
        reInitCalendars,
        rootWrapper,
        setSelectedInterval,
    } = getCalendarsData();
    const currentItem = e.currentTarget;
    const thisIntervalItems = rootWrapper.querySelectorAll(
        `.js-date-picker-interval-btn[data-interval="${currentItem.dataset.interval}"]`
    );
    const allIntervals = rootWrapper.querySelectorAll(
        ".js-date-picker-interval-btn"
    );
    const today = DateTime.now();

    allIntervals.forEach((item) => {
        item.classList.remove("-active");
    });

    thisIntervalItems.forEach((item) => {
        item.classList.add("-active");
    });

    switch (interval) {
        case "today":
            setStartDate({
                day: today.day,
                month: today.month,
                year: today.year,
            });

            setEndDate({
                day: today.day,
                month: today.month,
                year: today.year,
            });
            break;
        case "tommorrow":
            const tommorrow = today.plus({ days: 1 });

            setStartDate({
                day: tommorrow.day,
                month: tommorrow.month,
                year: tommorrow.year,
            });

            setEndDate({
                day: tommorrow.day,
                month: tommorrow.month,
                year: tommorrow.year,
            });
            break;
        case "thisWeek":
            const endOfWeek = today.endOf("week");

            setStartDate({
                day: today.day,
                month: today.month,
                year: today.year,
            });
            setEndDate({
                day: endOfWeek.day,
                month: endOfWeek.month,
                year: endOfWeek.year,
            });
            break;
        case "nextWeek":
            const nextWeek = today.plus({ weeks: 1 });
            const nextWeekStart = nextWeek.startOf("week");
            const nextWeekEnd = nextWeek.endOf("week");

            setStartDate({
                day: nextWeekStart.day,
                month: nextWeekStart.month,
                year: nextWeekStart.year,
            });
            setEndDate({
                day: nextWeekEnd.day,
                month: nextWeekEnd.month,
                year: nextWeekEnd.year,
            });
        case "thisMonth":
            const endOfThisMonth = today.endOf("month");

            setStartDate({
                day: today.day,
                month: today.month,
                year: today.year,
            });
            setEndDate({
                day: endOfThisMonth.day,
                month: endOfThisMonth.month,
                year: endOfThisMonth.year,
            });
            break;
        case "nextMonth":
            const nextMonth = today.plus({ month: 1 });
            const startOfNextMonth = nextMonth.startOf("month");
            const endOfNextMonth = nextMonth.endOf("month");

            setStartDate({
                day: startOfNextMonth.day,
                month: startOfNextMonth.month,
                year: startOfNextMonth.year,
            });
            setEndDate({
                day: endOfNextMonth.day,
                month: endOfNextMonth.month,
                year: endOfNextMonth.year,
            });
            break;
        case "thisYear":
            const endOfThisYear = today.endOf("year");

            setStartDate({
                day: today.day,
                month: today.month,
                year: today.year,
            });
            setEndDate({
                day: endOfThisYear.day,
                month: endOfThisYear.month,
                year: endOfThisYear.year,
            });
            break;
        case "nextYear":
            const nextYear = today.plus({ years: 1 });
            const startOfNextYear = nextYear.startOf("year");
            const endOfNextYear = nextYear.endOf("year");

            setStartDate({
                day: startOfNextYear.day,
                month: startOfNextYear.month,
                year: startOfNextYear.year,
            });
            setEndDate({
                day: endOfNextYear.day,
                month: endOfNextYear.month,
                year: endOfNextYear.year,
            });
            break;
        case "all":
            setStartDate({
                day: null,
                month: null,
                year: null,
            });
            setEndDate({
                day: null,
                month: null,
                year: null,
            });
            break;
        default:
            setStartDate({
                day: null,
                month: null,
                year: null,
            });
            setEndDate({
                day: null,
                month: null,
                year: null,
            });
            break;
    }

    setSelectedInterval(interval);
    reInitCalendars();
};
