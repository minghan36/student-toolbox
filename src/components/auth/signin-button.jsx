"use client"

import { signIn } from "next-auth/react"

export default function SignInButton() {
  async function handleSignIn() {
    await signIn()
  }

  return <button onClick={handleSignIn}>Sign in</button>
}
