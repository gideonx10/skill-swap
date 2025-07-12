import "./globals.css";
import SessionWrapper from "@/components/SessionWrapper";

export const metadata = {
  title: "Skill Swap",
  description: "Swap your skills with others easily",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <SessionWrapper>{children}</SessionWrapper>
      </body>
    </html>
  );
}
