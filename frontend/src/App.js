import { useEffect, useState } from "react";
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

// get user data
async function getUserData() {
  const response = await fetch("http://localhost:3000/request/getUserData", {
    method: "get",
    credentials: "include",
  });

  const data = await response.json();
  return data;
}

// logout
async function logout() {
  const response = await fetch("http://localhost:3000/request/logout", {
    method: "get",
    credentials: "include",
  });

  const data = await response.json();
  if (data.message === "Successfully logged out") {
    window.location.reload();
  }
  console.log(data);
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
  const [name, setName] = useState("");
  const [image, setImage] = useState("");

  // useEffect
  useEffect(() => {
    async function fetchData() {
      const response = await getUserData();
      if (response.message) {
        setName("");
      } else {
        console.log(response);
        setName(response.name);
        setImage(response.picture);
      }

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
      <img src={process.env.PUBLIC_URL + "/canvasly.png"} alt="logo" />

      <h2>Welcome {name}</h2>

      <div className="login-logout">
        {image && <img className="profile-img" src={image} alt="profile" />}

        <button className="login-btn" type="button" onClick={auth}>
          Login with Google
        </button>

        {/* <button type="button" onClick={handleFetchEvents}>
        Get Assignments
      </button> */}

        <button className="logout-btn" type="button" onClick={logout}>
          Logout
        </button>
      </div>

      <div>
        <h2>Canvas Assignments:</h2>
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
