import Course from "./course"
import PropTypes from "prop-types";


export default function CourseList({ courses, onCourseDelete }) {

  return (
    <div className="courses">
      {courses.map((course) => (
        <Course
          key={course.id}
          id={course.id}
          courseName={course.courseName}
          courseDelete={onCourseDelete}
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
    })
  ).isRequired,
  onCourseDelete: PropTypes.func.isRequired,
};

