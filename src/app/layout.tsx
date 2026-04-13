import type { Metadata } from "next";
import "./globals.css";
import Navigation from "@/components/Navigation";

export const metadata: Metadata = {
  title: "AP CS A Prep — 2026 Exam",
  description:
    "Interactive AP Computer Science A exam preparation with adaptive learning, coding exercises, and practice exams.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen flex">
        <Navigation />
        <main className="flex-1 overflow-auto">{children}</main>
      </body>
    </html>
  );
}
