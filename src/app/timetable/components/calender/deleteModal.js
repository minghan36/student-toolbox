import React from "react";
import PropTypes from "prop-types";
import styles from "./style.module.scss"; // Import custom styles

// Component for the delete confirmation modal
export default function DeleteModal({
  isOpen, // Boolean to control the modal visibility
  setIsOpen, // Function to toggle the modal visibility
  handleDelete, // Function to handle the event deletion
  eventTitle, // Title of the event to be deleted
}) {
  return (
    isOpen && ( // Render the modal only if `isOpen` is true
      <div className={styles.modalOverlay}>
        <div className={styles.modalContent}>
          <h2>Delete Event</h2>
          {/* Confirmation message with the event title */}
          <p>Are you sure you want to delete the event '{eventTitle}'?</p>
          {/* Button to confirm deletion */}
          <button onClick={handleDelete}>Delete</button>
          {/* Button to cancel and close the modal */}
          <button onClick={() => setIsOpen(false)}>Cancel</button>
        </div>
      </div>
    )
  );
}

// Define PropTypes for DeleteModal to enforce the types of props passed
DeleteModal.propTypes = {
  isOpen: PropTypes.bool.isRequired, // Boolean to indicate if the modal should be visible
  setIsOpen: PropTypes.func.isRequired, // Function to toggle the modal visibility
  handleDelete: PropTypes.func.isRequired, // Function to handle the deletion of the event
  eventTitle: PropTypes.string, // String for the title of the event to be deleted
};

// Define default props if necessary
DeleteModal.defaultProps = {
  eventTitle: "the event", // Default event title if not provided
};
