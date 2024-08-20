import Course from "./course"
import PropTypes from "prop-types";


export default function CourseList({ courses, username, onCourseDelete, onAverageUpdate }) {

  return (
    <div className="courses">
      {courses.map((course) => (
        <Course
          key={course.id}
          id={course.id}
          username={username}
          totalAchieved={course.totalAchieved}
          averageAchieved={course.averageAchieved}
          courseGrade={course.courseGrade}
          assignments={course.assignments}
          courseName={course.courseName}
          courseDelete={onCourseDelete}
          onAverageUpdate={onAverageUpdate}
        />
      ))}
    </div>
  );
}

CourseList.propTypes = {
  courses: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.any.isRequired,
      courseName: PropTypes.string.isRequired,
      totalAchieved: PropTypes.number,
      averageAchieved: PropTypes.number,
      courseGrade: PropTypes.string,
      assignments: PropTypes.arrayOf(
        PropTypes.shape({
          id: PropTypes.any.isRequired,
          name: PropTypes.string,
          grade: PropTypes.string,
          weight: PropTypes.string
        }))
    })
  ).isRequired,
  onCourseDelete: PropTypes.func.isRequired,
  onAverageUpdate: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired
};