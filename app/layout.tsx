// app/layout.tsx
import "./globals.css";
import { SessionProvider } from "next-auth/react";

export const metadata = {
  title: "Skill Swap",
  description: "Swap your skills with others easily",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <SessionProvider>{children}</SessionProvider>
      </body>
    </html>
  );
}
