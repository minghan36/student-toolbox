import React from "react";
import PropTypes from "prop-types";
import styles from "./style.module.scss";
import { useSession } from "next-auth/react";

/**
 * DeleteModal component for confirming and handling event deletion.
 *
 * @param {Object} props - Component props
 * @param {boolean} props.isOpen - Boolean indicating if the modal is open.
 * @param {Function} props.setIsOpen - Function to set the modal open/closed state.
 * @param {Object|null} props.selectedEvent - The event selected for deletion or null if no event is selected.
 * @param {Function} props.setEvents - Function to update the events list after deletion.
 * @returns {JSX.Element|null} The rendered component or null if the modal is not open.
 */
export default function DeleteModal({
  isOpen,
  setIsOpen,
  selectedEvent,
  setEvents,
}) {
  const session = useSession();
  const username = session?.data?.user?.name;

  /**
   * Handles the deletion of the selected event.
   *
   * @async
   * @function
   * @returns {Promise<void>}
   */
  const handleEventDeletion = async () => {
    // If an event is selected, send a DELETE request to remove it
    if (selectedEvent) {
      const response = await fetch(`/api/user/${username}/event`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ eventId: selectedEvent.id }),
      });

      if (response.ok) {
        // Remove the deleted event from the events list
        setEvents((prevEvents) =>
          prevEvents.filter((event) => event.id !== selectedEvent.id)
        );
        setIsOpen(false);
      } else {
        alert("Failed to delete event");
      }
    }
  };

  return (
    isOpen && (
      <div className={styles.modalOverlay}>
        <div className={styles.modalContent}>
          <h2>Delete Event</h2>
          <p>
            Are you sure you want to delete the event '{selectedEvent?.title}'?
          </p>
          <button onClick={handleEventDeletion}>Delete</button>
          <button onClick={() => setIsOpen(false)}>Cancel</button>
        </div>
      </div>
    )
  );
}

// Define PropTypes for DeleteModal to enforce the types of props passed
DeleteModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  setIsOpen: PropTypes.func.isRequired,
  selectedEvent: PropTypes.object,
  setEvents: PropTypes.func.isRequired,
};

// Define default props if necessary
DeleteModal.defaultProps = {
  selectedEvent: null,
};
