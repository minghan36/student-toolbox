import LayoutAvatar from "@/components/auth/layout-avatar";
import Header from "../components/header";
import { NextAuthProvider } from "../context/next-auth-provider";
import "./globals.css";

export const metadata = {
  title: "Student Toolbox",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <NextAuthProvider>
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
          <link
            href="https://fonts.googleapis.com/css2?family=Poppins:wght@100;200;300;400;500;600;700;800;900&display=swap"
            rel="stylesheet"
          />
          <LayoutAvatar />
          <Header />
          {children}
        </NextAuthProvider>
      </body>
    </html>
  );
}
