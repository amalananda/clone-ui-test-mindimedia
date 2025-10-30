// components/sections/Wellness.tsx
'use client'
import { useScrollAnimation, scrollAnimationPresets } from '@/hooks/useScrollAnimation'
import SplitImageReveal from '@/components/animations/SplitImageReveal'
import UnderlineLink from '@/components/ui/UnderlineLink'

const Wellness = () => {
  const {
    containerRef
  } = useScrollAnimation(scrollAnimationPresets.splitImages)

  return (
    <section
      ref={containerRef}
      className="relative min-h-[100vh] bg-[#e8e1d8] overflow-hidden"
    >
      <SplitImageReveal
        leftImage={{
          src: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=600&h=800&fit=crop',
          alt: 'Wellness experience'
        }}
        rightImage={{
          src: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=600&h=800&fit=crop',
          alt: 'Spa treatment'
        }}
      >
        <h2 className="text-[25px] sm:text-[30px] md:text-[40px] font-basis text-[#c9a961] mb-6 leading-tight">
          Discover your path to <br /> wellness and growth.
        </h2>

        <p
          className="sm:w-[331.58px] md:w-[366px] text-[12.1px] sm:text-[12.7px] md:text-[13.3px] text-[#343E35] leading-relaxed mb-[18px] mt-[18px] font-basis mx-auto"
          style={{ whiteSpace: 'pre-line' }}
        >
          At Ulaman we redefine luxury as an experience that not only <br /> pampers the senses
          but also nurtures the soul. Nestled in <br /> pristine nature, our eco-luxury retreat
          offers a sanctuary for <br />healing and transformation. With personalized programs
          year-<br />round, enjoy dedicated attention and care, immersing yourself <br />in relaxation,
          rejuvenation, or profound inner change through <br />meticulously curated activities
          and treatments. <span className="italic">Your <br /> transformative journey begins here.</span>
        </p>
        <UnderlineLink href="#learnmore" className="mt-5">LEARN MORE</UnderlineLink>

      </SplitImageReveal>

    </section>
  )
}

export default Wellness
