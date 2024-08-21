"use client";

import Title from "@/components/title";
import Timetable from "../../components/timetable/Timetable";
import { useSession } from "next-auth/react";

export default function TimetablePage() {
  const session = useSession();
  const username = session?.data?.user?.name;
  return (
    <main>
      <Title text="Timetable" />
      <Timetable username={username} />
    </main>
  );
}
