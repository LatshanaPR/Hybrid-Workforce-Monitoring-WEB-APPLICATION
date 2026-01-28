"use client"

import React, { useEffect, useRef } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface FloatingCard3DProps {
  title: string
  value: string | React.ReactNode
  icon?: React.ReactNode
  color?: "primary" | "success" | "warning" | "danger"
  delay?: number
}

export function FloatingCard3D({
  title,
  value,
  icon,
  color = "primary",
  delay = 0,
}: FloatingCard3DProps) {
  const cardRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const card = cardRef.current
    if (!card) return

    const handleMouseMove = (e: MouseEvent) => {
      const rect = card.getBoundingClientRect()
      const centerX = rect.left + rect.width / 2
      const centerY = rect.top + rect.height / 2
      const mouseX = e.clientX
      const mouseY = e.clientY

      const rotateY = ((mouseX - centerX) / (rect.width / 2)) * 15
      const rotateX = ((centerY - mouseY) / (rect.height / 2)) * 15

      card.style.transform = `perspective(1200px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(20px)`
      card.style.transition = "none"
    }

    const handleMouseLeave = () => {
      card.style.transform = "perspective(1200px) rotateX(0) rotateY(0) translateZ(0)"
      card.style.transition = "transform 0.6s ease-out"
    }

    window.addEventListener("mousemove", handleMouseMove)
    card.addEventListener("mouseleave", handleMouseLeave)

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
      card.removeEventListener("mouseleave", handleMouseLeave)
    }
  }, [])

  const colorClasses: Record<string, string> = {
    primary: "from-blue-100/15 via-blue-200/8 to-transparent border-blue-300/30",
    success: "from-teal-100/15 via-cyan-200/8 to-transparent border-teal-300/30",
    warning: "from-amber-100/15 via-orange-200/8 to-transparent border-amber-300/30",
    danger: "from-red-100/15 via-rose-200/8 to-transparent border-red-300/30",
  }

  return (
    <div
      ref={cardRef}
      style={{
        animation: `floatUp 0.8s ease-out ${delay}s both`,
      }}
      className={`rounded-2xl border bg-gradient-to-br ${colorClasses[color]} shadow-lg hover:shadow-xl transform transition-all duration-300 will-change-transform backdrop-blur-sm hover:border-white/50`}
    >
      <style>{`
        @keyframes floatUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
      
      <Card className="border-0 bg-transparent">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium text-slate-400">
            {title}
          </CardTitle>
          {icon && (
            <div className={`p-2 rounded-lg bg-gradient-to-br ${colorClasses[color]}`}>
              {icon}
            </div>
          )}
        </CardHeader>
        <CardContent>
          <p className="text-2xl font-bold text-slate-100">{value}</p>
        </CardContent>
      </Card>
    </div>
  )
}
