import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Контур 18 — цифровой пропуск",
    template: "%s · Контур 18",
  },
  description:
    "Безопасное подтверждение возраста и постоянный цифровой QR-пропуск для проекта «Инженеры будущего».",
  applicationName: "Контур 18",
  robots: { index: false, follow: false },
};

export const viewport: Viewport = {
  colorScheme: "dark",
  themeColor: "#030812",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="ru">
      <body>{children}</body>
    </html>
  );
}
