import type React from "react";
import "./globals.css";
import { Providers } from "@/components/Providers"; // adjust path if needed
import BanChecker from "@/components/BanChecker";

export const metadata = {
  title: "SkillSwap",
  description: "Trade your skills",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <BanChecker>{children}</BanChecker>
        </Providers>
      </body>
    </html>
  );
}
