import "./styles/course.css";
import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import CourseHeader from "./courseHeader";
import Assignment from "./assignment";

/**
 * Course component represents a single course in the application. It displays the course's name,
 * a list of assignments, and calculated totals such as total achieved percentage, average achieved 
 * percentage, and the course grade.
 * 
 * State:
 * - `showAssignments` (Boolean): Determines whether the assignments for the course are visible.
 * - `totalAchieved` (Number): The total percentage achieved for the course.
 * - `averageAcheived` (Number): The average percentage achieved for the course.
 * - `courseGrade` (String): The grade of the course, default is "NA".
 * - `assignments` (Array): Array of assignment objects associated with the course. Each assignment contains an 'id' field.
 * @param {*} props 
 * @returns 
 */
export default function Course(props) {
  const [showAssignments, setShowAssignments] = useState(false);
  const [totalAchieved, setTotalAchieved] = useState(0);
  const [averageAcheived, setAverageAcheived] = useState(0);
  const [courseGrade, setCourseGrade] = useState("NA");
  const [assignments, setAssignments] = useState([]);

  const crypto = window.crypto || window.msCrypto;
  let array = new Uint32Array(1);
  let totalPercent;

  const handleNewAssignment = () => {
    setAssignments([...assignments, { id: crypto.getRandomValues(array) }]);
  };

  const handleAssignmentDelete = (id) => {
    const updatedAssignments = assignments.filter(
      (assignment) => assignment.id !== id
    );
    setAssignments(updatedAssignments);
    calculateTotalPercent(updatedAssignments);
    calculateAveragePercent(updatedAssignments);

  };

  const handleCourseClick = () => {
    setShowAssignments(!showAssignments);
  };

  /**
   *  Updates the data of a specific assignment and recalculates the total
   *  and average percentages. The function is passed into Assignment components.
   *
   * @param {*} id of the Assignment being updated
   * @param {*} updatedData Name, Grade% and Weight% inputs in Assignment components
   */
  const handleAssignmentUpdate = (id, updatedData) => {
    const updatedAssignments = assignments.map((assignment) =>
      assignment.id === id ? { ...assignment, ...updatedData } : assignment
    );
    setAssignments(updatedAssignments);

    calculateTotalPercent(updatedAssignments);
    console.log("Total percent " + totalPercent);
    calculateAveragePercent(updatedAssignments);
  };

  /**
   * Helper function called in 'handleAssignmentUpdate'.
   *
   * @param {*} updatedAssignments placeholder 'assignments' array since setter functions of the useState hook are async
   */
  const calculateTotalPercent = (updatedAssignments) => {
    totalPercent = 0;
    for (let assignment in updatedAssignments) {
      totalPercent +=
        parseFloat(updatedAssignments[assignment].weight || 0) *
        (parseFloat(updatedAssignments[assignment].grade || 0) / 100);
    }
    totalPercent.toFixed(1);
    setTotalAchieved(totalPercent);
  };

  /**
   * Helper function called in 'handleAssignmentUpdate'.
   *
   * @param {*} updatedAssignments placeholder 'assignments' array since setter functions of the useState hook are async
   */
  const calculateAveragePercent = (updatedAssignments) => {
    let averagePercent = 0;
    for (let assignment in updatedAssignments) {
      averagePercent += parseFloat(updatedAssignments[assignment].weight);
    }
    averagePercent = (totalPercent / averagePercent) * 100;
    averagePercent = parseFloat(averagePercent.toFixed(1));
    setAverageAcheived(averagePercent);
  };

  /**
   * Calculates the course grade based on the average achieved percentage
   * and updates the grade. Also updates the GPA in ../page.js. 
   */
  useEffect(() => {
    const determineGrade = (average) => {
      if (average >= 90) return { letter: "A+", gpa: 9 };
      if (average >= 85) return { letter: "A", gpa: 8 };
      if (average >= 80) return { letter: "A-", gpa: 7 };
      if (average >= 75) return { letter: "B+", gpa: 6 };
      if (average >= 70) return { letter: "B", gpa: 5 };
      if (average >= 65) return { letter: "B-", gpa: 4 };
      if (average >= 60) return { letter: "C+", gpa: 3 };
      if (average >= 55) return { letter: "C", gpa: 2 };
      if (average >= 50) return { letter: "C-", gpa: 1 };
      if (average >= 45) return { letter: "D+", gpa: 0 };
      if (average >= 40) return { letter: "D", gpa: 0 };
      if (average >= 30) return { letter: "D-", gpa: 0 };
      return { letter: "F", gpa: 0 };
    };

    const grade = determineGrade(averageAcheived);

    setCourseGrade(grade.letter);
    props.onAverageUpdate(props.id, grade.gpa);
  }, [averageAcheived]);

  return (
    <div className="course">
      <CourseHeader
        courseName={props.courseName}
        onClick={handleCourseClick}
        onDelete={() => props.courseDelete(props.id)}
        totalAchieved={totalAchieved}
        averageAcheived={averageAcheived}
        courseGrade={courseGrade}
      ></CourseHeader>
      <div className={showAssignments ? "course-assignments-show" : "course-assignments-hide"}>
        {assignments.map((assignment) => (
          <Assignment
            key={assignment.id}
            id={assignment.id}
            name={assignment.name}
            grade={assignment.grade}
            weight={assignment.weight}
            onDelete={handleAssignmentDelete}
            onUpdate={handleAssignmentUpdate}
          />
        ))}
        <button onClick={handleNewAssignment}>
          New Assignment +
        </button>
      </div>
    </div>
  );
}

Course.propTypes = {
  courseName: PropTypes.string.isRequired,
  courseDelete: PropTypes.func.isRequired,
  id: PropTypes.isRequired,
  onAverageUpdate: PropTypes.func.isRequired
};
