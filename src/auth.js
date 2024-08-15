import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        username: {
          label: "Username",
          type: "text",
          placeholder: "e.g. demo",
        },
        password: {
          label: "Password",
          type: "password",
          placeholder: "••••••••",
        },
      },
      authorize: async (credentials) => {
        if (
          !(credentials.username === "demo" && credentials.password === "demo")
        ) {
          return null
        }

        return {
          id: 1,
          name: "Demo User",
          image: "https://www.gravatar.com/avatar/",
        }
      },
    }),
  ],
  theme: {
    colorScheme: "light",
  },
})
