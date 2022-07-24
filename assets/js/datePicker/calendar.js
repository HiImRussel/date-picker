/** Helpers */
import { changeDate, createElement } from "../helpers/datePickerHelpers";

/** Luxon */
import { DateTime } from "luxon";

const isCurrentDate = (day, month, year) => {
    const actualDate = DateTime.now();
    const actualDay = actualDate.day;
    const actualMonth = actualDate.month;
    const actualYear = actualDate.year;

    if (actualMonth !== month || actualYear !== year) return false;

    return actualDay === day;
};

const isTheSameDate = (date, dateToCompare) => {
    if (date.month !== dateToCompare.month || date.year !== dateToCompare.year)
        return false;

    return date.day === dateToCompare.day;
};

const isDateSet = (date) => {
    return date.day !== undefined && date.day !== null;
};

const isDayAfter = (date, dateToCompare) => {
    const diff = DateTime.fromObject({
        day: date.monthDay,
        month: date.month,
        year: date.year,
    }).diff(
        DateTime.fromObject({
            day: dateToCompare.day,
            month: dateToCompare.month,
            year: dateToCompare.year,
        })
    );

    return diff.values.milliseconds > 0;
};

const isDayBefore = (date, dateToCompare) => {
    const diff = DateTime.fromObject({
        day: date.monthDay,
        month: date.month,
        year: date.year,
    }).diff(
        DateTime.fromObject({
            day: dateToCompare.day,
            month: dateToCompare.month,
            year: dateToCompare.year,
        })
    );

    return diff.values.milliseconds < 0;
};

const handleDayClick = (
    e,
    date,
    getPickedStartDate,
    getPickedEndDate,
    setStartDate,
    setEndDate,
    reInitCalendars
) => {
    let pickedStartDate = getPickedStartDate();
    let pickedEndDate = getPickedEndDate();
    const isLikeStart = isTheSameDate(
        { day: date.monthDay, month: date.month, year: date.year },
        pickedStartDate
    );
    const isLikeEnd = isTheSameDate(
        { day: date.monthDay, month: date.month, year: date.year },
        pickedEndDate
    );

    if (isLikeStart || isLikeEnd) {
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

const createCalendar = (
    day,
    month,
    year,
    rootContainer,
    changeMonthMethod,
    calendarProperty,
    className,
    getPickedStartDate,
    getPickedEndDate,
    setStartDate,
    setEndDate,
    reInitCalendars
) => {
    const newDate = DateTime.fromObject({ day, month, year });
    const prevDate = changeDate("prev", { day, month, year });
    const newPrevDate = DateTime.fromObject({
        day: prevDate.day,
        month: prevDate.month,
        year: prevDate.year,
    });

    const calendarBoxDOM = rootContainer.querySelector(".js-calendar-box");
    const currentCalendarBox = document.querySelector(
        `.js-calendar--${calendarProperty}`
    );
    const pickedStartDate = getPickedStartDate();
    const pickedEndDate = getPickedEndDate();

    // prevent from checking if is inside box (click outside auto close)
    if (currentCalendarBox !== null) {
        currentCalendarBox.style.display = "none";
        setTimeout(() => currentCalendarBox.remove(), 0);
    }

    const daysContainer = createElement("div", "date-picker__days-wrapper");
    const datePicker = createElement("div", "date-picker__date");

    const prevButton = createElement(
        "button",
        "date-picker__change-month-btn",
        "",
        `<svg width="7" height="12" viewBox="0 0 7 12" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M6 1L1 6L6 11" stroke="#667085" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>`
    );
    const nextButton = createElement(
        "button",
        "date-picker__change-month-btn",
        "",
        `<svg width="7" height="12" viewBox="0 0 7 12" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M1 1L6 6L1 11" stroke="#667085" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
        `
    );
    const activeDate = createElement(
        "span",
        "date-picker__active-date",
        "",
        `${newDate.monthLong} ${year}`
    );

    prevButton.addEventListener("click", () =>
        changeMonthMethod("prev", calendarProperty)
    );
    nextButton.addEventListener("click", () =>
        changeMonthMethod("next", calendarProperty)
    );

    datePicker.appendChild(prevButton);
    datePicker.appendChild(activeDate);
    datePicker.appendChild(nextButton);

    const days = ["Pn", "Wt", "Śr", "Cz", "Pt", "Sb", "Nd"];

    days.forEach((day) => {
        const dayName = createElement("div", "date-picker__day-name", "", day);

        daysContainer.appendChild(dayName);
    });

    const startDayCurrentMonth = newDate.startOf("month").weekday;
    const daysInPrevMonth = newPrevDate.daysInMonth;

    for (let monthDay = startDayCurrentMonth - 1; monthDay >= 1; monthDay--) {
        const prevMonthDay = createElement(
            "div",
            "date-picker__day -prev",
            "",
            daysInPrevMonth - monthDay + 1
        );

        daysContainer.appendChild(prevMonthDay);
    }

    const daysInMonth = newDate.daysInMonth;

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
            handleDayClick(
                e,
                { monthDay, month, year },
                getPickedStartDate,
                getPickedEndDate,
                setStartDate,
                setEndDate,
                reInitCalendars
            )
        );

        daysContainer.appendChild(renderDay);
    }

    const endDayCurrentMonth = newDate.endOf("month").weekday;

    if (endDayCurrentMonth < 7) {
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
    }

    const container = createElement(
        "div",
        `date-picker__calendar js-calendar--${calendarProperty} ${className}`
    );

    container.appendChild(datePicker);
    container.appendChild(daysContainer);

    if (calendarProperty === "firstCalendar") {
        const secondCalendar = document.querySelector(
            ".js-calendar--secondCalendar"
        );
        calendarBoxDOM.insertBefore(container, secondCalendar);
    } else {
        const firstCalendar = document.querySelector(
            ".js-calendar--firstCalendar"
        );
        firstCalendar.after(container);
    }
};

export default createCalendar;
