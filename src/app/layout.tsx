import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "OSC-Lit",
  description: "Feel the Power of Open Source",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} font-sans antialiased`}>
        <div className="fixed top-0 left-0 right-0 z-50">
          <Navbar />{/* Navbar */}
        </div>
        {children}
        <div className="fixed bottom-0 left-0 right-0 z-50">
          <Footer />{/* Footer */}
        </div>
      </body>
    </html>
  );
}
