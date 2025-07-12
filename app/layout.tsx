import "./globals.css";
import { Providers } from "@/components/Providers";
import FloatingChatbot from "@/components/FloatingChatbot";

export const metadata = {
  title: "SkillSwap",
  description: "Trade your skills",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Providers>{children}</Providers>
        <FloatingChatbot />
      </body>
    </html>
  );
}