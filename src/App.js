import { useEffect, useState } from "react";
import Calendar from "./components/Calendar/Calendar";
import "./App.css";
import "moment/locale/ru";

function App() {
  const [events, setEvents] = useState(() => {
    if (localStorage.getItem("selectedDays")) {
      return JSON.parse(localStorage.getItem("selectedDays"));
    }
    return [];
  });

  useEffect(() => {
    if (events.length) {
      localStorage.setItem("selectedDays", JSON.stringify(events));
    }
  }, [events]);

  function addEvent(event) {
    setEvents([...events, event]);
  }

  return (
    <div className="App">
      <Calendar locale="ru" events={events} addEvent={addEvent} />
    </div>
  );
}

export default App;
