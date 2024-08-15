import { auth } from "@/auth"
import styles from "./auth.module.scss"
import Avatar from "./avatar"

export default async function LayoutAvatar() {
  const session = await auth()

  if (!session) return null

  return (
    <div className={styles["layout-avatar"]}>
      <Avatar size={48} username={session.user.name} />
    </div>
  )
}
