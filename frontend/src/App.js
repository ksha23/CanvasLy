import { useState } from "react";
import "./App.css";
import EventComponent from "./components/Event";

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
  console.log(data);
  return data;
}

function App() {
  const [events, setEvents] = useState([]);

  const handleFetchEvents = async () => {
    const response = await getCalendarEvents();
    // if the response has an error, then we need to re-authenticate
    if (response.error) {
      auth();
      return;
    }
    setEvents(response);
  };

  return (
    <>
      <h1>Google OAuth Calendar API</h1>

      <button type="button" onClick={handleFetchEvents}>
        Get Calendar Events
      </button>

      <div>
        <h2>Calendar Events:</h2>
        <ul>
          {events &&
            events.length > 0 &&
            events.map((event, index) => (
              <li key={index}>
                <EventComponent
                  name={event.summary}
                  dateTime={event.start.dateTime || event.start.date}
                />
              </li>
            ))}
        </ul>
      </div>
    </>
  );
}

export default App;
