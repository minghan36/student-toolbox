import Title from "@/components/title"
import { createUserModel } from "@/lib/mongodb/mongodb"

export default async function RegisterPage() {
  async function registerUser(formData) {
    "use server"

    const username = formData.get("username")
    const password = formData.get("password")

    const User = await createUserModel()
    const user = new User({ username: username, password: password })

    await user.save()
  }

  return (
    <main>
      <Title text="Register" />
      <form action={registerUser}>
        <label>
          Username <input name="username" type="text" required />
        </label>
        <label>
          Password <input name="password" type="password" required />
        </label>
        <button type="submit">Register</button>
      </form>
    </main>
  )
}
