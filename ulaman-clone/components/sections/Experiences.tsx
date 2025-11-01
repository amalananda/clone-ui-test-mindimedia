// components/sections/Experiences.tsx
'use client'
import Image from 'next/image'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import React, { useRef } from 'react'
import UnderlineLink from '@/components/ui/UnderlineLink'

const Experiences = () => {
  const scrollContainerRef = useRef<HTMLDivElement>(null)

  const experiences = [
    {
      id: 1,
      title: 'Floating Lake',
      subtitle: 'A luxurious floating villa on Ulaman’s bio-filtered lake.',
      image: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&h=1000&fit=crop',
      link: '/rooms/floating-lake'
    },
    {
      id: 2,
      title: 'Cocoon Jungle',
      subtitle: 'Indulge in an unparalleled blend of exotic elegance and coziness.',
      image: 'https://images.unsplash.com/photo-1540541338287-41700207dee6?w=800&h=1000&fit=crop',
      link: '/rooms/cocoon-jungle'
    },
    {
      id: 3,
      title: 'Avatar Tree House',
      subtitle: 'Experience luxury in an avant-garde design with breathtaking 180° views.',
      image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&h=1000&fit=crop',
      link: '/rooms/avatar-tree-house'
    },
  ]

  // 🔑 LOGIKA SCROLL NAVIGASI
  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = 450
      if (direction === 'left') {
        scrollContainerRef.current.scrollBy({ left: -scrollAmount, behavior: 'smooth' })
      } else {
        scrollContainerRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' })
      }
    }
  }

  return (
    <section id="experiences" className="py-15  bg-[#EFEBE2] text-stone-800 overflow-hidden"> {/* ✅ Ubah background dan warna teks */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Konten Atas: Judul & Panah Navigasi */}
        <div className="flex flex-col items-center text-center mb-10 lg:mb-16">

          {/* Judul Section (Selalu Terpusat) */}
          <h2 className="text-3xl md:text-4xl font-americana text-[#C69C4D] leading-tight max-w-2xl">
            Discover cozy elegance, where tranquility <br />
            meets Bali’s serene beauty.
          </h2>
        </div>


        {/* Tombol Navigasi Slider */}
        <div className="flex flex-col lg:gap-[10rem] lg:flex-row items-center">

          {/* KIRI (Kolom Navigasi): Tombol & Space di Desktop */}
          <div className="hidden lg:flex flex-col items-center
               lg:w-[10vw] lg:h-[12vw] xl:w-[5vw] xl:h-[15vw]
               flex-shrink-0 space-y-8 border-current lg:mr-[1vw] lg:ml-[2vw] xl:ml-[-3vw]">

            {/* 🔑 Styling Kotak Tombol Sesuai Gambar */}
            <button
              onClick={() => scroll('left')}
              className="p-[1.5vw] border border-amber-800/50 hover:bg-amber-800/10 transition-all duration-300 text-amber-800"
              aria-label="Scroll left"
            >
              <ArrowLeft className="w-[2vw] h-[2vw]" />
            </button>

            <button
              onClick={() => scroll('right')}
              className="p-[1.5vw] border border-amber-800/50 hover:bg-amber-800/10 transition-all duration-300 text-amber-800"
              aria-label="Scroll right"
            >
              <ArrowRight className="w-[2vw] h-[2vw]" />
            </button>
          </div>

          {/* RIGHT (Carousel Column): Takes up the remaining space */}
          <div
            className="w-full"
          >
            <div
              ref={scrollContainerRef}
              // Jarak space-x-8 dipertahankan. pr-10 dipertahankan.
              className="flex space-x-8 pb-4 overflow-hidden snap-x snap-mandatory scrollbar-hide pr-10"
            >
              {experiences.map((exp) => (
                <div
                  key={exp.id}
                  // LEBAR KARTU DIUBAH DARI VW KE PX KAKU
                  className="flex-none snap-start group relative overflow-hidden rounded-lg transition-all duration-500
               w-[420px] sm:w-[420px] lg:w-[450px] xl:w-[480px]
               max-w-[480px]"
                >

                  {/* Container Gambar (tetap proporsional, tidak menggunakan VW di sini) */}
                  <div className="relative overflow-hidden w-full aspect-[3/4]">
                    <Image
                      src={exp.image}
                      alt={exp.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-700"
                      // sizes dipertahankan karena lebih baik untuk Next/Image
                      sizes="(max-width: 768px) 80vw, 30vw"
                    />
                  </div>

                  {/* Konten Teks (Tidak Berubah) */}
                  <div className="p-6 bg-[#E8E3D8]">
                    <h3 className="text-2xl font-americana text-[#C69C4D] mb-2">{exp.title}</h3>
                    <p className="font-americana text-stone-600 mb-4">{exp.subtitle}</p>
                    <UnderlineLink href={exp.link} className="mt-5">DISCOVER</UnderlineLink>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section >
  )
}

export default Experiences
