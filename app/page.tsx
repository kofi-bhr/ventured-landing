/* eslint-disable @typescript-eslint/no-unused-vars */
'use client'

import { useEffect, useRef, useState } from 'react'
import Image from "next/image"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { motion, useScroll, AnimatePresence } from "framer-motion"
import Head from 'next/head'

const TeamMember = ({ name, position, image }: { name: string; position: string; image: string }) => (
  <div className="flex-shrink-0 w-48 mx-4 text-center">
    <div className="mb-4">
      <Image
        src={image}
        alt={`Image of ${name}`}
        width={192}
        height={192}
        className="w-full h-48 object-cover rounded-lg"
      />
    </div>
    <div className="space-y-1">
      <h3 className="font-instrument-serif text-lg leading-none">{name}</h3>
      <p className="text-sm text-muted-foreground">{position}</p>
    </div>
  </div>
)

const InfiniteScroll = ({ children }: { children: React.ReactNode }) => {
  const scrollRef = useRef<HTMLDivElement>(null)
  const [isMouseOver, setIsMouseOver] = useState(false)

  useEffect(() => {
    const scrollContainer = scrollRef.current
    if (!scrollContainer) return

    let animationId: number

    const scroll = () => {
      if (isMouseOver) return
      scrollContainer.scrollLeft += 1
      if (scrollContainer.scrollLeft >= scrollContainer.scrollWidth / 2) {
        scrollContainer.scrollLeft = 0
      }
      animationId = requestAnimationFrame(scroll)
    }

    animationId = requestAnimationFrame(scroll)

    return () => cancelAnimationFrame(animationId)
  }, [isMouseOver])

  const handleScroll = () => {
    const scrollContainer = scrollRef.current
    if (!scrollContainer) return

    if (scrollContainer.scrollLeft + scrollContainer.clientWidth >= scrollContainer.scrollWidth) {
      scrollContainer.scrollLeft = 0
    } else if (scrollContainer.scrollLeft <= 0) {
      scrollContainer.scrollLeft = scrollContainer.scrollWidth / 2
    }
  }

  return (
    <div className="relative">
      <div
        ref={scrollRef}
        className="flex overflow-x-scroll no-scrollbar"
        style={{
          maskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)',
          WebkitMaskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)',
          msOverflowStyle: 'none',
          scrollbarWidth: 'none',
        }}
        onMouseEnter={() => setIsMouseOver(true)}
        onMouseLeave={() => setIsMouseOver(false)}
        onScroll={handleScroll}
      >
        {children}
        {children}
      </div>
    </div>
  )
}

const MatrixRain = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    const columns = canvas.width / 20
    const drops: number[] = []

    for (let i = 0; i < columns; i++) {
      drops[i] = 1
    }

    const draw = () => {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.05)'
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      ctx.fillStyle = '#4646E0'
      ctx.font = '15px monospace'

      for (let i = 0; i < drops.length; i++) {
        const text = String.fromCharCode(Math.random() * 128)
        ctx.fillText(text, i * 20, drops[i] * 20)

        if (drops[i] * 20 > canvas.height && Math.random() > 0.975) {
          drops[i] = 0
        }

        drops[i]++
      }
    }

    const interval = setInterval(draw, 33)

    return () => clearInterval(interval)
  }, [])

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full opacity-30" />
}

const TextStream = ({ text }: { text: string }) => {
  const [displayText, setDisplayText] = useState('')

  useEffect(() => {
    let currentIndex = 0
    const interval = setInterval(() => {
      if (currentIndex <= text.length) {
        setDisplayText(text.slice(0, currentIndex))
        currentIndex++
      } else {
        clearInterval(interval)
      }
    }, 20) // Faster streaming effect

    return () => clearInterval(interval)
  }, [text])

  return <>{displayText}</>
}

const CountUp = ({ end, duration = 2000 }: { end: number; duration?: number }) => {
  const [count, setCount] = useState(0)

  useEffect(() => {
    let startTime: number
    let animationFrame: number

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp
      const progress = timestamp - startTime
      const percentage = Math.min(progress / duration, 1)
      setCount(Math.floor(end * percentage))

      if (progress < duration) {
        animationFrame = requestAnimationFrame(animate)
      }
    }

    animationFrame = requestAnimationFrame(animate)

    return () => cancelAnimationFrame(animationFrame)
  }, [end, duration])

  return <>{count}</>
}

