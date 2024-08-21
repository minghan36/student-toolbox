import { auth } from "@/auth"
import "./styles/avatar.css"
import Avatar from "./avatar"

export default async function LayoutAvatar() {
  const session = await auth()

  if (!session?.user?.name) return null

  return (
    <div className="layout-avatar">
      <Avatar size={48} username={session} />
    </div>
  )
}
