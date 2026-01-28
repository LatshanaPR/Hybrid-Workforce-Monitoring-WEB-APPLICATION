"use client"

import React from "react"

import { useState } from "react"
import Link from "next/link"
import {
  Clock,
  Activity,
  Coffee,
  Building,
  Home,
  Palmtree,
  ArrowRight,
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { FloatingCard3D } from "@/components/floating-card-3d"

type Status = "Available" | "Idle" | "Offline"
type WorkMode = "Office" | "WFH" | "Leave"

const statusColors: Record<Status, string> = {
  Available: "bg-status-online",
  Idle: "bg-status-idle",
  Offline: "bg-status-offline",
}

const workModeIcons: Record<WorkMode, React.ElementType> = {
  Office: Building,
  WFH: Home,
  Leave: Palmtree,
}

export default function DashboardPage() {
  const [status, setStatus] = useState<Status>("Available")
  const [workMode] = useState<WorkMode>("Office")

  const loginTime = "09:15 AM"
  const activeTime = "4h 32m"
  const idleTime = "18m"

  const WorkModeIcon = workModeIcons[workMode]

  return (
    <div className="p-6 lg:p-8 relative z-10">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-100">Welcome back, John</h1>
        <p className="mt-1 text-slate-400">
          Here is your workforce overview for today
        </p>
      </div>

      {/* Status Cards Row - 3D Floating */}
      <div className="mb-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {/* Status Card - Custom Interactive */}
        <div className="rounded-2xl border bg-gradient-to-br from-blue-100/20 via-blue-50/10 to-transparent border-blue-200/40 shadow-lg hover:shadow-lg hover:border-blue-300/50 transform transition-all duration-300 will-change-transform backdrop-blur-sm">
          <Card className="border-0 bg-transparent">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-slate-400">
                Status
              </CardTitle>
              <div className={cn("h-4 w-4 rounded-full shadow-md animate-pulse", statusColors[status])} />
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2">
                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value as Status)}
                  className="cursor-pointer border-0 bg-transparent text-xl font-bold text-slate-100 outline-none"
                >
                  <option value="Available">Available</option>
                  <option value="Idle">Idle</option>
                  <option value="Offline">Offline</option>
                </select>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Floating 3D Cards */}
        <FloatingCard3D
          title="Login Time"
          value={loginTime}
          icon={<Clock className="h-4 w-4 text-primary" />}
          color="primary"
          delay={0.1}
        />

        <FloatingCard3D
          title="Active Time"
          value={activeTime}
          icon={<Activity className="h-4 w-4 text-status-online" />}
          color="success"
          delay={0.2}
        />

        <FloatingCard3D
          title="Idle Time"
          value={idleTime}
          icon={<Coffee className="h-4 w-4 text-status-idle" />}
          color="warning"
          delay={0.3}
        />
      </div>

      {/* Today's Attendance & Quick Actions */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Today's Attendance Status */}
        <Card className="border-0 shadow-lg hover:shadow-lg transition-all duration-300 bg-gradient-to-br from-blue-100/20 to-blue-50/10 border border-blue-200/30">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-slate-100">
              Today&apos;s Attendance
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-4 rounded-2xl bg-gradient-to-r from-blue-200/20 to-teal-200/15 p-5 border border-blue-300/30">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-teal-500 shadow-md">
                <WorkModeIcon className="h-7 w-7 text-white" />
              </div>
              <div>
                <p className="text-lg font-bold text-slate-100">
                  Working from {workMode === "WFH" ? "Home" : workMode}
                </p>
                <p className="text-sm text-slate-400">
                  {workMode === "Office"
                    ? "You are working from the office today"
                    : workMode === "WFH"
                    ? "You are working remotely today"
                    : "You are on leave today"}
                </p>
              </div>
            </div>

            {/* Weekly Overview */}
            <div className="mt-6 p-5 rounded-2xl bg-gradient-to-br from-blue-100/15 to-blue-50/10 border border-blue-200/30 backdrop-blur-sm">
              <p className="mb-4 text-sm font-semibold text-slate-200">
                This Week
              </p>
              <div className="flex gap-2">
                {["Mon", "Tue", "Wed", "Thu", "Fri"].map((day, i) => (
                  <div
                    key={day}
                    className={cn(
                      "flex flex-1 flex-col items-center rounded-xl p-3 transition-all duration-300 hover:scale-110 transform hover:shadow-md cursor-pointer",
                      i < 3 ? "bg-gradient-to-b from-blue-200/30 to-blue-100/15 border-2 border-blue-300/40 shadow-sm" : "bg-gradient-to-b from-slate-400/15 to-slate-300/10 border-2 border-slate-400/30"
                    )}
                  >
                    <span className="text-xs font-bold text-slate-400">{day}</span>
                    <div
                      className={cn(
                        "mt-3 h-4 w-4 rounded-full shadow-lg animate-pulse",
                        i < 3 ? "bg-gradient-to-r from-blue-400 to-teal-400" : "bg-slate-500/40"
                      )}
                    />
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card className="border-0 shadow-lg hover:shadow-lg transition-all duration-300 bg-gradient-to-br from-blue-100/20 to-blue-50/10 hover:border-blue-200/40 border border-blue-200/30">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg font-bold text-slate-100">Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Link href="/leave">
              <Button
                variant="outline"
                className="h-auto w-full justify-between border-2 border-status-leave/40 bg-gradient-to-r from-status-leave/15 to-status-leave/5 p-4 hover:bg-status-leave/20 hover:border-status-leave/60 transition-all hover:shadow-lg hover:scale-102 transform rounded-xl"
              >
                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-status-leave/30 to-status-leave/10 border-2 border-status-leave/40 shadow-md">
                    <Palmtree className="h-6 w-6 text-status-leave" />
                  </div>
                  <div className="text-left">
                    <p className="font-bold text-slate-100">Apply Leave</p>
                    <p className="text-xs text-slate-400">
                      Request time off
                    </p>
                  </div>
                </div>
                <ArrowRight className="h-5 w-5 text-muted-foreground transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>

            <Link href="/leave">
              <Button
                variant="outline"
                className="h-auto w-full justify-between border-2 border-accent/40 bg-gradient-to-r from-accent/15 to-accent/5 p-4 hover:bg-accent/20 hover:border-accent/60 transition-all hover:shadow-lg hover:scale-102 transform rounded-xl"
              >
                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-accent/30 to-accent/10 border-2 border-accent/40 shadow-md">
                    <Home className="h-6 w-6 text-accent" />
                  </div>
                  <div className="text-left">
                    <p className="font-semibold text-slate-100">
                      Apply Work From Home
                    </p>
                    <p className="text-sm text-slate-400">
                      Request remote work
                    </p>
                  </div>
                </div>
                <ArrowRight className="h-5 w-5 text-muted-foreground" />
              </Button>
            </Link>

            {/* Team Overview */}
            <div className="mt-6 rounded-xl bg-gradient-to-br from-blue-100/15 to-blue-50/10 border border-blue-200/30 p-4">
              <p className="mb-2 text-sm font-medium text-slate-400">
                Team Online
              </p>
              <div className="flex items-center gap-2">
                <div className="flex -space-x-2">
                  {["JD", "AS", "MK", "RP"].map((initials, i) => (
                    <div
                      key={initials}
                      className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-card bg-primary text-xs font-medium text-primary-foreground"
                      style={{ zIndex: 4 - i }}
                    >
                      {initials}
                    </div>
                  ))}
                </div>
                <span className="text-sm text-muted-foreground">
                  +12 team members online
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
