// components/retreats_sections/Introduction.tsx
'use client'
import React from 'react'

interface IntroSectionProps {
  title: string
  content: string
  className?: string
}

const IntroSection = ({
  title,
  content,
  className = ''
}: IntroSectionProps) => {
  return (
    <section className={`py-24 px-8 bg-[#EFEBE2] ${className}`}>
      <div className="max-w-4xl mx-auto text-center">
        <h1
          className="font-americana text-[35px] md:text-[25px] lg:text-[35px] text-[#C69C4D] mb-6 mt-8 leading-tight"
          dangerouslySetInnerHTML={{ __html: title }}
        />
        <div
          className="font-basis text-[#6B5D4F] text-[14.5px] md:text-[15px] lg:text-[13.6px] leading-relaxed text-left lg:text-center"
          dangerouslySetInnerHTML={{ __html: content }}
        />
      </div>
    </section>
  )
}

export default IntroSection
