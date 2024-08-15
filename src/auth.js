import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
import { createUserModel } from "./lib/mongodb/mongodb"

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
        const User = await createUserModel()
        const user = await User.findOne({ username: credentials.username })
        if (user?.comparePassword(credentials.password)) {
          return { id: user.id, name: user.username }
        } else {
          return null
        }
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  theme: {
    colorScheme: "light",
  },
})
