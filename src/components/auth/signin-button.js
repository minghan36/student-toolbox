"use client";

import { signIn } from "next-auth/react";
import "./styles/button.css";

export default function SignInButton() {
  async function handleSignIn() {
    await signIn();
  }

  return (
    <button className={"sign-button"} onClick={handleSignIn}>
      Sign in
    </button>
  );
}
