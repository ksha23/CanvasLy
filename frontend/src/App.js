import { useEffect, useState } from "react";
import "./App.css";
import EventComponent from "./components/Event";
import PopupComponent from "./components/Popup";
import Navbar from "./components/Navbar";

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

function App() {
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

  // const handleFetchEvents = async () => {
  //   const response = await getCalendarEvents();
  //   if (response.error) {
  //     alert("You need to login first");
  //     return;
  //   }
  //   setEvents(response);
  // };

  return (
    <>
      <Navbar />
      <div className="app-container">
        <main className="main-content">
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

export default App;
