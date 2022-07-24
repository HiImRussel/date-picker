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

    return date.day !== dateToCompare.day;
};

const isDateSet = (date) => {
    return date.day !== undefined && date.day !== null;
};

const handleDayClick = (
    e,
    date,
    getPickedStartDate,
    getPickedEndDate,
    setStartDate,
    setEndDate
) => {
    const dayElement = e.target;
    const allDays = document.querySelectorAll(".js-date-picker-day");

    if (!isDateSet(getPickedStartDate())) {
        setStartDate({
            day: date.monthDay,
            month: date.month,
            year: date.year,
        });
    } else if (!isDateSet(getPickedEndDate())) {
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

        allDays.forEach((domDay) => {
            domDay.classList.remove("-picked");
        });
    }

    dayElement.classList.add("-picked");
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
    setEndDate
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
        "<"
    );
    const nextButton = createElement(
        "button",
        "date-picker__change-month-btn",
        "",
        ">"
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

        renderDay.addEventListener("click", (e) =>
            handleDayClick(
                e,
                { monthDay, month, year },
                getPickedStartDate,
                getPickedEndDate,
                setStartDate,
                setEndDate
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
