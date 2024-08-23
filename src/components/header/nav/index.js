import SignInButton from "@/components/auth/signin-button";
import SignOutButton from "@/components/auth/signout-button";
import { motion } from "framer-motion";
import { useSession } from "next-auth/react";
import { menuSlide } from "../anim";
import Link from "./link/index";
import "./headerNav.css";

export default function Index() {
  const session = useSession();

  const navItems = [
    { title: "Home", href: "/" },
    { title: "GPA Calculator", href: "/calculator" },
    { title: "To-Do List", href: "/todo" },
    { title: "Time Table Planner", href: "/timetable" },
  ];

  return (
    <motion.div
      variants={menuSlide}
      animate="enter"
      exit="exit"
      initial="initial"
      className="menu"
    >
      <div className="body">
        <div className="nav">
          {navItems.map((item, index) => (
            <Link key={item.href} data={{ ...item, index }} />
          ))}
          {session.status === "authenticated" ? (
            <SignOutButton />
          ) : (
            <SignInButton />
          )}
        </div>
      </div>
    </motion.div>
  );
}
