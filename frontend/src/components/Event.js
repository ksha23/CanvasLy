import React from "react";
import "./Event.css";

const completeAssignment = async (id) => {
  const response = await fetch(`http://localhost:3000/assignments/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ id: id }),
  });
  const data = await response.json();
  return data;
};

const EventComponent = ({ id, name, dateTime, difficulty, type }) => {
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
      <p className="due-date">
        <strong>Due Date: </strong>
        {formatDate(formattedDateTime)} | <strong>Difficulty: </strong>
        {difficulty} | <strong>Type: </strong>
        {type}
      </p>
      <button onClick={() => completeAssignment(id)}>Complete</button>
    </div>
  );
};

export default EventComponent;
