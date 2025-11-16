// components/animations/TextReveal.tsx
'use client'

import React from 'react'

interface TextRevealProps {
  text: string
  className?: string
  as?: 'h1' | 'h2' | 'h3' | 'p' | 'div' | 'span'
  startColor: string
  endColor: string
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
      return <br key={`break-${index}`} />
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
    const gradientStyle = {
      backgroundImage: `linear-gradient(to right, ${startColor} ${wordClipPercentage}%, ${endColor} ${wordClipPercentage}%)`,
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      backgroundClip: 'text',
      display: 'inline-block',
      marginRight: '0.5em'
    }

    return (
      <span
        key={`word-${index}`}
        style={gradientStyle}
      >
        {token}
      </span>
    )
  })

  return (
    <Component className={className}>
      {finalContent}
    </Component>
  )
}

export default TextReveal
