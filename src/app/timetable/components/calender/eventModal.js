import React, { useState } from "react";
import PropTypes from "prop-types"; // Import PropTypes for type checking
import styles from "./style.module.scss"; // Import custom styles
import { createEventId } from "./event-utils"; // Utility function to create unique event IDs

export default function EventModal({ setIsOpen, selectedInfo, setEvents }) {
  // State to manage the event title and color
  const [title, setTitle] = useState("");
  const [color, setColor] = useState("#3788d8"); // Default color set to blue

  // Function to handle the creation of a new event
  const handleEventCreation = async () => {
    if (title && selectedInfo) {
      // Create a new event object with the entered details
      const newEvent = {
        id: createEventId(), // Generate a unique ID for the event
        title,
        start: selectedInfo.startStr, // Start time of the event
        end: selectedInfo.endStr, // End time of the event
        allDay: selectedInfo.allDay, // Boolean indicating if it's an all-day event
        backgroundColor: color, // Set the background color of the event
        borderColor: color, // Set the border color of the event
      };

      // Add the new event to the list of events in the parent component's state
      setEvents((prevEvents) => {
        if (Array.isArray(prevEvents)) {
          return [...prevEvents, newEvent]; // Add new event to the array of existing events
        } else {
          console.error("prevEvents is not an array", prevEvents);
          return [newEvent]; // Fallback: initialize with just the new event
        }
      });

      // Close the modal and reset the title and color states
      setIsOpen(false);
      setTitle("");
      setColor("#3788d8");
    }
  };

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <h2>Create New Event</h2>
        {/* Input field for entering the event title */}
        <input
          type="text"
          placeholder="Enter event title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <h2>Pick a colour</h2>
        {/* Color picker for selecting the event color */}
        <input
          type="color"
          value={color}
          onChange={(e) => setColor(e.target.value)}
        />
        {/* Button to create the event */}
        <button onClick={handleEventCreation}>Create Event</button>
        {/* Button to cancel and close the modal */}
        <button onClick={() => setIsOpen(false)}>Cancel</button>
      </div>
    </div>
  );
}

// Define PropTypes for EventModal to enforce the types of props passed
EventModal.propTypes = {
  setIsOpen: PropTypes.func.isRequired, // Function to control the visibility of the modal
  selectedInfo: PropTypes.object, // Object containing selected date/time information
  setEvents: PropTypes.func.isRequired, // Function to update the events state in the parent component
};

// Define default props if necessary
EventModal.defaultProps = {
  selectedInfo: null, // Default value for selectedInfo if not provided
};
