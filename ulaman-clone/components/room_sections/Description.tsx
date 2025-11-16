// components/room_sections/Description.tsx
'use client'
import UnderlineLink from '../ui/UnderlineLink'
interface DescriptionProps {
  title: string
  subtitle: string
  paragraphs: string[]
  buttonText?: string
  buttonLink?: string
  titleClassName?: string
  paragraphClassName?: string
  buttonTextClassName?: string
  mobileTitle?: string
  mobileParagraphs?: string[]
}

export default function Description({
  title,
  subtitle,
  paragraphs,
  buttonText = 'BOOK THIS VILLA',
  buttonLink = '#',
  titleClassName = 'text-5xl',
  paragraphClassName = 'tetx-14.5px',
  buttonTextClassName = 'text-[#C69C4D]',
  mobileTitle,
  mobileParagraphs
}: DescriptionProps) {
  return (
    <section className="py-24 bg-[#EFEBE2]">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-1 items-start">
        {/* LEFT SIDE */}
        <div>
          {/* Desktop Title */}
          <h1 className={`hidden md:block font-americana ${titleClassName} text-[#C69C4D] mb-4`}>
            {title.split('<br/>').map((line, i, arr) => (
              <span key={i}>
                {line}
                {i < arr.length - 1 && <br />}
              </span>
            ))}
          </h1>

          {/* Mobile Title */}
          <h1 className={`md:hidden font-americana ${titleClassName} text-[#C69C4D] mb-4`}>
            {(mobileTitle || title).split('<br/>').map((line, i, arr) => (
              <span key={i}>
                {line}
                {i < arr.length - 1 && <br />}
              </span>
            ))}
          </h1>

          <p className="text-[#343E35] font-basis text-lg">{subtitle}</p>
        </div>

        {/* RIGHT SIDE */}
        <div className={`text-[#343E35] ${paragraphClassName} font-basis leading-relaxed max-w-5xl`}>
          {/* Desktop Paragraphs */}
          <div className="hidden md:block">
            {paragraphs.map((paragraph, index) => (
              <p key={index} className="mb-6">
                {paragraph.split('<br/>').map((line, i, arr) => (
                  <span key={i}>
                    {line}
                    {i < arr.length - 1 && <br />}
                  </span>
                ))}
              </p>
            ))}
          </div>

          {/* Mobile Paragraphs */}
          <div className="md:hidden">
            {(mobileParagraphs || paragraphs).map((paragraph, index) => (
              <p key={index} className="mb-6">
                {paragraph.split('<br/>').map((line, i, arr) => (
                  <span key={i}>
                    {line}
                    {i < arr.length - 1 && <br />}
                  </span>
                ))}
              </p>
            ))}
          </div>

          {buttonText && (
            <UnderlineLink
              href={buttonLink}
              className="mt-3"
              textColor={buttonTextClassName}
            >
              {buttonText}
            </UnderlineLink>
          )}
        </div>
      </div>
    </section>
  )
}
