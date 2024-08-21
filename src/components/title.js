import PropTypes from "prop-types";

Title.propTypes = {
  text: PropTypes.string.isRequired
};

export default function Title({ text }) {
  return <h1>{text}</h1>
}