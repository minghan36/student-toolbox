import styles from "./style.module.scss";
import Link from "next/link";
import { slide } from "../../anim";
import { motion } from "framer-motion";

import PropTypes from "prop-types";

export default function Index({ data }) {
  Index.propTypes = {
    data: PropTypes.object.isRequired,
  };
  return (
    <motion.div
      variants={slide}
      animate="enter"
      exit="exit"
      initial="initial"
      className={styles.link}
    >
      <Link href={data.href}>{data.title}</Link>
    </motion.div>
  );
}
