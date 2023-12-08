import { useState } from "react";
import "./App.css";

// redirect to the url
function navigate(url) {
  window.location.href = url;
}

// send a request to the backend to get the url for the consent dialog
async function auth() {
  const response = await fetch("http://localhost:3000/request", {
    method: "post",
  });

  const data = await response.json();
  navigate(data.url);
}

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

  const handleFetchEvents = async () => {
    const calendarEvents = await getCalendarEvents();
    setEvents(calendarEvents);
  };

  return (
    <>
      <h1>Google OAuth Get Calendar Stuff</h1>
      <button type="button" onClick={() => auth()}>
        SIGN IN
      </button>

      <button type="button" onClick={handleFetchEvents}>
        FETCH CALENDAR EVENTS
      </button>

      <div>
        <h2>Calendar Events:</h2>
        <ul>
          {events &&
            events.length > 0 &&
            events.map((event, index) => (
              <li key={index}>
                <strong>{event.summary}</strong>:{" "}
                {event.start.date || event.start.dateTime}
              </li>
            ))}
        </ul>
      </div>
    </>
  );
}

export default App;
