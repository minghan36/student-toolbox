"use client"; // Directive to indicate that this file should be treated as a client component in a Next.js application.

import React, { useState, useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import styles from "./style.module.scss"; // Importing custom styles.
import EventModal from "./eventModal"; // Component for creating new events.
import DeleteModal from "./deleteModal"; // Component for confirming event deletion.

export default function Calendar() {
  // State variables to manage modal visibility, events, and selected event info.
  const [modalIsOpen, setModalIsOpen] = useState(false); // State to control the visibility of the event creation modal.
  const [deleteModalIsOpen, setDeleteModalIsOpen] = useState(false); // State to control the visibility of the delete confirmation modal.
  const [events, setEvents] = useState([]); // State to store the list of calendar events.
  const [selectedInfo, setSelectedInfo] = useState(null); // State to store the information about the date selected for event creation.
  const [selectedEvent, setSelectedEvent] = useState(null); // State to store the currently selected event for deletion.

  // Effect hook to fetch events from an API when the component is first rendered.
  useEffect(() => {
    // Placeholder for API call to fetch events. Replace with actual API call.
    // setEvents(); // This would be where you update the events state with data from your API.
  }, []); // Empty dependency array ensures this runs only once on component mount.

  // Function to handle date selection, triggering the event creation modal.
  const handleDateSelect = (selectInfo) => {
    setSelectedInfo(selectInfo); // Store the selected date/time information.
    setModalIsOpen(true); // Open the event creation modal.
  };

  // Function to handle event click, triggering the delete confirmation modal.
  const handleEventClick = (clickInfo) => {
    setSelectedEvent(clickInfo.event); // Store the event data that was clicked.
    setDeleteModalIsOpen(true); // Open the delete confirmation modal.
  };

  // Function to handle the deletion of an event.
  const handleEventDeletion = () => {
    if (selectedEvent) {
      // If an event is selected, filter it out of the events state.
      setEvents((prevEvents) =>
        prevEvents.filter((event) => event.id !== selectedEvent.id)
      );
      // Close the delete confirmation modal.
      setDeleteModalIsOpen(false);
      // Reset the selected event state to null.
      setSelectedEvent(null);
    }
  };

  return (
    <div className={styles.calendar_main}>
      <FullCalendar
        plugins={[timeGridPlugin, interactionPlugin]} // Loading plugins for the calendar (e.g., time grid view, interaction).
        initialView="timeGridWeek" // Setting the default view to a weekly time grid.
        editable={true} // Allowing events to be draggable and resizable.
        selectable={true} // Allowing date ranges to be selectable.
        events={events} // Passing the list of events to the calendar.
        select={handleDateSelect} // Event handler for date selection.
        eventClick={handleEventClick} // Event handler for event clicks.
        slotLabelFormat={{
          hour: "numeric",
          minute: "2-digit",
          omitZeroMinute: false,
        }} // Format for time slot labels.
      />

      {/* Render the event creation modal if it is open */}
      {modalIsOpen && (
        <EventModal
          isOpen={modalIsOpen}
          setIsOpen={setModalIsOpen}
          selectedInfo={selectedInfo}
          setEvents={setEvents}
        />
      )}

      {/* Render the delete confirmation modal if it is open */}
      {deleteModalIsOpen && (
        <DeleteModal
          isOpen={deleteModalIsOpen}
          setIsOpen={setDeleteModalIsOpen}
          handleDelete={handleEventDeletion}
          eventTitle={selectedEvent?.title}
        />
      )}
    </div>
  );
}
