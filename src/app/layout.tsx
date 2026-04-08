import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "SOCAR FRAME_2",
  description: "SOCAR FRAME 2.0 Design System - Next.js + Tailwind CSS",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className="h-full antialiased">
      <body className="min-h-full flex flex-col font-sans">{children}</body>
    </html>
  );
}
