import React from "react";
import Navbar from "../components/Navbar";
import "./Home.css";
import Youtube from "../components/Youtube";

const HomePage = () => {
  return (
    <div className="homepage">
      <Navbar />
      <div className="main-content">
        <h1>Welcome to CanvasLy</h1>
        <p>Empowering Students to Prioritize Assignments Efficiently</p>

        <div className="why-canvasly">
          <h2>Why CanvasLy?</h2>
          <ul>
            <li>Efficiency in assignment management</li>
            <li>Customization for individual study styles</li>
            <li>Deadline management</li>
            <li>User-friendly interface</li>
          </ul>
        </div>

        <div className="how-it-works">
          <h2>How to Get Started:</h2>
          <ol>
            <li>Go to "Canvas Calendar" in the side menu of Canvas</li>
            <li>Scroll down all the way to "Calendar Feed"</li>
            <li>Copy the URL</li>
            <li>Go to Google Calendar</li>
            <li>
              Click the + button next to "Other Calendars" and select "From URL"
            </li>
            <li>Paste the URL and click "Add Calendar"</li>
            <li>Make sure your calendar's name has "(Canvas)" in it</li>
            <li>Go to CanvasLy and click "Sign In with Google"</li>
            <li>You're Done!</li>
          </ol>
          <Youtube videoId="5tayaNGT-F4" />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
