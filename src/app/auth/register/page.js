import Title from "@/components/title";
import { createUserModel } from "@/lib/mongodb/mongodb";
import { isRedirectError } from "next/dist/client/components/redirect";
import Link from "next/link";
import { redirect } from "next/navigation";
import "../auth.css";

export default async function RegisterPage() {
  async function registerUser(formData) {
    "use server";

    try {
      const username = formData.get("username");
      const password = formData.get("password");

      const User = await createUserModel();
      const user = new User({ username: username, password: password });

      await user.save();

      redirect("/auth/signin");
    } catch (error) {
      if (isRedirectError(error)) {
        throw error;
      }

      console.error(error);
    }
  }

  return (
    <main className="auth">
      <Title text="Register" />
      <form action={registerUser} className="auth__form">
        <div>
          <label htmlFor="username">Username</label>
          <input
            id="username"
            name="username"
            type="text"
            placeholder="e.g. asdf"
            required
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            id="password"
            name="password"
            type="password"
            placeholder="••••••••"
            required
          />
        </div>
        <button type="submit">Register</button>
        <span className="auth__register">
          Already have an account? Sign in <Link href="/auth/signin">here</Link>
        </span>
      </form>
    </main>
  );
}
