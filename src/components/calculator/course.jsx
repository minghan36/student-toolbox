import "./css/course.css";
import { useState } from "react";
import PropTypes from "prop-types"; // Import PropTypes
import CourseHeader from "./courseHeader";

export default function Course(props) {
  const [showAssignments, setShowAssignments] = useState(false);

  const handleCourseClick = () => {
    setShowAssignments(!showAssignments);
  };

  return (
    <div className="course">
      <CourseHeader courseName={props.courseName} onClick={handleCourseClick} onDelete={() => props.courseDelete(props.id)}></CourseHeader>
      
      {showAssignments && (
        <div className="courseAssignments">
          <h3>TODO: assignments</h3>
          <button>New Assignment +</button>
        </div>
      )}
    </div>
  );
}

Course.propTypes = {
  courseName: PropTypes.string.isRequired,
  courseDelete: PropTypes.func.isRequired,
  id: PropTypes.isRequired,
};
