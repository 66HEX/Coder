import "./globals.css";
import type { Metadata } from "next";
import SmoothScrolling from "@/app/components/SmoothScrolling/SmoothScrolling";
import Menu from "@/app/components/Menu/Menu";
import Loader from "@/app/components/Loader";


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
            <Menu/>
            {children}
        </SmoothScrolling>
      </body>
    </html>
  );
}
