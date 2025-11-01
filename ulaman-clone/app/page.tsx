// app/page.tsx
import Hero from "@/components/sections/Hero"
import About from "@/components/sections/About"
import Rooms from "@/components/sections/Rooms"
import Experiences from "@/components/sections/Experiences"
import Gallery from "@/components/sections/Gallery"
import Testimonials from "@/components/sections/Testimonials"
import Footer from "@/components/sections/Footer"
import LocationMap from '@/components/sections/Navigation'
import Discover from '@/components/sections/Discover'
import Wellness from '@/components/sections/Wellness'
import Explore from '@/components/sections/Explore'
import CTA from "@/components/sections/CallToAction"

export default function Home() {
  return (
    <main className="min-h-screen bg-[#EFEBE2] overflow-x-hidden">
      <Hero />
      <About />
      <Experiences />
      <Rooms />
      <Wellness />
      <Explore />
      <Discover />
      <Testimonials showContinueReading={true} />
      <Gallery />
      <CTA
        title="Reconnect With Yourself In<br/>Luxurious Comfort."
        buttonText="BOOK YOUR STAY"
        buttonHref="#book"
        optionalSubtitle="@ulamanbali"
      />
      <LocationMap />
      <Footer />
    </main>
  )
}
