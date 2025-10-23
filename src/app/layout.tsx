import Image from "next/image"; // Import the Image component
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { BackgroundRippleEffect } from "../components/ui/background-ripple-effect";

import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "PI Culture Quest",
  description: "Making onboarding fun",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* Add the favicon */}
        <link rel="icon" href="/logo.svg" type="image/svg+xml" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased relative`}
      >
        <div className="absolute top-4 left-1/2 transform -translate-x-1/2 z-50 mt-2">
          <Image
            src="/logo.png" 
            alt="Logo"
            width={108} 
            height={48} 
            priority 
          />
        </div>
        <div className="absolute inset-0">
          <BackgroundRippleEffect />
        </div>
        <div className="relative">{children}</div>
      </body>
    </html>
  );
}
