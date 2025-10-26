// components/sections/Wellness.tsx
'use client'
import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import Image from 'next/image'

const Wellness = () => {
  const containerRef = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  })

  // Transform values untuk animasi
  const leftX = useTransform(scrollYProgress, [0.1, 0.3], [0, -370])
  const rightX = useTransform(scrollYProgress, [0.1, 0.3], [0, 370])
  const leftRotate = useTransform(scrollYProgress, [0.1, 0.7], [0, -28])
  const rightRotate = useTransform(scrollYProgress, [0.1, 0.7], [0, 28])
  const textOpacity = useTransform(scrollYProgress, [0.2, 0.6], [0, 20])
  const textScale = useTransform(scrollYProgress, [0.2, 0.6], [0.9, 1])

  return (
    <section
      ref={containerRef}
      className="relative min-h-[100vh] bg-[#e8e1d8] overflow-hidden"
    >
      {/* Sticky Container */}
      <div className="sticky top-0 h-screen flex items-center justify-center">

        {/* Container untuk kedua gambar dan teks */}
        <div className="relative w-full h-full max-w-7xl mx-auto px-4 flex items-center justify-center">

          {/* Gambar Kiri - Woman with coconut (Top Layer) */}
          <motion.div
            className="absolute w-[150px] h-[250px] sm:w-[170px] sm:h-[270px] md:w-[250px] md:h-[350px] lg:w-[280px] lg:h-[380px] z-20"
            style={{
              x: leftX,
              rotate: leftRotate,
              left: '50%',
              top: '50%',
              translateX: '-52%', // Hampir di tengah, sedikit ke kanan
              translateY: '-49%'  // Hampir di tengah, sedikit ke atas
            }}
          >
            <div className="relative w-full h-full shadow-2xl rounded-lg overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=600&h=800&fit=crop"
                alt="Wellness experience"
                fill
                className="object-cover"
                priority
              />
            </div>
          </motion.div>

          {/* Gambar Kanan - Woman with towel (Bottom Layer) */}
          <motion.div
            className="absolute w-[150px] h-[250px] sm:w-[170px] sm:h-[270px] md:w-[250px] md:h-[350px] lg:w-[280px] lg:h-[380px] z-10"
            style={{
              x: rightX,
              rotate: rightRotate,
              left: '50%',
              top: '50%',
              translateX: '-52%', // Hampir di tengah, sedikit ke kiri
              translateY: '-49%'  // Hampir di tengah, sedikit ke bawah
            }}
          >
            <div className="relative w-full h-full shadow-2xl rounded-lg overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=600&h=800&fit=crop"
                alt="Spa treatment"
                fill
                className="object-cover"
                priority
              />
            </div>
          </motion.div>

          {/* Teks di tengah */}
          <motion.div
            className="relative z-30 max-w-lg mx-auto px-6 text-center"
            style={{
              opacity: textOpacity,
              scale: textScale
            }}
          >
            <h2 className="text-[25px] sm:text-[30px] md:text-[40px] font-basis text-[#c9a961] mb-6 leading-tight">
              Discover your path to <br /> wellness and growth.
            </h2>

            <p className="sm:w-[331.58px] md:w-[366] text-[12.1px] sm:text-[12.7px] md:text-[13.3px] text-[#343E35] leading-relaxed mb-[18px] mt-[18px] font-basis align-center"
              style={{ whiteSpace: 'pre-line' }}
            >
              At Ulaman we redefine luxury as an experience that not only <br /> pampers the senses
              but also nurtures the soul. Nestled in <br /> pristine nature, our eco-luxury retreat
              offers a sanctuary for <br />healing and transformation. With personalized programs
              year-<br />round, enjoy dedicated attention and care, immersing yourself <br />in relaxation,
              rejuvenation, or profound inner change through <br />meticulously curated activities
              and treatments. <span className="italic">Your <br /> transformative journey begins here.</span>
            </p>

            <a
              href="#learn-more"
              className="inline-block text-[#c9a961] hover:text-[#b8975a] font-medium text-sm tracking-wider border-b border-[#c9a961] hover:border-[#b8975a] transition-colors pb-1 uppercase"
            >
              Learn More
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default Wellness
