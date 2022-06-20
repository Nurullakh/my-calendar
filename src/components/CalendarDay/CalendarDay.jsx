import EventCard from "../EventCard/EventCard";
import './style.scss'

const CalendarDay =  ({
  id,
  date,
  isToday,
  isCurMonth,
  weekDay,
  monthDay,
  events,
  openWindow,
}) => {

  function open(event) {
    openWindow(event.currentTarget, date)
  }
  
  return (
    <div className="calendar-day" aria-describedby={id}>
      <div
        className={`calendar-day__content ${
          isToday && "calendar-day__content_today"
        } ${!isCurMonth && "calendar-day__content_other-mounth"} ${
          (weekDay === 6 || weekDay === 7) && "calendar-day__content_weekend"
        }`}
        onClick={open}
      >
        <div className="calendar-day__number">{monthDay}</div>
        <div className="calendar-day__event-wrapper">
          {events.map((event) => {
            return <EventCard title={event.title} type={event.type} key={event.id} />;
          })}
        </div>
      </div>
    </div>
  );
};

export default CalendarDay;
