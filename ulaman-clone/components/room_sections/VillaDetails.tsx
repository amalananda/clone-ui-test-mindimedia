// components/VillaDetails.tsx
'use client'
import UnderlineLink from '../ui/UnderlineLink'
export default function VillaDetails() {
  return (
    <section className="py-24 px-6 ">
      <div className="max-w-5xl mx-auto text-center">
        <div className="grid grid-cols-4 gap-8 mb-16">
          <div className="flex flex-col items-center">
            <div className="w-16 h-16 mb-4">
              <svg viewBox="0 0 100 100" className="stroke-[#C5A572]" fill="none" strokeWidth="1.5">
                <circle cx="30" cy="40" r="8" />
                <circle cx="50" cy="40" r="8" />
                <circle cx="70" cy="40" r="8" />
                <rect x="20" y="50" width="60" height="30" />
              </svg>
            </div>
            <span className="text-[#C5A572] text-sm">3 People</span>
          </div>

          <div className="flex flex-col items-center">
            <div className="w-16 h-16 mb-4">
              <svg viewBox="0 0 100 100" className="stroke-[#C5A572]" fill="none" strokeWidth="1.5">
                <rect x="20" y="40" width="60" height="35" rx="2" />
                <path d="M30 40 V30 H70 V40" />
                <circle cx="35" cy="50" r="3" />
                <circle cx="65" cy="50" r="3" />
              </svg>
            </div>
            <span className="text-[#C5A572] text-sm">King sized bed</span>
          </div>

          <div className="flex flex-col items-center">
            <div className="w-16 h-16 mb-4">
              <svg viewBox="0 0 100 100" className="stroke-[#C5A572]" fill="none" strokeWidth="1.5">
                <path d="M30 30 Q30 20 40 20 Q50 20 50 30" />
                <rect x="25" y="30" width="50" height="40" rx="25" />
                <circle cx="40" cy="45" r="2" />
              </svg>
            </div>
            <span className="text-[#C5A572] text-sm">Rainshower & Bathtub</span>
          </div>

          <div className="flex flex-col items-center">
            <div className="w-16 h-16 mb-4">
              <svg viewBox="0 0 100 100" className="stroke-[#C5A572]" fill="none" strokeWidth="1.5">
                <rect x="20" y="35" width="60" height="40" rx="4" />
                <rect x="30" y="45" width="15" height="10" />
                <rect x="55" y="45" width="15" height="10" />
              </svg>
            </div>
            <span className="text-[#C5A572] text-sm">Sofa bed</span>
          </div>
        </div>

        <h2 className="font-serif text-4xl text-[#C5A572] mb-8 leading-relaxed">
          Dive into the heart of comfort, embraced by<br />
          the tranquil beauty of Balinese nature.
        </h2>

        <UnderlineLink href="#bookvilla" className="mt-4">BOOK THIS VILLA</UnderlineLink>
      </div>
    </section>
  )
}
