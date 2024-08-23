"use client";

import { useSession } from "next-auth/react";
import Avatar from "./avatar";
import "./styles/avatar.css";

export default function LayoutAvatar() {
  const session = useSession();

  if (!session?.data?.user?.name) return null;

  return (
    <div className="layout-avatar">
      <Avatar size={48} username={session.data.user.name} />
    </div>
  );
}
