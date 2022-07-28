/** Helpers */
import {
    createElement,
    isDateSet,
    isTheSameDate,
    isDayBefore,
    isDayAfter,
    isCurrentDate,
} from "../helpers/datePickerHelpers";

/** Methods */
import { handleDayClick } from "../methods/handleDayClick";

export const initCalendarDays = (
    date,
    prevDate,
    daysContainer,
    getCalendarsData,
    calendarAccessor
) => {
    const { pickedStartDate, pickedEndDate, calendarsData } =
        getCalendarsData();

    const month = calendarsData[calendarAccessor].month;
    const year = calendarsData[calendarAccessor].year;

    const startDayCurrentMonth = date.startOf("month").weekday;
    const daysInPrevMonth = prevDate.daysInMonth;

    //prev month days
    for (let monthDay = startDayCurrentMonth - 1; monthDay >= 1; monthDay--) {
        const prevMonthDay = createElement(
            "div",
            "date-picker__day -prev",
            "",
            daysInPrevMonth - monthDay + 1
        );

        daysContainer.appendChild(prevMonthDay);
    }

    // current month days
    const daysInMonth = date.daysInMonth;

    for (let monthDay = 1; monthDay <= daysInMonth; monthDay++) {
        const renderDay = createElement(
            "div",
            `date-picker__day js-date-picker-day ${
                isCurrentDate(monthDay, month, year) ? "-current" : ""
            }`,
            "",
            monthDay
        );

        const isStartSet = isDateSet(pickedStartDate);
        const isEndSet = isDateSet(pickedEndDate);

        if (isStartSet && isEndSet) {
            const isAfter = isDayAfter(
                { monthDay, month, year },
                pickedStartDate
            );
            const isBefore = isDayBefore(
                { monthDay, month, year },
                pickedEndDate
            );

            if (isAfter && isBefore) {
                renderDay.classList.add("-picked-between");
            }

            if (
                isTheSameDate(
                    { day: monthDay, month: month, year: year },
                    pickedStartDate
                )
            ) {
                const pseudoElementStart = createElement(
                    "div",
                    "date-picker__day js-date-picker-day -pseudo-element -picked",
                    "",
                    monthDay
                );

                renderDay.appendChild(pseudoElementStart);
                renderDay.classList.add("-start-day-picked");
            } else if (
                isTheSameDate(
                    { day: monthDay, month: month, year: year },
                    pickedEndDate
                )
            ) {
                const pseudoElementEnd = createElement(
                    "div",
                    "date-picker__day js-date-picker-day -pseudo-element -picked",
                    "",
                    monthDay
                );

                renderDay.appendChild(pseudoElementEnd);
                renderDay.classList.add("-end-day-picked");
            }
        } else if (
            isStartSet &&
            isTheSameDate(
                { day: monthDay, month: month, year: year },
                pickedStartDate
            )
        ) {
            renderDay.classList.add("-picked");
            renderDay.classList.add("-start-day");
        }

        renderDay.addEventListener("click", (e) =>
            handleDayClick({ monthDay, month, year }, getCalendarsData)
        );

        daysContainer.appendChild(renderDay);
    }

    //next month days
    const endDayCurrentMonth = date.endOf("month").weekday;

    if (endDayCurrentMonth >= 7) return;

    const daysToFull = 7 - endDayCurrentMonth;

    for (let monthDay = 1; monthDay <= daysToFull; monthDay++) {
        const nextMonthDay = createElement(
            "div",
            "date-picker__day -prev",
            "",
            monthDay
        );

        daysContainer.appendChild(nextMonthDay);
    }
};
