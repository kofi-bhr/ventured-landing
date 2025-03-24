/* eslint-disable react/no-unescaped-entities */
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
            
            <div className="w-32 h-32 mx-auto mb-6 relative rounded-full overflow-hidden">
              <Image
                src="/kofi.png"
                alt="Kofi Hair-Ralston, CEO of VenturEd"
                fill
                className="object-cover"
                priority
              />
            </div>
            <h1 className="text-4xl md:text-5xl font-instrument-serif mb-6">
              hey, i'm kofi :)
            </h1>
          </div>
          
          <article className="prose prose-lg dark:prose-invert mx-auto">
            {[
              "hey there,",
              "i'm kofi, and i started ventured because i kept seeing the same thing over and over growing up in baltimore.",
              "i was adopted by white parents and raised in roland park, going to schools with 3D printers and coding clubs. but just a few miles away, kids just as smart as me—probably smarter—had never even heard of python or javascript, let alone had the chance to learn them.",
              "it wasn't a talent gap. it was an opportunity gap.",
              "that's the thing about talent—it's everywhere. in every neighborhood, every demographic, every background. but opportunity? that's concentrated in specific pockets, flowing to the already-privileged, creating this cycle where the same types of people keep building the same types of solutions for the same types of problems.",
              "ventured exists to break that cycle.",
              "we don't 'discover diamonds in the rough', because that framing gets it backward. talent isn't rare. opportunity is.",
              "when we connect young people from cherry hill or sandtown-winchester with internships at tech companies, we're not doing charity. we're unlocking innovation that wouldn't happen otherwise. we're creating pathways for new ideas to emerge from new perspectives.",
              "because here's what i know for sure: the kid who's never seen the inside of a tech company might be the only one who can solve a problem the tech industry doesn't even know it has.",
              "this work isn't just about diversity for diversity's sake. it's about expanding who gets to innovate, what problems get solved, and ultimately, who benefits from technology and entrepreneurship.",
              "if you're reading this, you're part of this journey now. whether you're a student looking for opportunity, a company looking for talent, or a supporter looking to make an impact—welcome.",
              "let's build a world where talent and opportunity are both evenly distributed.",
              "—kofi"
            ].map((paragraph, index) => (
              <p key={index} className="mb-6">
                {paragraph}
              </p>
            ))}
          </article>
        </div>
      </main>
    </>
  );
}