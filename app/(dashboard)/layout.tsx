"use client"

import React from "react"
import { AnimatedBackground } from "@/components/animated-background" // Import AnimatedBackground component
import { AppSidebar } from "@/components/app-sidebar"
import { Neon3DBackground } from "@/components/neon-3d-background"
import { useState } from "react"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [userRole] = useState<"Employee" | "Manager" | "HR" | "Admin">("Admin")

  return (
    <div className="flex h-screen overflow-hidden bg-gradient-to-br from-slate-900 via-blue-900 to-teal-900">
      <Neon3DBackground />
      <AppSidebar userRole={userRole} />
      <main className="flex-1 overflow-auto relative z-10">{children}</main>
    </div>
  )
}
