import "./globals.css";
import type { Metadata } from "next";
import SmoothScrolling from "@/app/components/SmoothScrolling/SmoothScrolling";
import Dock from "@/app/components/Dock/Dock";

export const metadata: Metadata = {
    title: "Hex - Freelance Web Developer",
    description: "Portfolio of HEX, a freelance web developer specializing in modern web technologies.",
    keywords: "freelance web developer, web development, portfolio",
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <SmoothScrolling>
            <Dock/>
            {children}
        </SmoothScrolling>
      </body>
    </html>
  );
}
