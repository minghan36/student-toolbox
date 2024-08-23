"use client";

import Title from "@/components/title";
import { useSession } from "next-auth/react";
import Timetable from "../../components/timetable/Timetable";

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
