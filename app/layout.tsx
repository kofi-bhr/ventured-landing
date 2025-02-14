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
  metadataBase: new URL('https://venturedglobal.org'),
  title: "VenturEd Global | High School Tech Fellowship & Startup Internships",
  description: "Join VenturEd's selective fellowship connecting ambitious high school students to hands-on internships at innovative startups. Build real-world tech experience and join our global community.",
  keywords: ['tech fellowship', 'high school internship', 'startup internship', 'tech internship', 'student fellowship', 'tech startup internships', 'high school tech internships', 'high school tech fellowship', 'high school tech startup internships,'],
  authors: [{ name: "VenturEd" }],
  publisher: "VenturEd",
  openGraph: {
    title: "VenturEd Global",
    description: "Empowering underrepresented high school students with tech opportunities at world-class startups.",
    url: "https://venturedglobal.org",
    siteName: "VenturEd Global",
    images: [
      {
        url: '/ventured.png',
        width: 1200,
        height: 630,
        alt: 'VenturEd Fellowship Program | Tech Internships for High School Students'
      }
    ],
    locale: "en_US",
    type: "website"
  },
  other: {
    'application-ld+json': JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'EducationalOrganization',
      name: 'VenturEd Global',
      description: 'VenturEd is a selective fellowship program connecting high school students from underrepresented backgrounds with hands-on internships at innovative tech startups.',
      url: 'https://venturedglobal.org',
      sameAs: [
        'https://linkedin.com/company/venturedglobal',
        'https://www.instagram.com/venturedglobal/'
      ],
      areaServed: 'Worldwide',
      program: {
        '@type': 'EducationalOccupationalProgram',
        name: 'VenturEd Fellowship Program',
        description: '8-week fellowship program connecting high-potential students with tech startup internships',
        timeToComplete: 'P8W',
        educationalProgramMode: 'hybrid',
        educationalCredentialAwarded: 'Fellowship Certificate',
        occupationalCredentialAwarded: 'Tech Industry Experience',
        programType: 'Internship Program'
      }
    })
  },
  alternates: {
    canonical: 'https://venturedglobal.org'
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
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
