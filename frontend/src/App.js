import { useEffect, useState } from "react";
import "./App.css";
import EventComponent from "./components/Event";
import PopupComponent from "./components/Popup";

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
      <div className="login-logout">
        <img
          className="site-name"
          src={process.env.PUBLIC_URL + "/canvasly.png"}
          alt="logo"
        />

        <div className="login-logout">
          {image && <img className="profile-img" src={image} alt="profile" />}

          <h2 className="profile-name">{name}</h2>

          <button className="login-btn" type="button" onClick={auth}>
            <img src={process.env.PUBLIC_URL + "/sign-in2.png"} alt="sign-in" />
          </button>

          {/* <button type="button" onClick={handleFetchEvents}>
        Get Assignments
      </button> */}

          <button className="logout-btn" type="button" onClick={logout}>
            <strong>Log Out</strong>
          </button>
        </div>
      </div>

      <div>
        <div className="login-logout">
          <h2>Canvas Assignments:</h2>
          <PopupComponent />
        </div>

        {events &&
          events.length > 0 &&
          events.map((event) => (
            <EventComponent name={event.name} dateTime={event.dueDate} />
          ))}
      </div>
    </>
  );
}

export default App;
