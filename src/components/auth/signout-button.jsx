"use client"

import { signOut } from "next-auth/react"

export default function SignOutButton() {
  async function handleSignOut() {
    await signOut()
  }

  return <button onClick={handleSignOut}>Sign out</button>
}
