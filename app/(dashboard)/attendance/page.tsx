"use client"

import React from "react"

import { useState } from "react"
import { LogIn, LogOut, Circle, Building, Home, Palmtree } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { cn } from "@/lib/utils"

type Status = "Available" | "Idle" | "Offline"
type WorkType = "Office" | "WFH" | "Leave"

interface AttendanceRecord {
  date: string
  loginTime: string
  logoutTime: string
  status: WorkType
}

const statusColors: Record<Status, { bg: string; text: string }> = {
  Available: { bg: "bg-status-online/10", text: "text-status-online" },
  Idle: { bg: "bg-status-idle/10", text: "text-status-idle" },
  Offline: { bg: "bg-status-offline/10", text: "text-status-offline" },
}

const workTypeStyles: Record<WorkType, { bg: string; text: string; icon: React.ElementType }> = {
  Office: { bg: "bg-primary/10", text: "text-primary", icon: Building },
  WFH: { bg: "bg-accent/10", text: "text-accent", icon: Home },
  Leave: { bg: "bg-status-leave/10", text: "text-status-leave", icon: Palmtree },
}

const attendanceRecords: AttendanceRecord[] = [
  { date: "Jan 21, 2026", loginTime: "09:15 AM", logoutTime: "—", status: "Office" },
  { date: "Jan 20, 2026", loginTime: "09:02 AM", logoutTime: "06:30 PM", status: "Office" },
  { date: "Jan 17, 2026", loginTime: "08:45 AM", logoutTime: "05:45 PM", status: "WFH" },
  { date: "Jan 16, 2026", loginTime: "09:30 AM", logoutTime: "06:15 PM", status: "Office" },
  { date: "Jan 15, 2026", loginTime: "—", logoutTime: "—", status: "Leave" },
  { date: "Jan 14, 2026", loginTime: "09:00 AM", logoutTime: "06:00 PM", status: "Office" },
  { date: "Jan 13, 2026", loginTime: "08:55 AM", logoutTime: "05:30 PM", status: "WFH" },
]

export default function AttendancePage() {
  const [currentStatus, setCurrentStatus] = useState<Status>("Available")
  const [isLoggedIn, setIsLoggedIn] = useState(true)

  const handleStatusChange = (status: Status) => {
    setCurrentStatus(status)
  }

  const handleLogin = () => {
    setIsLoggedIn(true)
    setCurrentStatus("Available")
  }

  const handleLogout = () => {
    setIsLoggedIn(false)
    setCurrentStatus("Offline")
  }

  return (
    <div className="p-6 lg:p-8 relative z-10">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-100">Availability & Attendance</h1>
        <p className="mt-1 text-slate-400">
          Manage your status and view attendance history
        </p>
      </div>

      {/* Status and Login Section */}
      <div className="mb-8 grid gap-6 lg:grid-cols-2">
        {/* Availability Status */}
        <Card className="border-0 shadow-lg bg-gradient-to-br from-blue-100/20 to-blue-50/10 border border-blue-200/30 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-slate-100">Availability Status</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-3">
              {(["Available", "Idle", "Offline"] as Status[]).map((status) => {
                const colors = statusColors[status]
                return (
                  <button
                    key={status}
                    onClick={() => handleStatusChange(status)}
                    disabled={!isLoggedIn && status !== "Offline"}
                    className={cn(
                      "flex items-center gap-2 rounded-full px-5 py-2.5 font-bold transition-all",
                      currentStatus === status
                        ? `${colors.bg} ${colors.text} ring-2 ring-offset-2 ring-offset-slate-900 ring-current`
                        : "bg-slate-700/40 text-slate-300 hover:bg-slate-700/60 border border-slate-600/50",
                      !isLoggedIn && status !== "Offline" && "cursor-not-allowed opacity-50"
                    )}
                  >
                    <Circle className={cn("h-3 w-3 fill-current", colors.text)} />
                    {status}
                  </button>
                )
              })}
            </div>

            <div className="mt-6 rounded-xl bg-gradient-to-br from-blue-100/15 to-blue-50/10 border border-blue-200/30 p-4">
              <p className="text-sm text-slate-400 font-bold">Current Status</p>
              <div className="mt-2 flex items-center gap-2">
                <Circle
                  className={cn(
                    "h-4 w-4 fill-current",
                    statusColors[currentStatus].text
                  )}
                />
                <span className="text-lg font-bold text-slate-100">
                  {currentStatus}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Login/Logout */}
        <Card className="border-0 shadow-lg bg-gradient-to-br from-blue-100/20 to-blue-50/10 border border-blue-200/30 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-slate-100">Session Control</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex gap-4">
              <Button
                onClick={handleLogin}
                disabled={isLoggedIn}
                className="flex-1 gap-2"
                size="lg"
              >
                <LogIn className="h-5 w-5" />
                Login
              </Button>
              <Button
                onClick={handleLogout}
                disabled={!isLoggedIn}
                variant="outline"
                className="flex-1 gap-2 border-destructive/50 text-destructive hover:bg-destructive/10 bg-transparent"
                size="lg"
              >
                <LogOut className="h-5 w-5" />
                Logout
              </Button>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-4">
              <div className="rounded-xl bg-gradient-to-br from-blue-100/15 to-blue-50/10 border border-blue-200/30 p-4">
                <p className="text-sm text-slate-400 font-bold">Login Time</p>
                <p className="mt-1 text-lg font-bold text-slate-100">
                  {isLoggedIn ? "09:15 AM" : "—"}
                </p>
              </div>
              <div className="rounded-xl bg-gradient-to-br from-blue-100/15 to-blue-50/10 border border-blue-200/30 p-4">
                <p className="text-sm text-slate-400 font-bold">Session Duration</p>
                <p className="mt-1 text-lg font-bold text-slate-100">
                  {isLoggedIn ? "4h 35m" : "—"}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Attendance Table */}
      <Card className="border-0 shadow-lg bg-gradient-to-br from-blue-100/20 to-blue-50/10 border border-blue-200/30 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-slate-100">Attendance History</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="hover:bg-transparent border-b border-blue-200/30">
                  <TableHead className="font-bold text-slate-100">Date</TableHead>
                  <TableHead className="font-bold text-slate-100">Login Time</TableHead>
                  <TableHead className="font-bold text-slate-100">Logout Time</TableHead>
                  <TableHead className="font-bold text-slate-100">Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {attendanceRecords.map((record, index) => {
                  const styles = workTypeStyles[record.status]
                  const StatusIcon = styles.icon
                  return (
                    <TableRow key={index} className="border-b border-blue-200/30 hover:bg-blue-100/10">
                      <TableCell className="font-bold text-slate-100">{record.date}</TableCell>
                      <TableCell className="text-slate-200">{record.loginTime}</TableCell>
                      <TableCell className="text-slate-200">{record.logoutTime}</TableCell>
                      <TableCell>
                        <span
                          className={cn(
                            "inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-sm font-bold",
                            styles.bg,
                            styles.text
                          )}
                        >
                          <StatusIcon className="h-3.5 w-3.5" />
                          {record.status}
                        </span>
                      </TableCell>
                    </TableRow>
                  )
                })}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
