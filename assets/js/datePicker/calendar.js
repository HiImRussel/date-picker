/** Helpers */
import { changeDate, createElement } from "../helpers/datePickerHelpers";

/** Luxon */
import { DateTime } from "luxon";

const createCalendarDay = (day) => {
    const dayContainer = createElement("div", "date-picker__day", "", day);

    return dayContainer;
};

const createCalendar = (
    day,
    month,
    year,
    rootContainer,
    changeMonthMethod,
    calendarProperty,
    className
) => {
    const newDate = DateTime.fromObject({ day, month, year });
    const prevDate = changeDate("prev", { day, month, year });
    const nextDate = changeDate("prev", { day, month, year });
    const newPrevDate = DateTime.fromObject({
        day: prevDate.day,
        month: prevDate.month,
        year: prevDate.year,
    });
    const newNextDate = DateTime.fromObject({
        day: nextDate.day,
        month: nextDate.month,
        year: nextDate.year,
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

    for (day = startDayCurrentMonth - 1; day >= 1; day--) {
        const prevMonthDay = createElement(
            "div",
            "date-picker__day -prev",
            "",
            daysInPrevMonth - day + 1
        );

        daysContainer.appendChild(prevMonthDay);
    }

    const daysInMonth = newDate.daysInMonth;

    for (day = 1; day <= daysInMonth; day++) {
        daysContainer.appendChild(createCalendarDay(day));
    }

    const endDayCurrentMonth = newDate.endOf("month").weekday;

    if (endDayCurrentMonth < 7) {
        const daysToFull = 7 - endDayCurrentMonth;

        for (day = 1; day <= daysToFull; day++) {
            const nextMonthDay = createElement(
                "div",
                "date-picker__day -prev",
                "",
                day
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
