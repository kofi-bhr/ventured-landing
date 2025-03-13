import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'VenturEd - Free High School Startup Internships | Silicon Valley Experience',
  description: 'Join VenturEd\'s prestigious 8-week fellowship program connecting talented high school students with hands-on internships at top Silicon Valley startups. Free program, real-world experience, path to top colleges.',
  keywords: 'high school internship, startup internship, Silicon Valley internship, tech internship, free internship program, college admissions program',
  openGraph: {
    title: 'VenturEd Fellowship - Free High School Startup Internships',
    description: 'Get real startup experience through our free 8-week fellowship program. Work with top Silicon Valley companies, build your college application, and launch your tech career.',
    url: 'https://venturedglobal.org',
    siteName: 'VenturEd Fellowship',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'VenturEd Fellowship Program'
      }
    ],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'VenturEd Fellowship - Free High School Startup Internships',
    description: 'Get real startup experience through our free 8-week fellowship program. Work with top Silicon Valley companies, build your college application, and launch your tech career.',
    images: ['/og-image.png'],
  },
  alternates: {
    canonical: 'https://venturedglobal.org'
  }
} 