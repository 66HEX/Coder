import "./globals.css";
import SmoothScrolling from "@/app/components/SmoothScrolling/SmoothScrolling";
import Dock from "@/app/components/Dock/Dock";


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
