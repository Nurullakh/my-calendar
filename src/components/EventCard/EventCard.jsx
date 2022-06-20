import "./style.scss";

const EventCard = ({title, type}) => {
  return (
    <div className="event-card">
    <div
      className={`event-card__content event-card__content_${type}`}
    >
      {title}
    </div>
  </div>
  )
}

export default EventCard