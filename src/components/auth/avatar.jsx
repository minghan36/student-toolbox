"use client"

import Blockies from "react-blockies"
import styles from "./auth.module.scss"

Avatar.propTypes = {
  size: PropTypes.number.isRequired,
  username: PropTypes.string.isRequired,
}

export default function Avatar({ size, username }) {
  return <Blockies seed={username} scale={size / 8} className={styles.avatar} />
}
