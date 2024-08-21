import PropTypes from "prop-types";

export default function CalculatorHeader(props) {
  return (
    <div className="header">
      <div className="create-course">
        <input id="course-input"
          placeholder="Enter Course Name"
          onChange={props.onNewCourseInput}
          onKeyDown={(e) => {
            if (!props.input && (e.key === "Enter"))
              props.onNewCourse();
          }}
        ></input>
        <button disabled={props.input} onClick={props.onNewCourse}>
          +
        </button>
      </div>
    </div>
  )
}

CalculatorHeader.propTypes = {
  onNewCourseInput: PropTypes.func.isRequired,
  onNewCourse: PropTypes.func.isRequired,
  input: PropTypes.isRequired,
};