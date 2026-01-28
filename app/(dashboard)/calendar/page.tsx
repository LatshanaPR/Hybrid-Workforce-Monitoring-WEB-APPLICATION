"use client"

import { useState } from "react"
import { ChevronLeft, ChevronRight, Building, Home, Palmtree } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

type DayType = "Office" | "WFH" | "Leave" | "Absent" | "Weekend" | "None"

interface CalendarDay {
  date: number
  type: DayType
}

const dayTypeStyles: Record<DayType, { bg: string; text: string; dot?: string }> = {
  Office: { bg: "bg-primary", text: "text-primary-foreground", dot: "bg-primary" },
  WFH: { bg: "bg-accent", text: "text-accent-foreground", dot: "bg-accent" },
  Leave: { bg: "bg-status-leave", text: "text-white", dot: "bg-status-leave" },
  Absent: { bg: "bg-muted-foreground/50", text: "text-white", dot: "bg-muted-foreground/50" },
  Weekend: { bg: "bg-secondary", text: "text-muted-foreground" },
  None: { bg: "bg-transparent", text: "text-muted-foreground" },
}

const months = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
]

const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]

// Generate sample calendar data
const generateCalendarData = (year: number, month: number): (CalendarDay | null)[] => {
  const firstDay = new Date(year, month, 1).getDay()
  const daysInMonth = new Date(year, month + 1, 0).getDate()
  const today = new Date().getDate()
  const currentMonth = new Date().getMonth()
  const currentYear = new Date().getFullYear()
  
  const days: (CalendarDay | null)[] = []
  
  // Add empty slots for days before the first day of month
  for (let i = 0; i < firstDay; i++) {
    days.push(null)
  }
  
  // Add days of the month
  for (let day = 1; day <= daysInMonth; day++) {
    const dayOfWeek = new Date(year, month, day).getDay()
    let type: DayType = "None"
    
    // Assign types based on patterns
    if (dayOfWeek === 0 || dayOfWeek === 6) {
      type = "Weekend"
    } else if (year === currentYear && month === currentMonth) {
      if (day < today) {
        // Past days - random assignment
        const rand = Math.random()
        if (rand < 0.6) type = "Office"
        else if (rand < 0.85) type = "WFH"
        else if (rand < 0.95) type = "Leave"
        else type = "Absent"
      } else if (day === today) {
        type = "Office"
      }
    } else if (month < currentMonth || (month === currentMonth && year < currentYear)) {
      // Past months
      const rand = Math.random()
      if (rand < 0.65) type = "Office"
      else if (rand < 0.9) type = "WFH"
      else if (rand < 0.97) type = "Leave"
      else type = "Absent"
    }
    
    days.push({ date: day, type })
  }
  
  return days
}

