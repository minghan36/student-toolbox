import PropTypes from "prop-types"; 

export default function CalculatorHeader(props) {
    return (
      <div className="header">
        <h1>Grade Calculator</h1>
        <div className="createCourse">
          <input
            placeholder="Enter Course Name"
            onChange={props.onNewCourseInput}
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