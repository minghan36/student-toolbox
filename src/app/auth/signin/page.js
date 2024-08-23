"use client";

import Title from "@/components/title";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRef } from "react";
import "../auth.css";

export default function SignInPage() {
  const username = useRef("");
  const password = useRef("");

  async function handleSubmit(e) {
    e.preventDefault();
    await signIn("credentials", {
      username: username.current,
      password: password.current,
      redirect: true,
      callbackUrl: "http://localhost:3000",
    });
  }

  return (
    <main className="auth">
      <Title text="Sign In" />
      <form onSubmit={handleSubmit} className="auth__form">
        <div>
          <label htmlFor="username">Username</label>
          <input
            type="text"
            name="username"
            placeholder="e.g. asdf"
            required
            onChange={(e) => (username.current = e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            placeholder="••••••••"
            required
            onChange={(e) => (password.current = e.target.value)}
          />
        </div>
        <button type="submit">Sign In</button>
        <span className="auth__register">
          Don&apos;t have an account? Register{" "}
          <Link href="/auth/register">here</Link>
        </span>
      </form>
    </main>
  );
}
