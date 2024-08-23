import "./styles/course.css";
import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import CourseHeader from "./courseHeader";
import Assignment from "./assignment";
import { nanoid } from "nanoid";

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
  const [totalAchieved, setTotalAchieved] = useState(props.totalAchieved || 0);
  const [averageAcheived, setAverageAcheived] = useState(
    props.averageAchieved || 0
  );
  const [courseGrade, setCourseGrade] = useState(props.courseGrade || "NA");
  const [assignments, setAssignments] = useState(props.assignments || []);

  let totalPercent;

  /**
   * Try to add a new assignment for the current course in the database.
   * If successful, add the new assignment to the list of assignments.
   */
  const handleNewAssignment = async () => {
    const newAssignment = { id: nanoid(), name: "", grade: "", weight: "" };
    const response = await fetch(`/api/user/${props.username}/calculator`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        type: "assignment",
        courseID: props.id,
        courseOrAssignment: newAssignment,
      }),
    });

    if (response.ok) {
      setAssignments([...assignments, newAssignment]);
    } else {
      alert("Failed to create assignment");
    }
  };

  /**
   * Attempt to remove the specified assignment from the database. If successful, remove from the local list.
   * @param {*} id
   */
  const handleAssignmentDelete = async (id) => {
    const response = await fetch(`/api/user/${props.username}/calculator`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        type: "assignment",
        deleteTarget: {
          courseID: props.id,
          assignmentID: id,
        },
      }),
    });

    if (response.ok) {
      const updatedAssignments = assignments.filter(
        (assignment) => assignment.id !== id
      );
      setAssignments(updatedAssignments);
      calculateTotalPercent(updatedAssignments);
      calculateAveragePercent(updatedAssignments);
    } else {
      alert("Failed to delete assignment");
    }
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
  const handleAssignmentUpdate = async (id, updatedData) => {
    const updatedAssignments = assignments.map((assignment) =>
      assignment.id === id ? { ...assignment, ...updatedData } : assignment
    );
    const newTotal = calculateTotalPercent(updatedAssignments);
    console.log("Total percent " + totalPercent);
    const newAverage = calculateAveragePercent(updatedAssignments);
    const newGrade = determineGrade(newAverage);
    const response = await fetch(`/api/user/${props.username}/calculator`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        type: "course",
        IDs: { courseID: props.id },
        updatedFields: {
          totalAchieved: newTotal,
          averageAchieved: newAverage,
          courseGrade: newGrade.letter,
        },
      }),
    });
    console.log(response.ok);
    if (response.ok) {
      setAssignments(updatedAssignments);
      setTotalAchieved(newTotal);
      setAverageAcheived(newAverage);
      setCourseGrade(newGrade.letter);
    } else {
      alert("Failed to update course");
    }
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
    return totalPercent;
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
    return averagePercent;
  };

  /**
   * Used to find the letter grade and GPA so we can update the relevant fields accordingly.
   * @param {Number} average
   * @returns
   */
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

  /**
   * Calculates the course grade based on the average achieved percentage
   * and updates the grade. Also updates the GPA in ../page.js.
   */
  useEffect(() => {
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
      <div
        className={
          showAssignments
            ? "course-assignments-show"
            : "course-assignments-hide"
        }
      >
        {assignments.map((assignment) => (
          <Assignment
            key={assignment.id}
            id={assignment.id}
            courseID={props.id}
            username={props.username}
            name={assignment.name}
            grade={assignment.grade}
            weight={assignment.weight}
            onDelete={handleAssignmentDelete}
            onUpdate={handleAssignmentUpdate}
          />
        ))}
        <button onClick={handleNewAssignment}>New Assignment +</button>
      </div>
    </div>
  );
}

Course.propTypes = {
  totalAchieved: PropTypes.number,
  averageAchieved: PropTypes.number,
  courseGrade: PropTypes.string,
  assignments: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.any.isRequired,
      name: PropTypes.string,
      grade: PropTypes.string,
      weight: PropTypes.string,
    })
  ),
  courseName: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
  courseDelete: PropTypes.func.isRequired,
  id: PropTypes.isRequired,
  onAverageUpdate: PropTypes.func.isRequired,
};
