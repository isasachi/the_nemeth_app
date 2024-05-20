import type { Metadata } from "next";
import { Open_Sans } from "next/font/google";
import "@/app/globals.css";

const open = Open_Sans({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={open.className}>{children}</body>
    </html>
  );
}
