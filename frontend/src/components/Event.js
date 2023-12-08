import React from "react";

const EventComponent = ({ name, dateTime }) => {
  // Check if the provided dateTime is a string and convert it to a Date object if necessary
  const formattedDateTime = new Date(dateTime);

  // Function to extract content enclosed in []
  const extractContentInBrackets = (str) => {
    const matches = str.match(/\[(.*?)\]/);
    return matches ? matches[1] : ""; // returns the content within []
  };

  // Function to format the date in a readable way
  const formatDate = (date) => {
    // Check if the date is valid
    if (
      Object.prototype.toString.call(date) === "[object Date]" &&
      !isNaN(date)
    ) {
      return date.toDateString(); // You can use any date formatting method you prefer
    } else {
      return "Invalid Date";
    }
  };

  // Extract content within [] and display before the name
  const extractedContent = extractContentInBrackets(name);
  const displayName = extractedContent ? `${extractedContent} ` : ""; // Display content without []

  return (
    <div>
      <h3>
        {displayName}: {name.replace(/\[.*?\]/, "")}
      </h3>
      <p>Due Date: {formatDate(formattedDateTime)}</p>
    </div>
  );
};

export default EventComponent;
