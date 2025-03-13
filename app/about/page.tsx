import { Metadata } from "next"
import Image from "next/image"

export const metadata: Metadata = {
  title: "About VenturEd | Our Mission to Transform High School Tech Education",
  description: "Learn about VenturEd's mission to connect high school students with real-world tech experience through our fellowship program. Founded by Kofi Hair-Ralston with a vision to make tech opportunities accessible to all.",
  openGraph: {
    title: "About VenturEd | Our Story and Mission",
    description: "Discover how VenturEd is revolutionizing high school tech education through real-world startup internships and mentorship.",
    images: [{ url: "/kofi.png", width: 800, height: 600 }]
  }
}

export default function AboutPage() {
  return (
    <>
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4 max-w-3xl">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-instrument-serif mb-6">
              hey, i'm kofi :)
            </h1>
            <div className="w-32 h-32 mx-auto mb-6 relative rounded-full overflow-hidden">
              <Image
                src="/kofi.png"
                alt="Kofi Hair-Ralston, CEO of VenturEd"
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>
          
          <article className="prose prose-lg dark:prose-invert mx-auto">
            <p>
              in high school, i was always the kid who tinkered with code, built random projects, and dreamed about working in tech. but breaking into the industry felt like this massive, impossible challenge. especially since i didn't have any "real" experience or connections.
            </p>

            <p>
              that's exactly why i started ventured. we're not just another internship program - we're building the bridge i wish i had back then. a way for ambitious high school students to get hands-on experience at actual startups, work on real projects that matter, and start building their future in tech.
            </p>

            <p>
              what makes us different? we're 100% focused on high school students. no college requirement. no expensive program fees. just pure opportunity for young people who are passionate about tech and ready to prove themselves. we partner with innovative startups who need fresh perspectives and are willing to give talented students a real shot.
            </p>

            <p>
              our first cohort absolutely crushed it. we're talking about students who:
            </p>

            <ul>
              <li>built and shipped features used by thousands of users</li>
              <li>led marketing campaigns that drove real growth</li>
              <li>contributed to core product development</li>
              <li>and most importantly, proved that age is just a number when it comes to making an impact</li>
            </ul>

            <p>
              we're especially proud that our fellowship is helping diversify the tech pipeline early. our first cohort outperformed average u.s. tech workforce diversity rates across the board:
            </p>

            <ul>
              <li>female representation: +27.4%</li>
              <li>asian representation: +53.3%</li>
              <li>black representation: +4.5%</li>
            </ul>

            <p>
              but this is just the beginning. we're building a community where high school students can start their tech journey early, learn from experienced mentors, and connect with other ambitious young people who share their passion.
            </p>

            <p>
              whether you're a student dreaming of a future in tech, a startup looking to work with amazing young talent, or just someone who believes in our mission - i'd love to hear from you. shoot me an email at kofi@venturedglobal.org or connect with me on linkedin.
            </p>

            <p>
              let's build something amazing together,<br />
              kofi
            </p>
          </article>
        </div>
      </main>
    </>
  )
} 