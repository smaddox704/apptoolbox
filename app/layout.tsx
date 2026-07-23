import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Steve's App Toolbox",
  description: "A handy collection of simple everyday tools.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