const Marquee = ({ items, speed, direction }: { items: string[]; speed: number; direction: string }) => {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    let animationId: number

    const scroll = () => {
      container.scrollLeft += 1
      if (container.scrollLeft >= container.scrollWidth) {
        container.scrollLeft = 0
      }
      animationId = requestAnimationFrame(scroll)
    }

    animationId = requestAnimationFrame(scroll)

    return () => cancelAnimationFrame(animationId)
  }, [])

  return (
    <div className="overflow-hidden">
      <div
        ref={containerRef}
        className="whitespace-nowrap"
        style={{
          animation: `marquee ${speed}s linear infinite`,
        }}
      >
        {items.map((item, index) => (
          <span key={index} className="px-4">
            {item}
          </span>
        ))}
        {items.map((item, index) => (
          <span key={index + items.length} className="px-4">
            {item}
          </span>
        ))}
      </div>
    </div>
  )
}

const partners = [
  {
    name: "Y Combinator",
    image: "/logos/yc.png",
    link: "https://www.ycombinator.com",
    description: "The world's leading startup accelerator supporting our partners"
  },
  {
    name: "Hack Club",
    image: "/logos/hcb2.png",
    link: "https://www.hackclub.com",
    description: "Supporting VenturEd's mission to make tech education accessible"
  },
  {
    name: "HCB",
    image: "/logos/hcb1.png",
    link: "https://www.hackclub.com",
    description: "Providing fiscal support for our mission"
  },
  {
    name: "Youth as Resources",
    image: "/logos/YAR.png",
    link: "https://www.youthasresources.org",
    description: "Funding our mission to make tech education accessible"
  },
  {
    name: "Jammy Chat",
    image: "/logos/jammy.svg",
    link: "https://www.jammy.chat",
    description: "Startup Partner"
  },
  {
    name: "Crackd",
    image: "/logos/crackd.png",
    link: "https://www.crackd.it/",
    description: "Startup Partner"
  }
];

