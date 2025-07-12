import type React from "react";
import "./globals.css";
import { Providers } from "@/components/Providers";
import BanChecker from "@/components/BanChecker";
import MaintenanceChecker from "@/components/MaintenanceChecker";
import NotificationPopup from "@/components/NotificationPopup";
import FloatingChatbot from "@/components/FloatingChatbot";

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
          <MaintenanceChecker>
            <BanChecker>
              {children}
              <NotificationPopup />
            </BanChecker>
          </MaintenanceChecker>
        </Providers>
        
      </body>
    </html>
  );
}
