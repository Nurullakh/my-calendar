import { useMemo, useState } from "react";
import Header from "../Header/Header";
import CreateEvent from "../CreateEvent/CreateEvent";
import CalendarDay from "../CalendarDay/CalendarDay";
import Popover from "@mui/material/Popover";

import moment from "moment";
import "./style.scss";

const Calendar = function ({ events = [], locale, addEvent }) {
  const [currentMonth, setMonth] = useState(moment().startOf("month"));
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  function getStartDate(date) {
    let start = moment(date);
    let startOfMonth = date.startOf("month");
    start.subtract(startOfMonth.day(), "days");

    if (startOfMonth.day() < 1) {
      start.subtract(7, "days");
    }

    start.add(1, "days");

    return start;
  }

  const getCalendar = useMemo(() => {
    let monthViewStartDate = getStartDate(currentMonth);
    let calendar = [];
    for (let perWeek = 1; perWeek <= 6; perWeek++) {
      if (perWeek === 6 && monthViewStartDate.date() < 30) {
        break;
      }
      let week = [];

      for (let day = 1; day <= 7; day++) {
        week.push({
          monthDay: monthViewStartDate.date(),
          isToday: monthViewStartDate.isSame(moment(), "day"),
          isCurMonth: monthViewStartDate.isSame(currentMonth, "month"),
          weekDay: day,
          date: moment(monthViewStartDate),
          events: getEvents(monthViewStartDate.format()),
        });

        monthViewStartDate.add(1, "day");
      }

      calendar.push(week);
    }
    return calendar;
  }, [currentMonth, events])

  function getEvents(date) {
    let dayEvents = events.filter((day) => {
      let dataMoment = moment(day.date);

      return dataMoment.isSame(date);
    });

    return dayEvents;
  }

  function getWeekDay(weekday, locale) {
    const localMoment = moment().locale(locale);

    return localMoment.localeData().weekdays()[weekday % 7];
  }

  function openWindow(currentTarget, date) {
    setAnchorEl(currentTarget);
    setSelectedDate(date)
  }

  function handleClose() {
    setAnchorEl(null);
    setSelectedDate(null)
  };

  function addEventHandler({title, type}) {
    const event = {id: events.length + 1, title, type, date: selectedDate}
    addEvent(event)

    handleClose()
  }

  return (
    <div className="calendar">
      <Header currentMonth={currentMonth} locale={locale} change={setMonth} />
      <div className="calendar__content">
        <div className="calendar__weeks">
          {[...Array(7).keys()].map((dayIndex) => {
            return (
              <div className="calendar__week" key={dayIndex + 1}>
                {getWeekDay(dayIndex + 1, locale)}
              </div>
            );
          })}
        </div>
        <div className="calendar__dates">
          {getCalendar.map((week, index) => {
            return (
              <div className="calendar__row" key={index}>
                {week.map((day, index) => {
                  return (
                    <CalendarDay
                      key={index}
                      id={id}
                      date={day.date}
                      isToday={day.isToday}
                      isCurMonth={day.isCurMonth}
                      weekDay={day.weekDay}
                      monthDay={day.monthDay}
                      events={day.events}
                      openWindow={openWindow}
                    />
                  );
                })}
              </div>
            );
          })}
        </div>
      </div>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "center",
          horizontal: "left",
        }}
      ><CreateEvent submit={addEventHandler}/></Popover>
    </div>
  );
};

export default Calendar;