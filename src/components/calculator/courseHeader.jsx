import PropTypes from "prop-types";

export default function CourseHeader({
  courseName,
  onClick,
  onDelete,
  totalAchieved,
  averageAcheived,
  courseGrade,
}) {
  return (
    <button className="courseInfo" onClick={onClick} type="button">
      <div>
        <div className="courseName">Course Name: {courseName} </div>
        <div className="letterGrade">{courseGrade}</div>
      </div>
      <div className="gradeSummary">
        <div className="totalGrade">Total %: {totalAchieved}%</div>
        <div className="averageGrade">Average %: {averageAcheived}%</div>
        <button className="deleteCourseBtn " onClick={() => onDelete()}>
          x
        </button>
      </div>
    </button>
  );
}

CourseHeader.propTypes = {
  courseName: PropTypes.string.isRequired,
  onDelete: PropTypes.func.isRequired,
  onClick: PropTypes.func.isRequired,
  totalAchieved: PropTypes.isRequired,
  averageAcheived: PropTypes.isRequired,
  courseGrade: PropTypes.isRequired

};
