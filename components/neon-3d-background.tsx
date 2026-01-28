"use client"

import { useEffect, useRef } from "react"

export function Neon3DBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resizeCanvas()
    window.addEventListener("resize", resizeCanvas)

    // Animation variables
    let animationId: number
    let time = 0

    const drawCube = (
      x: number,
      y: number,
      z: number,
      size: number,
      color: string,
      glow: string
    ) => {
      const distance = Math.sqrt(x * x + y * y + z * z)
      const perspective = 500 / (distance + 500)

      // Draw cube edges with glow
      ctx.strokeStyle = color
      ctx.lineWidth = 2
      ctx.shadowColor = glow
      ctx.shadowBlur = 15

      // Cube vertices
      const vertices = [
        [x - size, y - size, z - size],
        [x + size, y - size, z - size],
        [x + size, y + size, z - size],
        [x - size, y + size, z - size],
        [x - size, y - size, z + size],
        [x + size, y - size, z + size],
        [x + size, y + size, z + size],
        [x - size, y + size, z + size],
      ]

      // Project vertices
      const projected = vertices.map((v) => [
        canvas.width / 2 + (v[0] * perspective) / 100,
        canvas.height / 2 + (v[1] * perspective) / 100,
      ])

      // Draw edges
      const edges = [
        [0, 1],
        [1, 2],
        [2, 3],
        [3, 0],
        [4, 5],
        [5, 6],
        [6, 7],
        [7, 4],
        [0, 4],
        [1, 5],
        [2, 6],
        [3, 7],
      ]

      edges.forEach(([start, end]) => {
        ctx.beginPath()
        ctx.moveTo(projected[start][0], projected[start][1])
        ctx.lineTo(projected[end][0], projected[end][1])
        ctx.stroke()
      })
    }

    const animate = () => {
      // Clear canvas with dark background
      ctx.fillStyle = "rgba(8, 18, 32, 0.1)"
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      time += 0.003

      // Draw multiple rotating cubes - Deep Blue & Teal theme
      drawCube(
        Math.sin(time) * 100,
        Math.cos(time * 0.7) * 100,
        Math.cos(time * 0.5) * 100,
        40,
        "rgba(70, 180, 200, 0.6)",
        "rgba(70, 180, 200, 0.4)"
      )

      drawCube(
        Math.cos(time * 0.6) * 120,
        Math.sin(time * 0.8) * 120,
        Math.sin(time * 0.4) * 120,
        35,
        "rgba(100, 150, 200, 0.6)",
        "rgba(100, 150, 200, 0.4)"
      )

      drawCube(
        Math.sin(time * 0.5) * 150,
        Math.cos(time * 0.9) * 150,
        Math.cos(time * 0.3) * 150,
        30,
        "rgba(130, 170, 220, 0.5)",
        "rgba(130, 170, 220, 0.3)"
      )

      // Draw floating particles - Subtle teal
      ctx.fillStyle = "rgba(70, 180, 200, 0.4)"
      for (let i = 0; i < 20; i++) {
        const px = Math.sin(time + i) * 200 + canvas.width / 2
        const py = Math.cos(time * 0.7 + i) * 200 + canvas.height / 2
        const size = Math.sin(time * 2 + i) * 2 + 3
        ctx.beginPath()
        ctx.arc(px, py, size, 0, Math.PI * 2)
        ctx.fill()
      }

      animationId = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      cancelAnimationFrame(animationId)
      window.removeEventListener("resize", resizeCanvas)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none"
      style={{
        background: "linear-gradient(135deg, #0d1f2d 0%, #1a3a4a 50%, #142a3a 100%)",
      }}
    />
  )
}
