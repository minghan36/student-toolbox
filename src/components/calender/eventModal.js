import React, { useState } from "react";
import PropTypes from "prop-types";
import styles from "./style.module.scss";
import { useSession } from "next-auth/react";
import { nanoid } from "nanoid";

/**
 * EventModal component for creating a new event.
 *
 * @param {Object} props - Component props
 * @param {Function} props.setIsOpen - Function to set the modal open/closed state.
 * @param {Object|null} props.selectedInfo - Information about the selected time slot or null if no slot is selected.
 * @param {Function} props.setEvents - Function to update the events list after creating a new event.
 * @returns {JSX.Element} The rendered component.
 */
export default function EventModal({ setIsOpen, selectedInfo, setEvents }) {
  const session = useSession();
  // State to manage the event title and color
  const [title, setTitle] = useState("");
  const [color, setColor] = useState("#3788d8");
  const username = session?.data?.user?.name;

  /**
   * Handles the creation of a new event.
   *
   * @async
   * @function
   * @returns {Promise<void>}
   */
  const handleEventCreation = async () => {
    if (title && selectedInfo) {
      const newEvent = {
        id: nanoid(), // Generate a unique ID for the event
        title,
        start: selectedInfo.startStr,
        end: selectedInfo.endStr,
        backgroundColor: color,
        borderColor: color,
      };

      // Send a POST request to create the new event
      const response = await fetch(`/api/user/${username}/event`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ event: newEvent }),
      });

      if (response.ok) {
        setEvents((prevEvents) => {
          // Ensure prevEvents is always an array
          return Array.isArray(prevEvents)
            ? [...prevEvents, newEvent]
            : [newEvent];
        });
        setIsOpen(false);
        setTitle("");
        setColor("#3788d8");
      } else {
        alert("Failed to create event");
      }
    }
  };

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <h2>Create New Event</h2>
        <input
          type="text"
          placeholder="Enter event title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <h2>Pick a colour</h2>
        <input
          type="color"
          value={color}
          onChange={(e) => setColor(e.target.value)}
        />
        <button onClick={handleEventCreation}>Create Event</button>
        <button onClick={() => setIsOpen(false)}>Cancel</button>
      </div>
    </div>
  );
}

// Define PropTypes for EventModal to enforce the types of props passed
EventModal.propTypes = {
  setIsOpen: PropTypes.func.isRequired,
  selectedInfo: PropTypes.object,
  setEvents: PropTypes.func.isRequired,
};

// Define default props if necessary
EventModal.defaultProps = {
  selectedInfo: null,
};
