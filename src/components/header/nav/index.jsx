import SignInButton from "@/components/auth/signin-button"
import SignOutButton from "@/components/auth/signout-button"
import { motion } from "framer-motion"
import { useSession } from "next-auth/react"
import { menuSlide } from "../anim"
import Link from "./link/index"
import styles from "./style.module.scss"

export default function Index() {
  const session = useSession()

  const navItems = [
    { title: "Home", href: "/" },
    { title: "GPA Calculator", href: "/calculator" },
    { title: "To-Do List", href: "/todo" },
    {
      title: "Time Table Planner",
      href: "/timetable",
    },
  ]

  return (
    <motion.div
      variants={menuSlide}
      animate="enter"
      exit="exit"
      initial="initial"
      className={styles.menu}>
      <div className={styles.body}>
        <div className={styles.nav}>
          <div className={styles.header}>
            <p>Put search bar here</p>
          </div>
          {navItems.map((item, index) => {
            return <Link key={item.href} data={{ ...item, index }} />
          })}
          {session.status === "authenticated" ? (
            <SignOutButton />
          ) : (
            <SignInButton />
          )}
        </div>
      </div>
    </motion.div>
  )
}
