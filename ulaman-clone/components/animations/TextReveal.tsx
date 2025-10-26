// components/animations/TextReveal.tsx
'use client'

import React from 'react'

interface TextRevealProps {
  text: string
  className?: string
  as?: 'h1' | 'h2' | 'h3' | 'p' | 'div' | 'span'
  startColor: string // Warna Pudar (rgba(..., 0.3))
  endColor: string   // Warna Pekat (#C69C4D)
  revealRatio: number
}

const TextReveal: React.FC<TextRevealProps> = ({
  text,
  className = '',
  as: Component = 'p',
  startColor,
  endColor,
  revealRatio
}) => {
  const LINE_BREAK_DELIMITER = '|BREAK|'

  // ... (Logika pembagian tokens dan perhitungan ratioPerWord tetap sama) ...
  const lines = text.split(LINE_BREAK_DELIMITER)
  let allTokens: (string | typeof LINE_BREAK_DELIMITER)[] = []
  lines.forEach((line, index) => {
    const wordsInLine = line.trim().split(/\s+/).filter(w => w.length > 0)
    allTokens = allTokens.concat(wordsInLine)
    if (index < lines.length - 1) {
      allTokens.push(LINE_BREAK_DELIMITER)
    }
  })

  const totalWords = allTokens.filter(token => token !== LINE_BREAK_DELIMITER).length
  const ratioPerWord = totalWords > 0 ? 1 / totalWords : 0

  let wordCounter = 0

  const finalContent = allTokens.flatMap((token, index) => {

    if (token === LINE_BREAK_DELIMITER) {
      return <div key={`break-${index}`} className="block h-0 w-full" style={{ margin: '0.2em 0' }} />
    }

    const wordIndex = wordCounter
    wordCounter++

    const wordStartRatio = wordIndex * ratioPerWord
    const wordEndRatio = (wordIndex + 1) * ratioPerWord

    let wordClipPercentage = 0
    if (revealRatio >= wordStartRatio) {
      if (revealRatio >= wordEndRatio) {
        wordClipPercentage = 100
      } else {
        const progressInWord = (revealRatio - wordStartRatio) / ratioPerWord
        wordClipPercentage = Math.min(100, Math.max(0, progressInWord * 100))
      }
    }

    // --- LOGIKA BARU: DUA LAPISAN TEKS SEDERHANA ---

    // Lapisan 1: Teks Penuh (Pekat) di belakang
    const fullWord = (
      <span style={{ color: endColor, position: 'absolute', top: 0, left: 0 }}>
        {token}
      </span>
    )

    // Lapisan 2: Teks Awal (Pudar) di depan
    const clippedWord = (
      <span
        style={{
          color: startColor,
          // Menggunakan clipPath untuk menutupi bagian kiri teks (yang sudah di-reveal)
          clipPath: `inset(0 ${100 - wordClipPercentage}% 0 0)`
        }}
      >
        {token}
      </span>
    )


    return (
      <span
        key={`word-${index}`}
        className="inline-block relative" // Penting: Tambahkan relative pada container kata
        style={{ marginRight: '0.5em', whiteSpace: 'nowrap' }}
      >
        {fullWord}
        {clippedWord}
      </span>
    )
  })

  // Style akhir teks diatur di sini
  const style: React.CSSProperties = {
    color: startColor, // Teks secara keseluruhan default ke pudar
  }

  return (
    <Component
      className={`${className} overflow-hidden`}
      style={style as React.CSSProperties}
    >
      {finalContent}
    </Component>
  )
}

export default TextReveal
