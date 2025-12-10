import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Footer from "./shared/Footer";
import Navbar from "./shared/Navbar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "K&D Control Risk",
  description: "Descripción del tipo de servicios",
  icons: {
    icon: "/KyD.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <video
          className="global-background-video"
          autoPlay
          muted
          loop
          playsInline
        >
          <source src="/Background.mp4" type="video/mp4" />
        </video>

        <div className="app-shell">
          <Navbar />

          <main>{children}</main>

          <Footer />
        </div>
      </body>
    </html>
  );
}
