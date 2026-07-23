import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Steve's Pool Room",
  description: "A personal pool-game tracker for every match and rivalry.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
