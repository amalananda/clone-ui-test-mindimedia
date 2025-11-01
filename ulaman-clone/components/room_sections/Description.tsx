// components/room_sections/Description.tsx
// 'use client'
// export default function Description() {
//   return (
//     <section className="py-24 px-6 bg-[#EFEBE2]">
//       <div className="max-w-6xl mx-auto">
//         <h1 className="font-serif text-5xl text-[#C5A572] mb-4">Floating Lake</h1>
//         <p className="text-[#8B7355] text-lg mb-12">4 Units Total | 52m2</p>

//         <div className="space-y-6 text-[#6B5D4F] leading-relaxed max-w-3xl">
//           <p>
//             Set above Bali&apos;s only bio-filtered, koi-filled lake, Ulaman&lsquo;s Floating Lake Villas offer a
//             serene and luxurious experience unlike any other. Each villa features a private
//             floating deck and a sunken round hammock, thoughtfully designed for couples—
//             perfect for stargazing or feeding the koi below. Seamlessly blending modern
//             tropical elegance with natural elements, the villas include a sun deck patio, hanging
//             net, and a handcrafted teakwood bathtub.
//           </p>
//           <p>
//             Expansive glass doors invite natural light and reveal tranquil lake views. Inside,
//             automatic curtains, a spacious layout, and attentive service create a peaceful
//             retreat that reflects Ulaman&apos;s eco-luxury philosophy—perfect for relaxation and
//             rejuvenation.
//           </p>
//         </div>

//         <button className="mt-12 border-b-2 border-[#C5A572] text-[#C5A572] pb-1 hover:border-[#8B7355] hover:text-[#8B7355] transition">
//           BOOK THIS VILLA
//         </button>
//       </div>
//     </section>
//   )
// }
// components/room_sections/Description.tsx
'use client'

interface DescriptionProps {
  title: string
  subtitle: string
  paragraphs: string[]
  buttonText?: string
  buttonLink?: string
}

export default function Description({
  title,
  subtitle,
  paragraphs,
  buttonText = 'BOOK THIS VILLA',
  buttonLink = '#'
}: DescriptionProps) {
  return (
    <section className="py-24 bg-[#EFEBE2]">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-1 items-start">

        {/* LEFT SIDE */}
        <div>
          <h1 className="font-americana text-5xl text-[#C69C4D] mb-4">{title}</h1>
          <p className="text-[#343E35] font-basis text-lg">{subtitle}</p>
        </div>

        {/* RIGHT SIDE */}
        <div className="text-[#343E35] text-[14.5px] font-basis leading-relaxed max-w-5xl">
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

          <a
            href={buttonLink}
            className="inline-block mt-6 text-base text-[#C69C4D] pb-1 "
          >
            {buttonText}
          </a>
        </div>
      </div>
    </section>
  )
}
