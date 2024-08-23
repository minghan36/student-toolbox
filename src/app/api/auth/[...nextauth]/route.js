import { createUserModel } from "@/lib/mongodb/mongodb";
import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";

const handler = NextAuth({
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
        const User = await createUserModel();
        const user = await User.findOne({ username: credentials.username });
        if (user?.comparePassword(credentials.password)) {
          return { id: user.id, name: user.username };
        } else {
          return null;
        }
      },
    }),
  ],
  pages: {
    signIn: "/auth/signin",
  },
  session: {
    strategy: "jwt",
  },
  theme: {
    colorScheme: "light",
  },
  callbacks: {
    jwt: async ({ token, user }) => {
      if (user) {
        token.user = user;
      }
      return token;
    },
    session: async ({ token, session }) => {
      session.user = token.user;
      return session;
    },
    authorized: async ({ auth }) => {
      const isLoggedIn = !!auth?.user;
      return isLoggedIn;
    },
  },
});

export { handler as GET, handler as POST };
