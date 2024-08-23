"use client";

import { signOut } from "next-auth/react";
import "./styles/button.css";

export default function SignOutButton() {
  async function handleSignOut() {
    await signOut();
  }

  return (
    <button onClick={handleSignOut} className={"sign-button"}>
      Sign out
    </button>
  );
}
