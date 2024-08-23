"use client";

import { useSession } from "next-auth/react";
import Title from "../title";

export default function Welcome() {
  const session = useSession();
  const username = session?.data?.user?.name;

  return <Title text={`👋 Welcome, ${username || "student"}!`} />;
}
