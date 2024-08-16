import { auth } from "@/auth"
import DatabaseExample from "@/components/dashboard/database-example"
import Title from "@/components/title"

export default async function Home() {
  const session = await auth()

  return (
    <main>
      <Title
        text={`👋 Welcome, ${session ? session?.user?.name : "student"}!`}
      />
      <DatabaseExample />
    </main>
  )
}
