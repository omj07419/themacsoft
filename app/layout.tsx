import type { Metadata } from "next";
import { Sora, Plus_Jakarta_Sans, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CursorEffects from "@/components/CursorEffects";

const sora = Sora({
  subsets: ["latin"],
  variable: "--font-sora",
  weight: ["400", "600", "700", "800"],
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
  weight: ["400", "500", "600", "700"],
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://themacsoft.com"),
  title: "TheMacSoft — IT Consulting, Software Engineering & AI Solutions",
  description:
    "TheMacSoft delivers cutting-edge IT consulting, custom software engineering, and AI-powered analytics that turn complex business problems into clear, scalable solutions.",
  icons: {
    icon: "/site_icon.png",
  },
  openGraph: {
    title: "TheMacSoft — IT Consulting, Software Engineering & AI Solutions",
    description:
      "Empowering your business through innovative IT solutions, custom software, and AI-driven insights.",
    url: "https://themacsoft.com",
    siteName: "TheMacSoft",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${sora.variable} ${jakarta.variable} ${mono.variable}`}>
      <body className="bg-base text-ink antialiased overflow-x-hidden">
        <div className="noise" />
        <CursorEffects />
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
