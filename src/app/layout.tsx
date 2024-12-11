"use client";
import { useAuth } from "@/hooks/useAuth";
import localFont from "next/font/local";
import "./globals.css";
import SideBar from "@/Components/sidebar/sidebar";
import { AppProvider } from "@/context/context";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = useAuth();
  return (
    <html lang="pt-BR">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased `}
      >
        <AppProvider>
          <div className="flex gap-10">
            {session && session.user && <SideBar />}
            {children}
          </div>
        </AppProvider>
      </body>
    </html>
  );
}
