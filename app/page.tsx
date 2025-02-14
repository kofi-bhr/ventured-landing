'use client'

import { useEffect, useRef, useState } from 'react'
import Image from "next/image"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { motion, useScroll, AnimatePresence } from "framer-motion"

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
      <h3 className="font-serif text-lg leading-none">{name}</h3>
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

export default function Component() {
  const [isScrolled, setIsScrolled] = useState(false)
  const { scrollY } = useScroll()

  const teamMembers = [
    { name: "Jane Doe", position: "CEO & Founder", image: "/placeholder.svg?height=192&width=192" },
    { name: "John Smith", position: "CTO", image: "/placeholder.svg?height=192&width=192" },
    { name: "Alice Johnson", position: "Head of Partnerships", image: "/placeholder.svg?height=192&width=192" },
    { name: "Bob Williams", position: "Lead Developer", image: "/placeholder.svg?height=192&width=192" },
    { name: "Emma Brown", position: "Marketing Director", image: "/placeholder.svg?height=192&width=192" },
    { name: "Michael Davis", position: "Program Manager", image: "/placeholder.svg?height=192&width=192" },
  ]

  const partnershipMailto = "mailto:partnerships@venturedglobal.org?cc=kofi@venturedglobal.org, smyan@venturedglobal.org, rashi@venturedglobal.org&subject=%5BYOUR%20COMPANY%20NAME%5D%20X%20VenturEd&body=Hi%20VenturEd%20Team%2C%0A%0AI'm%20%5BYOUR%20NAME%5D%2C%20%5BTITLE%5D%20at%20%5BCOMPANY%20NAME%5D.%20%0A%0AAfter%20looking%20over%20your%20fellowship%20program%2C%20we%20are%20excited%20about%20the%20potential%20collaboration.%0A%0AWe're%20currently%20looking%20to%20%5Bspecific%20challenge%20you're%20facing%20-%20e.g.%2C%20start%20a%20short-form%20content%20strategy%5D%20and%20need%20your%20help%20for%20%5BSkill%20gap%20or%20support%20needed%20-%20e.g.%2C%20a%20TikTok%20marketing%20channel%5D%20to%20%5BStrategic%20growth%20area%20-%20e.g.%2C%20expand%20our%20product's%20user%20acquisition%20channels%5D.%0A%0AWe%20are%20especially%20interested%20in%20Fellows%20who%20can%20%5Btechnical%20skill%20-%20e.g.%2C%20analyze%20data%20with%20Python%5D%2C%20and%20are%20%5BSoft%20skill%20-%20e.g.%2C%20fast%20decision-makers%5D.%20They%20should%20%5BDomain%20expertise%20-%20e.g.%2C%20understand%20startup%20growth%20mechanics%5D.%0A%0AA%20bit%20about%20our%20company%3A%0A%0AWe%20%5BBrief%20company%20description%5D.%20Specifically%2C%20we%20are%20unique%20because%20%5BUnique%20value%20proposition%5D.%20Currently%2C%20we%20are%20at%20%5BCurrent%20stage%2Ffunding%5D.%0A%0AWould%20love%20to%20schedule%20a%2015-minute%20call%20to%20discuss%20potential%20partnership%20details.%0A%0AThanks%2C%20%0A%5BYOUR%20NAME%5D%20%5BCONTACT%20INFORMATION%5D"
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
    <div className="min-h-screen bg-background text-foreground antialiased overflow-x-hidden">
      <main className="flex-1">
        <section className="min-h-screen flex items-center justify-center relative overflow-hidden px-4">
          <MatrixRain />
          <div className="container flex flex-col items-center text-center space-y-8 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl tracking-tighter font-serif">
                <TextStream text="VenturEd" />
              </h1>
              <p className="mt-4 mx-auto max-w-[700px] text-muted-foreground md:text-xl/relaxed font-mono">
                <TextStream text="Talent is evenly distributed, but opportunity is not" />
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
        
        <section className="py-24 sm:py-32">
          <div className="container mx-auto px-4 md:px-6">
            <div className="flex justify-center">
              <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 max-w-6xl w-full">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                  className="rounded-lg border bg-card p-8 shadow-sm flex flex-col items-center justify-center text-center"
                >
                  <div className="space-y-2">
                    <h3 className="font-mono text-2xl">
                      <CountUp end={80} />%
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Minority representation in our fellowship program
                    </p>
                  </div>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="rounded-lg border bg-card p-8 shadow-sm flex flex-col items-center justify-center text-center"
                >
                  <div className="space-y-2">
                    <h3 className="font-mono text-2xl">
                      <CountUp end={2} />x
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      More women in tech compared to industry average
                    </p>
                  </div>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                  className="rounded-lg border bg-card p-8 shadow-sm flex flex-col items-center justify-center text-center"
                >
                  <div className="space-y-2">
                    <h3 className="font-mono text-2xl">
                      <CountUp end={100} />%
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Success rate in placement
                    </p>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </section>

        <section id="fellowship" className="py-24 sm:py-32 bg-muted/50">
          <div className="container px-4 md:px-6 mx-auto">
            <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
              <div className="space-y-2 max-w-3xl mx-auto">
                <h2 className="font-serif text-3xl sm:text-4xl">About the Fellowship</h2>
                <p className="text-muted-foreground">
                Our 8-week fellowship program connects high-potential high school students from underrepresented backgrounds with hands-on internship opportunities at leading tech startups. We&apos;re building pathways to careers in technology.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-2 lg:gap-12">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="space-y-4"
              >
                <div className="grid gap-6">
                  <div className="grid gap-1">
                    <h3 className="text-xl font-medium">1/ Application</h3>
                    <p className="text-sm text-muted-foreground">
                      Submit your application and showcase your potential. We're looking for anyone who:
                      *
                    </p>
                  </div>
                  <div className="grid gap-1">
                    <h3 className="text-xl font-medium">2/ Training</h3>
                    <p className="text-sm text-muted-foreground">
                      Receive mentorship and technical training
                    </p>
                  </div>
                  <div className="grid gap-1">
                    <h3 className="text-xl font-medium">3/ Placement</h3>
                    <p className="text-sm text-muted-foreground">
                      Get matched with top tech companies
                    </p>
                  </div>
                </div>
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
              <h2 className="font-serif text-3xl sm:text-4xl">Our Team</h2>
              <p className="mx-auto max-w-[700px] text-muted-foreground">
                Meet the passionate individuals driving our mission forward
              </p>
            </div>
            <InfiniteScroll>
              {teamMembers.map((member, index) => (
                <TeamMember key={index} {...member} />
              ))}
            </InfiniteScroll>
          </div>
          <style jsx global>{`
            .no-scrollbar::-webkit-scrollbar {
              display: none;
            }
            .no-scrollbar {
              -ms-overflow-style: none;
              scrollbar-width: none;
            }
          `}</style>
        </section>

        <section id="partners" className="py-16 sm:py-24">
          <div className="container mx-auto px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="font-serif text-3xl sm:text-4xl">Our Network</h2>
                <p className="mx-auto max-w-[700px] text-muted-foreground">
                  Leading organizations that support our mission
                </p>

              </div>
            </div>
            <div className="mx-auto grid max-w-6xl grid-cols-2 gap-8 py-12 sm:grid-cols-3 md:grid-cols-4">
              {[...Array(8)].map((_, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="flex items-center justify-center"
                >
                  <div className="size-20 rounded-lg bg-muted" />
                </motion.div>
              ))}
            </div>
          </div>
        </section>
        <section className="py-16 sm:py-24">
          <div className="container mx-auto px-4 md:px-6 flex justify-center">
            <Link
              href="mailto:contact@venturedglobal.org"
              className="font-serif text-2xl sm:text-3xl md:text-4xl underline underline-offset-4 hover:text-primary transition-colors duration-200 text-center w-full max-w-3xl"
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
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Instrument+Serif&display=swap');
        
        .font-serif {
          font-family: 'Instrument Serif', serif;
        }
        
        .bg-grid-white {
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 100 100'%3E%3Cg fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Cpath opacity='.5' d='M96 95h4v1h-4v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h4v1h-4v9h4v1h-4v9h4v1h-4v9h4v1h-4v9h4v1h-4v9h4v1h-4v9h4v1h-4v9h4v1h-4v9zm-1 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-9-10h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm9-10v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-9-10h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm9-10v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-9-10h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9z'/%3E%3Cpath d='M6 5V0H5v5H0v1h5v94h1V6h94V5H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
        }
      `}</style>
    </div>
  )
}