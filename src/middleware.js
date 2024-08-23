import { withAuth } from "next-auth/middleware";

export default withAuth({
  pages: {
    signIn: "/auth/signin",
  },
  callbacks: {
    authorized: ({ req, token }) =>
      req.nextUrl.pathname === "/auth/register" || !!token,
  },
});
