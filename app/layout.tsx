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

const instrumentSerif = localFont({
  src: "./fonts/InstrumentSerif-Regular.ttf",
  variable: "--font-instrument-serif",
  display: 'block',
  preload: true,
  fallback: []
});

export const metadata: Metadata = {
  metadataBase: new URL('https://venturedglobal.org'),
  title: {
    default: "VenturEd Global | High School Tech Fellowship & Startup Internships",
    template: "%s | VenturEd Global"
  },
  description: "Join VenturEd's selective fellowship connecting ambitious high school students to hands-on internships at innovative startups. Build real-world tech experience and join our global community of young entrepreneurs.",
  keywords: [
    'VenturEd',
    'VenturEd Global',
    'VenturEd Fellowship',
    'high school internship',
    'high school startup internship',
    'high school fellowship',
    'tech internship for high school students',
    'Silicon Valley internship',
    'startup internship program',
    'tech fellowship program',
    'high school entrepreneurship',
    'student startup program',
    'tech education program',
    'startup experience for students',
    'college application internship'
  ],
  authors: [{ name: "VenturEd Global" }],
  publisher: "VenturEd Global",
  openGraph: {
    title: "VenturEd Global | High School Tech Fellowship & Startup Internships",
    description: "Empowering high school students with real-world tech experience through selective startup internships and mentorship. Join our global community of young entrepreneurs.",
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
    'application-ld+json': JSON.stringify([
      {
        '@context': 'https://schema.org',
        '@type': 'EducationalOrganization',
        '@id': 'https://venturedglobal.org/#organization',
        name: 'VenturEd Global',
        alternateName: ['VenturEd', 'Ventured Global'],
        description: 'VenturEd is a selective fellowship program connecting high school students with hands-on internships at innovative tech startups.',
        url: 'https://venturedglobal.org',
        logo: 'https://venturedglobal.org/ventured.png',
        sameAs: [
          'https://linkedin.com/company/venturedglobal',
          'https://www.instagram.com/venturedglobal/'
        ],
        areaServed: 'Worldwide',
        email: 'contact@venturedglobal.org'
      },
      {
        '@context': 'https://schema.org',
        '@type': 'EducationalProgram',
        '@id': 'https://venturedglobal.org/#fellowship',
        name: 'VenturEd Fellowship Program',
        description: '8-week fellowship program connecting high-potential students with tech startup internships',
        provider: {
          '@type': 'EducationalOrganization',
          '@id': 'https://venturedglobal.org/#organization'
        },
        timeToComplete: 'P8W',
        educationalProgramMode: 'hybrid',
        applicationStartDate: 'YYYY-MM-DD',
        educationalCredentialAwarded: 'Fellowship Certificate',
        occupationalCredentialAwarded: 'Tech Industry Experience',
        programType: 'Internship Program',
        typicalAgeRange: '14-18',
        educationalLevel: 'High School',
        teaches: [
          'Startup Experience',
          'Tech Skills',
          'Professional Development',
          'Entrepreneurship'
        ]
      },
      {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        '@id': 'https://venturedglobal.org/#faq',
        mainEntity: [
          {
            '@type': 'Question',
            name: 'What is the VenturEd Fellowship Program?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'The VenturEd Fellowship is an 8-week program that connects high school students with hands-on internship opportunities at Silicon Valley startups. The program is free and includes mentorship, technical training, and real-world project experience.'
            }
          },
          {
            '@type': 'Question',
            name: 'Who can apply for the VenturEd Fellowship?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'The fellowship is open to high school students aged 14-18 who demonstrate passion for technology, entrepreneurship, and innovation. We particularly encourage applications from underrepresented backgrounds in tech.'
            }
          },
          {
            '@type': 'Question',
            name: 'Is the VenturEd Fellowship free?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Yes, the VenturEd Fellowship is completely free for all accepted students. We believe in making tech opportunities accessible to all talented high school students.'
            }
          }
        ]
      }
    ])
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
    title: "VenturEd Global | High School Tech Fellowship",
    description: "Empowering high school students with real-world tech experience through selective startup internships and mentorship.",
    images: ["/og-image.jpg"],
    creator: "@VenturEdGlobal"
  },
  verification: {
    google: "ufk7uUzJrIJ9rvcvKQHuf1Nh2CQpBWR271lDLMwL-fE",
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
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning className={`${geistSans.variable} ${geistMono.variable} ${instrumentSerif.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  );
}