export default function Component() {
  const [isScrolled, setIsScrolled] = useState(false)
  const { scrollY } = useScroll()

  const teamMembers = [
    { name: "Kofi Hair-Ralston", position: "CEO & Founder", image: "/people/kofib.png" },
    { name: "Smyan Shanbhag", position: "CTO", image: "/people/smyan.jpeg" },
    { name: "Rashi Mhapsekar", position: "CMO", image: "/people/rashi.jpeg" },
  ]

  const partnershipMailto = "mailto:partnerships@venturedglobal.org?cc=kofi@venturedglobal.org, smyan@venturedglobal.org, rashi@venturedglobal.org&subject=%5BYOUR%20COMPANY%20NAME%5D%20X%20VenturEd&body=Hi%20VenturEd%20Team%2C%0A%0AI'm%20%5BYOUR%20NAME%5D%2C%20%5BTITLE%5D%20at%20%5BCOMPANY%20NAME%5D.%20%0A%0AAfter%20looking%20over%20your%20fellowship%20program%2C%20we%20are%20excited%20about%20the%20potential%20collaboration.%0A%0AWe're%20currently%20looking%20to%20%5Bspecific%20challenge%20you're%20facing%20-%20e.g.%2C%20start%20a%20short-form%20content%20strategy%5D%20and%20need%20your%20help%20for%20%5BSkill%20gap%20or%20support%20needed%20-%20e.g.%2C%20a%20TikTok%20marketing%20channel%5D%20to%20%5BStrategic%20growth%20area%20-%20e.g.%2C%20expand%20our%20product's%20user%20acquisition%20channels%5D.%0A%0AWe%20are%20especially%20interested%20in%20Fellows%20who%20can%20%5Btechnical%20skill%20-%20e.g.%2C%20analyze%20data%20with%20Python%5D%2C%20and%20are%20%5BSoft%20skill%20-%20e.g.%2C%20fast%20decision-makers%5D.%20They%20should%20%5BDomain%20expertise%20-%20e.g.%2C%20understand%20startup%20growth%20mechanics%5D.%0A%0AA%20bit%20about%20our%20company%3A%0A%0AWe%20%5BBrief%20company%20description%5D.%20Specifically%2C%20we%20are%20unique%20because%20%5BUnique%20value%20proposition%5D.%20Currently%2C%20we%20are%20at%20%5BCurrent%20stage%2Ffunding%5D.%0A%0AWould%20love%20to%20schedule%20a%2015-minute%20call%20to%20discuss%20potential%20partnership%20details.%0A%0AThanks%2C%20%0A%5BYOUR%20NAME%5D%20%5BCONTACT%20INFORMATION%5D"

  const values = [
    "Opportunity for All",
    "Real-World Impact",
    "Innovation First",
    "Community Driven",
    "Merit Based",
    "Tech Forward",
    "Student Focused",
    "Growth Mindset"
  ];

  const stats = [
    {
      value: 27.4,
      label: "More female representation than industry average",
      suffix: "%"
    },
    {
      value: 53.3,
      label: "More Asian representation than industry average",
      suffix: "%"
    },
    {
      value: 4.5,
      label: "More Black representation than industry average",
      suffix: "%"
    }
  ];

  useEffect(() => {
    const unsubscribe = scrollY.onChange(latest => {
      setIsScrolled(latest > 100)
    })
    return () => unsubscribe()
  }, [scrollY])

  useEffect(() => {
    document.documentElement.classList.add('dark')
  }, [])

  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (event.key.toLowerCase() === 'f') {
        window.open('https://apply.venturedglobal.org', '_blank')
      } else if (event.key.toLowerCase() === 'p') {
        window.location.href = partnershipMailto
      }
    }

    document.addEventListener('keydown', handleKeyPress)
    return () => document.removeEventListener('keydown', handleKeyPress)
  }, [partnershipMailto])

  return (
    <>
      <Head>
        <title>VenturEd - Free High School Startup Internships | Silicon Valley Experience</title>
        <meta name="description" content="Join VenturEd's prestigious 8-week fellowship program connecting talented high school students with hands-on internships at top Silicon Valley startups. Free program, real-world experience, path to top colleges." />
        <meta name="keywords" content="high school internship, startup internship, Silicon Valley internship, tech internship, free internship program, college admissions program" />
        <link rel="canonical" href="https://venturedglobal.org" />
      </Head>
      <div className="min-h-screen bg-background text-foreground antialiased overflow-x-hidden">
        <main className="flex-1">
          <section className="min-h-screen flex items-center justify-center relative overflow-hidden px-4">
            <MatrixRain />
            <div className="container flex flex-col items-center text-center space-y-8 relative z-10">
              <Link
                href="/about"
                className="group inline-flex items-center gap-2 text-sm font-mono text-muted-foreground/60 hover:text-[#4646E0] transition-all duration-200 mb-8"
              >
                <span className="bg-muted/50 px-3 py-1.5 rounded-full group-hover:bg-[#4646E0]/5 transition-colors duration-200">
                  Letter from our Founder
                </span>
                <span className="font-mono transition-transform duration-200 group-hover:translate-x-1">
                  →
                </span>
              </Link>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="space-y-4"
              >
                <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl tracking-tighter font-instrument-serif">
                  VenturEd Fellowship
                </h1>
                <p className="mt-4 mx-auto max-w-[700px] text-muted-foreground md:text-xl/relaxed font-mono">
                  Free Silicon Valley Startup Internships for High School Students
                </p>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="flex flex-col sm:flex-row gap-4"
              >
                <Button
                  variant="outline"
                  size="lg"
                  className="group hover:shadow-[0_4px_0_0_#4646E0] hover:-translate-y-1 transition-all duration-200"
                  onClick={() => window.open('https://apply.venturedglobal.org', '_blank')}
                >
                  Become a Fellow
                  <kbd className="ml-2 inline-flex h-5 items-center rounded bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground group-hover:bg-[#4646E0] group-hover:text-white transition-colors duration-200">
                    F
                  </kbd>
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  className="group hover:shadow-[0_4px_0_0_#4646E0] hover:-translate-y-1 transition-all duration-200"
                  onClick={() => window.location.href = partnershipMailto}
                >
                  Become a Partner
                  <kbd className="ml-2 inline-flex h-5 items-center rounded bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground group-hover:bg-[#4646E0] group-hover:text-white transition-colors duration-200">
                    P
                  </kbd>
                </Button>
              </motion.div>
            </div>
          </section>
          
          <section className="py-12 overflow-hidden border-y border-[#4646E0]/10 bg-[#4646E0]/5 backdrop-blur-sm">
            <div className="container max-w-4xl mx-auto">
              <Marquee items={values} speed={30} direction="right" />
            </div>
          </section>

          <section className="py-24 sm:py-32">
            <div className="container mx-auto px-4 md:px-6">
              <div className="flex flex-col items-center text-center">
                <div className="max-w-3xl mx-auto space-y-8">
                  <h2 className="text-3xl sm:text-4xl font-instrument-serif mb-4">Diversity in Tech</h2>
                  <p className="text-lg text-muted-foreground leading-relaxed">
                    Outperformed average U.S. tech workforce diversity rates in Fellowship:
                    <span className="inline-flex items-center gap-x-3 mt-4">
                      <span className="inline-flex items-center gap-x-2">
                        Female <span className="text-[#4646E0] font-mono">+27.4%</span>
                      </span>
                      <span className="text-muted-foreground/30">•</span>
                      <span className="inline-flex items-center gap-x-2">
                        Asian <span className="text-[#4646E0] font-mono">+53.3%</span>
                      </span>
                      <span className="text-muted-foreground/30">•</span>
                      <span className="inline-flex items-center gap-x-2">
                        Black <span className="text-[#4646E0] font-mono">+4.5%</span>
                      </span>
                    </span>
                  </p>
                </div>
              </div>
            </div>
          </section>

          <section id="fellowship" className="py-24 sm:py-32 relative overflow-hidden">
            <div className="absolute inset-0 bg-[url('/grain.png')] opacity-30 mix-blend-overlay" />
            <div className="absolute inset-0 bg-gradient-to-b from-[#4646E0]/5 to-transparent" />
            <div className="container px-4 md:px-6 mx-auto relative">
              <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
                <div className="space-y-2 max-w-3xl mx-auto">
                  <h2 className="text-3xl sm:text-4xl font-instrument-serif">About the Fellowship</h2>
                  <p className="text-muted-foreground">
                    Our prestigious 8-week fellowship program connects high-potential high school students with hands-on internship opportunities at leading Silicon Valley startups. Perfect for college applications and future tech careers.
                  </p>
                </div>
              </div>
              <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-2 lg:gap-12">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                  className="space-y-8"
                >
                  {[
                    {
                      title: "1/ Application",
                      description: "Submit your application and showcase your potential. We're looking for passionate, driven students ready to make an impact.",
                      cta: {
                        text: "Apply Now",
                        href: "https://apply.venturedglobal.org"
                      }
                    },
                    {
                      title: "2/ Training",
                      description: "Receive personalized mentorship and technical training from industry experts to prepare for your internship.",
                      cta: {
                        text: "Learn More",
                        href: "#"
                      }
                    },
                    {
                      title: "3/ Placement",
                      description: "Get matched with top tech companies and work on real projects that matter.",
                      cta: {
                        text: "View Partners",
                        href: "#partners"
                      }
                    }
                  ].map((step, index) => (
                    <div key={index} className="group relative">
                      <div className="absolute -inset-y-4 -inset-x-4 z-0 scale-95 bg-[#4646E0]/5 opacity-0 transition group-hover:scale-100 group-hover:opacity-100 sm:-inset-x-6 sm:rounded-2xl" />
                      <div className="relative grid gap-4">
                        <h3 className="text-xl font-instrument-serif">{step.title}</h3>
                        <p className="text-muted-foreground">{step.description}</p>
                        <div>
                          <Button
                            variant="outline"
                            className="group/btn relative overflow-hidden rounded-md hover:shadow-[0_1px_0_0_#4646E0] transition-all duration-200"
                            onClick={() => window.location.href = step.cta.href}
                          >
                            {step.cta.text}
                            <span className="absolute inset-x-0 bottom-0 h-px w-full bg-gradient-to-r from-transparent via-[#4646E0] to-transparent" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                  className="relative aspect-square"
                >
                  <div className="absolute inset-0 bg-grid-white/[0.02] [mask-image:radial-gradient(white,transparent_85%)]" />
                  <div className="absolute inset-0 rounded-lg border bg-muted/50 shadow-sm" />
                </motion.div>
              </div>
            </div>
          </section>

          <section id="team" className="py-24 sm:py-32">
            <div className="container px-4 md:px-6">
              <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
                <h2 className="text-3xl sm:text-4xl font-instrument-serif">Our Team</h2>
                <p className="mx-auto max-w-[700px] text-muted-foreground">
                  Meet the passionate individuals driving our mission forward
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {teamMembers.map((member, index) => (
                  <div key={index} className="flex flex-col items-center text-center">
                    <div className="mb-4">
                      <Image
                        src={member.image}
                        alt={`Image of ${member.name}`}
                        width={192}
                        height={192}
                        className="w-48 h-48 object-cover rounded-lg"
                      />
                    </div>
                    <div className="space-y-1">
                      <h3 className="text-lg leading-none font-instrument-serif">{member.name}</h3>
                      <p className="text-sm text-muted-foreground">{member.position}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section id="partners" className="py-16 sm:py-24">
            <div className="container mx-auto px-4 md:px-6">
              <div className="flex flex-col items-center justify-center space-y-4 text-center">
                <div className="space-y-2">
                  <h2 className="text-3xl sm:text-4xl font-instrument-serif">Our Network</h2>
                  <p className="mx-auto max-w-[700px] text-muted-foreground">
                    Leading organizations that support our mission
                  </p>
                </div>
              </div>
              <div className="mx-auto grid max-w-6xl grid-cols-2 gap-8 py-12 sm:grid-cols-3 md:grid-cols-4">
                {partners.map((partner, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: i * 0.1 }}
                    className="group relative flex flex-col items-center gap-4"
                  >
                    <Link
                      href={partner.link}
                      className="relative size-24 rounded-lg bg-muted overflow-hidden transition-all duration-200 hover:scale-105"
                    >
                      <Image
                        src={partner.image}
                        alt={partner.name}
                        fill
                        className="object-contain p-4"
                      />
                    </Link>
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 text-center">
                      <h3 className="font-instrument-serif text-sm">{partner.name}</h3>
                      <p className="text-xs text-muted-foreground">{partner.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>
          <section className="py-16 sm:py-24 relative overflow-hidden">
            <div className="absolute inset-0 bg-[url('/grain.png')] opacity-30 mix-blend-overlay" />
            <div className="container mx-auto px-4 md:px-6 flex flex-col items-center justify-center space-y-8">
              <h2 className="text-3xl sm:text-4xl text-center font-instrument-serif">Ready to Join Us?</h2>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  variant="outline"
                  size="lg"
                  className="group relative overflow-hidden rounded-md hover:shadow-[0_1px_0_0_#4646E0] transition-all duration-200"
                  onClick={() => window.open('https://apply.venturedglobal.org', '_blank')}
                >
                  Apply as a Fellow
                  <span className="absolute inset-x-0 bottom-0 h-px w-full bg-gradient-to-r from-transparent via-[#4646E0] to-transparent" />
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  className="group relative overflow-hidden rounded-md hover:shadow-[0_1px_0_0_#4646E0] transition-all duration-200"
                  onClick={() => window.location.href = partnershipMailto}
                >
                  Partner with Us
                  <span className="absolute inset-x-0 bottom-0 h-px w-full bg-gradient-to-r from-transparent via-[#4646E0] to-transparent" />
                </Button>
              </div>
              <Link
                href="mailto:contact@venturedglobal.org"
                className="font-serif text-xl sm:text-2xl underline underline-offset-4 hover:text-[#4646E0] transition-colors duration-200"
              >
                Contact Us
              </Link>
            </div>
          </section>
        </main>

        <footer className="border-t py-6 md:py-12">
          <div className="container mx-auto flex flex-col items-center justify-between gap-4 md:h-24">
            <div className="flex flex-col items-center gap-4 px-8">
              <Image
                src="/ventured.png"
                alt="VenturEd Logo"
                width={24}
                height={24}
                className="rounded"
              />
              <p className="text-center text-sm leading-loose text-muted-foreground">
                Built by VenturEd. :)
              </p>
            </div>
          </div>
        </footer>
        <AnimatePresence>
          {isScrolled && (
            <motion.div
              initial={{ y: 100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 100, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed bottom-4 w-full left-0 flex justify-center z-50"
            >
              <div className="flex gap-4">
                <Button
                  variant="outline"
                  size="sm"
                  className="group hover:shadow-[0_4px_0_0_#4646E0] hover:-translate-y-1 transition-all duration-200"
                  onClick={() => window.open('https://apply.venturedglobal.org', '_blank')}
                >
                  Become a Fellow
                  <kbd className="ml-2 inline-flex h-5 items-center rounded bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground group-hover:bg-[#4646E0] group-hover:text-white transition-colors duration-200">
                    F
                  </kbd>
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="group hover:shadow-[0_4px_0_0_#4646E0] hover:-translate-y-1 transition-all duration-200"
                  onClick={() => window.location.href = partnershipMailto}
                >
                  Become a Partner
                  <kbd className="ml-2 inline-flex h-5 items-center rounded bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground group-hover:bg-[#4646E0] group-hover:text-white transition-colors duration-200">
                    P
                  </kbd>
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  )
}
