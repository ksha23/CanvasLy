import React from "react";
import "./Event.css";

const EventComponent = ({ name, dateTime }) => {
  const formattedDateTime = new Date(dateTime);

  const extractContentInBrackets = (str) => {
    const matches = str.match(/\[(.*?)\]/);
    return matches ? matches[1] : "";
  };

  const formatDate = (date) => {
    if (
      Object.prototype.toString.call(date) === "[object Date]" &&
      !isNaN(date)
    ) {
      return date.toDateString();
    } else {
      return "Invalid Date";
    }
  };

  const extractedContent = extractContentInBrackets(name);
  const displayName = extractedContent ? `${extractedContent} ` : "";

  return (
    <div className="event-container">
      <h3 className="event-title">
        {displayName}
        <span className="event-name">{name.replace(/\[.*?\]/, "")}</span>
      </h3>
      <p className="due-date">Due Date: {formatDate(formattedDateTime)}</p>
    </div>
  );
};

export default EventComponent;
