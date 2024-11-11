import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

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

export const metadata: Metadata = {
  title: "VenturEd Global",
  description: "Empowering underrepresented high school students with tech opportunities at world-class startups.",
  authors: [{ name: "VenturEd" }],
  publisher: "VenturEd",
  openGraph: {
    title: "VenturEd Global",
    description: "Empowering underrepresented high school students with tech opportunities at world-class startups.",
    url: "https://venturedglobal.org",
    siteName: "VenturEd Global",
    images: [
      {
        url: "/ventured.png",
        width: 800,
        height: 600,
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "VenturEd Global",
    description: "Empowering underrepresented high school students with tech opportunities at world-class startups.",
    images: ["/ventured.png"],
  },
  icons: {
    icon: "/ventured.png",
    shortcut: "/ventured.png",
    apple: "/ventured.png",
  },
  other: {
    "article:published_time": "2024-11-11T00:00:00.000Z",
  }
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
        {children}
      </body>
    </html>
  );
}
