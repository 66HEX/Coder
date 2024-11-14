"use client"
import type { Metadata } from "next";

import "./globals.css";
import SmoothScrolling from "@/app/components/SmoothScrolling/SmoothScrolling";
import Navbar from "@/app/components/Navbar/Navbar";


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <SmoothScrolling>
          <Navbar/>
            {children}
        </SmoothScrolling>
      </body>
    </html>
  );
}
