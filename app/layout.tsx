// app/layout.tsx
import "./globals.css";
import { Providers } from "@/components/Providers"; // adjust path if needed

export const metadata = {
  title: "SkillSwap",
  description: "Trade your skills",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
