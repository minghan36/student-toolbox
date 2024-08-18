"use client";

import Title from "@/components/title";
import Calender from "../../components/calender/calender";
import { useSession } from "next-auth/react";

export default function TimetablePage() {
  const session = useSession();
  const username = session?.data?.user?.name;
  return (
    <main>
      <Title text="Timetable" />
      <Calender username={username} />
    </main>
  );
}
