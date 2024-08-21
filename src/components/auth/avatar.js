"use client";

import PropTypes from "prop-types";
import Blockies from "react-blockies";
import "./styles/avatar.css";

Avatar.propTypes = {
  size: PropTypes.number.isRequired,
  username: PropTypes.string.isRequired,
};

export default function Avatar({ size, username }) {
  return <Blockies seed={username} scale={size / 8} className="avatar" />;
}
