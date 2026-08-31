import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import AppHeader from "@/component/home/navbar";
import Footer from "@/component/home/footer";
import { Toaster } from "react-hot-toast";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ABC School Management System",
  description: "Comprehensive School Management System for ABC School",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col justify-between">
        <Toaster position="top-right" reverseOrder={false} />
        <AppHeader />
        <div className="flex-1">{children}</div>
        <Footer />
      </body>
    </html>
  );
}
