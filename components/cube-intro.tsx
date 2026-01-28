'use client'

import { useEffect, useRef } from 'react'

export function CubeIntro({ onComplete }: { onComplete: () => void }) {
  const containerRef = useRef<HTMLDivElement>(null)
  const cubeRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const animate = () => {
      if (!cubeRef.current) return

      const startTime = Date.now()
      const duration = 3500 // 3.5 seconds
      const easeInOutCubic = (t: number) => {
        return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2
      }

      const animationFrame = setInterval(() => {
        const elapsed = Date.now() - startTime
        const progress = Math.min(elapsed / duration, 1)
        const eased = easeInOutCubic(progress)

        // Full rotation
        const rotation = eased * 360

        if (cubeRef.current) {
          cubeRef.current.style.transform = `rotateX(${rotation * 0.5}deg) rotateY(${rotation}deg) rotateZ(${rotation * 0.3}deg)`
          cubeRef.current.style.opacity = `${1 - eased * 0.7}`
        }

        if (progress >= 1) {
          clearInterval(animationFrame)
          // Keep cube static and faded
          if (cubeRef.current) {
            cubeRef.current.style.opacity = '0.15'
            cubeRef.current.style.transform = `rotateX(180deg) rotateY(360deg) rotateZ(108deg)`
          }
          // Call callback after a small delay
          setTimeout(onComplete, 300)
        }
      }, 16) // ~60fps

      return () => clearInterval(animationFrame)
    }

    animate()
  }, [onComplete])

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 flex items-center justify-center"
      style={{
        perspective: '1200px',
      }}
    >
      <div
        ref={cubeRef}
        style={{
          width: '120px',
          height: '120px',
          transformStyle: 'preserve-3d',
          transition: 'opacity 0.3s ease-out',
        }}
      >
        {/* Front */}
        <div
          style={{
            position: 'absolute',
            width: '120px',
            height: '120px',
            backgroundColor: '#6b7280',
            transform: 'translateZ(60px)',
            border: '1px solid #4b5563',
            opacity: 0.9,
          }}
        />
        {/* Back */}
        <div
          style={{
            position: 'absolute',
            width: '120px',
            height: '120px',
            backgroundColor: '#4b5563',
            transform: 'translateZ(-60px) rotateY(180deg)',
            border: '1px solid #374151',
            opacity: 0.9,
          }}
        />
        {/* Right */}
        <div
          style={{
            position: 'absolute',
            width: '120px',
            height: '120px',
            backgroundColor: '#555e6f',
            transform: 'rotateY(90deg) translateZ(60px)',
            border: '1px solid #4b5563',
            opacity: 0.9,
          }}
        />
        {/* Left */}
        <div
          style={{
            position: 'absolute',
            width: '120px',
            height: '120px',
            backgroundColor: '#3f4757',
            transform: 'rotateY(-90deg) translateZ(60px)',
            border: '1px solid #2d3748',
            opacity: 0.9,
          }}
        />
        {/* Top */}
        <div
          style={{
            position: 'absolute',
            width: '120px',
            height: '120px',
            backgroundColor: '#606978',
            transform: 'rotateX(90deg) translateZ(60px)',
            border: '1px solid #4b5563',
            opacity: 0.9,
          }}
        />
        {/* Bottom */}
        <div
          style={{
            position: 'absolute',
            width: '120px',
            height: '120px',
            backgroundColor: '#4a525d',
            transform: 'rotateX(-90deg) translateZ(60px)',
            border: '1px solid #374151',
            opacity: 0.9,
          }}
        />
      </div>
    </div>
  )
}