export default function CalendarPage() {
  const [currentDate, setCurrentDate] = useState(new Date(2026, 0, 21)) // Jan 21, 2026
  const [selectedDay, setSelectedDay] = useState<CalendarDay | null>(null)
  
  const year = currentDate.getFullYear()
  const month = currentDate.getMonth()
  const calendarDays = generateCalendarData(year, month)
  
  const goToPreviousMonth = () => {
    setCurrentDate(new Date(year, month - 1, 1))
    setSelectedDay(null)
  }
  
  const goToNextMonth = () => {
    setCurrentDate(new Date(year, month + 1, 1))
    setSelectedDay(null)
  }
  
  const goToToday = () => {
    setCurrentDate(new Date(2026, 0, 21))
    setSelectedDay(null)
  }
  
  return (
    <div className="p-6 lg:p-8 relative z-10">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-100">Attendance Calendar</h1>
        <p className="mt-1 text-slate-400">
          View your attendance status for each day
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Calendar */}
        <Card className="border-0 shadow-lg lg:col-span-2 bg-gradient-to-br from-blue-100/20 to-blue-50/10 border border-blue-200/30 backdrop-blur-sm">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-lg font-semibold text-slate-100">
              {months[month]} {year}
            </CardTitle>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" onClick={goToToday}>
                Today
              </Button>
              <Button variant="ghost" size="icon" onClick={goToPreviousMonth}>
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" onClick={goToNextMonth}>
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            {/* Week Days Header */}
            <div className="mb-2 grid grid-cols-7 gap-1">
              {weekDays.map((day) => (
                <div
                  key={day}
                  className="py-2 text-center text-xs font-bold uppercase text-slate-400"
                >
                  {day}
                </div>
              ))}
            </div>
            
            {/* Calendar Grid */}
            <div className="grid grid-cols-7 gap-1">
              {calendarDays.map((day, index) => {
                if (!day) {
                  return <div key={`empty-${index}`} className="aspect-square" />
                }
                
                const styles = dayTypeStyles[day.type]
                const isToday = day.date === 21 && month === 0 && year === 2026
                const isSelected = selectedDay?.date === day.date
                
                return (
                  <button
                    key={day.date}
                    onClick={() => setSelectedDay(day)}
                    className={cn(
                      "relative flex aspect-square flex-col items-center justify-center rounded-lg text-sm transition-all",
                      day.type !== "None" && day.type !== "Weekend"
                        ? `${styles.bg} ${styles.text}`
                        : "hover:bg-secondary",
                      day.type === "Weekend" && "bg-secondary/50 text-muted-foreground",
                      isToday && "ring-2 ring-primary ring-offset-2",
                      isSelected && "ring-2 ring-foreground ring-offset-2"
                    )}
                  >
                    <span className="font-medium">{day.date}</span>
                    {day.type !== "None" && day.type !== "Weekend" && (
                      <span className="mt-0.5 text-[10px] opacity-80">
                        {day.type}
                      </span>
                    )}
                  </button>
                )
              })}
            </div>
          </CardContent>
        </Card>

        {/* Legend & Stats */}
        <div className="space-y-6">
          {/* Legend */}
          <Card className="border-0 shadow-lg bg-gradient-to-br from-blue-100/20 to-blue-50/10 border border-blue-200/30 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-slate-100">Legend</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {[
                { type: "Office" as DayType, icon: Building, label: "Office Day" },
                { type: "WFH" as DayType, icon: Home, label: "Work From Home" },
                { type: "Leave" as DayType, icon: Palmtree, label: "Leave" },
                { type: "Absent" as DayType, icon: null, label: "Absent" },
              ].map(({ type, icon: Icon, label }) => {
                const styles = dayTypeStyles[type]
                return (
                  <div key={type} className="flex items-center gap-3">
                    <div
                      className={cn(
                        "flex h-8 w-8 items-center justify-center rounded-lg",
                        styles.bg
                      )}
                    >
                      {Icon && <Icon className={cn("h-4 w-4", styles.text)} />}
                    </div>
                    <span className="text-sm text-slate-100 font-bold">{label}</span>
                  </div>
                )
              })}
            </CardContent>
          </Card>

          {/* Monthly Stats */}
          <Card className="border-0 shadow-lg bg-gradient-to-br from-blue-100/20 to-blue-50/10 border border-blue-200/30 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-slate-100">This Month</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {[
                { type: "Office", count: calendarDays.filter(d => d?.type === "Office").length, color: "text-primary" },
                { type: "WFH", count: calendarDays.filter(d => d?.type === "WFH").length, color: "text-accent" },
                { type: "Leave", count: calendarDays.filter(d => d?.type === "Leave").length, color: "text-status-leave" },
                { type: "Absent", count: calendarDays.filter(d => d?.type === "Absent").length, color: "text-muted-foreground" },
              ].map(({ type, count, color }) => (
                <div
                  key={type}
                  className="flex items-center justify-between rounded-lg bg-gradient-to-br from-blue-100/20 to-blue-50/10 border border-blue-200/30 px-4 py-3"
                >
                  <span className="text-sm text-slate-400 font-bold">{type} Days</span>
                  <span className={cn("text-lg font-bold", color)}>{count}</span>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Selected Day Info */}
          {selectedDay && selectedDay.type !== "None" && selectedDay.type !== "Weekend" && (
            <Card className="border-0 shadow-lg bg-gradient-to-br from-blue-100/20 to-blue-50/10 border border-blue-200/30 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-lg font-semibold text-slate-100">
                  {months[month]} {selectedDay.date}, {year}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div
                  className={cn(
                    "flex items-center gap-3 rounded-xl p-4",
                    dayTypeStyles[selectedDay.type].bg
                  )}
                >
                  {selectedDay.type === "Office" && (
                    <Building className="h-6 w-6 text-primary-foreground" />
                  )}
                  {selectedDay.type === "WFH" && (
                    <Home className="h-6 w-6 text-accent-foreground" />
                  )}
                  {selectedDay.type === "Leave" && (
                    <Palmtree className="h-6 w-6 text-white" />
                  )}
                  <div>
                    <p
                      className={cn(
                        "font-semibold",
                        dayTypeStyles[selectedDay.type].text
                      )}
                    >
                      {selectedDay.type === "Office" && "Working from Office"}
                      {selectedDay.type === "WFH" && "Working from Home"}
                      {selectedDay.type === "Leave" && "On Leave"}
                      {selectedDay.type === "Absent" && "Absent"}
                    </p>
                    <p
                      className={cn(
                        "text-sm opacity-80",
                        dayTypeStyles[selectedDay.type].text
                      )}
                    >
                      {selectedDay.type === "Leave"
                        ? "Approved leave day"
                        : "Regular working day"}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}
