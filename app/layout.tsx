import "./globals.css";
import type { Metadata } from "next";
import SmoothScrolling from "@/app/components/SmoothScrolling/SmoothScrolling";
import Menu from "@/app/components/Menu/Menu";

export const metadata: Metadata = {
    title: "Hex - Web Developer + Designer",
    description: "Portfolio of HEX, a freelance web developer specializing in modern web technologies. I’m Hex, a digital creator based in Poland, where creativity meets precision to craft modern, functional web experiences. I bring ideas to life with every line of code and design, blending innovation and technology to shape digital journeys that captivate, inspire, and stand the test of time.",
    keywords: "freelance web developer, web development, portfolio, modern websites, responsive design, user experience, digital creator, front-end development, UI/UX designer",
    openGraph: {
        type: "website",
        title: "Hex - Web Developer + Designer",
        description: "Portfolio of HEX, a freelance web developer specializing in modern web technologies and crafting captivating digital experiences.",
        url: "https://hexthecoder.pl",
        images: [
            {
                url: "https://hexthecoder.pl/images/about-photo.png",
                width: 1200,
                height: 630,
                alt: "Hex - Web Developer Portfolio Preview",
            },
        ],
    },
    twitter: {
        card: "summary_large_image",
        title: "Hex - Web Developer + Designer",
        description: "Crafting captivating, modern web experiences using cutting-edge technologies. Check out my portfolio.",
        images: "https://hexthecoder.pl/images/about-photo.png",
    },
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
