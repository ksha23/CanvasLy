import { useEffect, useState } from "react";
import "./Assignments.css";
import EventComponent from "../components/Event";
import PopupComponent from "../components/Popup";
import Navbar from "../components/Navbar";

// get the calendar events from the backend
async function getCalendarEvents() {
  const response = await fetch(
    "http://localhost:3000/oauth/getCalendarEvents",
    {
      method: "get",
      credentials: "include",
    }
  );
  const data = await response.json();
  return data;
}

function AssignmentsPage() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const events = await getCalendarEvents();
      if (events.error) {
        return;
      }
      setEvents(events);
    }
    fetchData();
  }, []);

  return (
    <>
      <Navbar />
      <div className="assignments-container">
        <main>
          <section className="canvas-assignments">
            <h2>Canvas Assignments:</h2>
            <PopupComponent />
          </section>

          <div className="events-list">
            {events &&
              events.length > 0 &&
              events.map((event) => (
                <EventComponent
                  key={event._id}
                  id={event._id}
                  name={event.name}
                  dateTime={event.dueDate}
                  difficulty={event.difficulty}
                  type={event.type}
                  className="event"
                />
              ))}
          </div>
        </main>
      </div>
    </>
  );
}

export default AssignmentsPage;
