"use client"

import { useState } from "react"
import {
  BarChart3,
  TrendingUp,
  Users,
  Calendar,
  Download,
  Filter,
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export default function ReportsPage() {
  const [period, setPeriod] = useState("month")

  // Sample data for charts (visual only)
  const attendanceData = [
    { month: "Jan", office: 85, wfh: 10, leave: 5 },
    { month: "Feb", office: 78, wfh: 15, leave: 7 },
    { month: "Mar", office: 82, wfh: 12, leave: 6 },
    { month: "Apr", office: 80, wfh: 14, leave: 6 },
    { month: "May", office: 75, wfh: 18, leave: 7 },
    { month: "Jun", office: 70, wfh: 22, leave: 8 },
  ]

  return (
    <div className="p-6 lg:p-8 relative z-10">
      {/* Header */}
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-100">Reports & Analytics</h1>
          <p className="mt-1 text-slate-400">
            View workforce analytics and trends
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Select value={period} onValueChange={setPeriod}>
            <SelectTrigger className="w-40">
              <Filter className="mr-2 h-4 w-4" />
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="week">This Week</SelectItem>
              <SelectItem value="month">This Month</SelectItem>
              <SelectItem value="quarter">This Quarter</SelectItem>
              <SelectItem value="year">This Year</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" className="gap-2 bg-transparent">
            <Download className="h-4 w-4" />
            Export
          </Button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card className="border-0 shadow-lg bg-gradient-to-br from-blue-100/20 to-blue-50/10 border border-blue-200/30">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-400 font-bold">Avg Attendance</p>
                <p className="mt-1 text-3xl font-bold text-slate-100">94.2%</p>
                <p className="mt-1 flex items-center gap-1 text-sm text-status-online">
                  <TrendingUp className="h-3 w-3" />
                  +2.4% from last month
                </p>
              </div>
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                <BarChart3 className="h-6 w-6 text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="border-0 shadow-lg bg-gradient-to-br from-blue-100/20 to-blue-50/10 border border-blue-200/30">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-400 font-bold">WFH Requests</p>
                <p className="mt-1 text-3xl font-bold text-slate-100">156</p>
                <p className="mt-1 flex items-center gap-1 text-sm text-status-online">
                  <TrendingUp className="h-3 w-3" />
                  +12% from last month
                </p>
              </div>
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent/10">
                <Users className="h-6 w-6 text-accent" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="border-0 shadow-lg bg-gradient-to-br from-blue-100/20 to-blue-50/10 border border-blue-200/30 backdrop-blur-sm">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-400 font-bold">Leave Days</p>
                <p className="mt-1 text-3xl font-bold text-slate-100">48</p>
                <p className="mt-1 text-sm text-slate-400">
                  Across all employees
                </p>
              </div>
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-status-leave/10">
                <Calendar className="h-6 w-6 text-status-leave" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="border-0 shadow-lg bg-gradient-to-br from-blue-100/20 to-blue-50/10 border border-blue-200/30 backdrop-blur-sm">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-400 font-bold">Active Hours</p>
                <p className="mt-1 text-3xl font-bold text-slate-100">8.4h</p>
                <p className="mt-1 text-sm text-slate-400">
                  Average per employee
                </p>
              </div>
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-status-online/10">
                <TrendingUp className="h-6 w-6 text-status-online" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Attendance Trend Chart */}
        <Card className="border-0 shadow-lg bg-gradient-to-br from-blue-100/20 to-blue-50/10 border border-blue-200/30 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-slate-100">Attendance Trend</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              {/* Visual bar chart representation */}
              <div className="flex h-full items-end justify-between gap-2">
                {attendanceData.map((data) => (
                  <div key={data.month} className="flex flex-1 flex-col items-center gap-2">
                    <div className="flex w-full flex-col gap-0.5" style={{ height: "200px" }}>
                      <div
                        className="w-full rounded-t bg-status-leave"
                        style={{ height: `${data.leave * 2}px` }}
                      />
                      <div
                        className="w-full bg-accent"
                        style={{ height: `${data.wfh * 2}px` }}
                      />
                      <div
                        className="w-full rounded-b bg-primary"
                        style={{ height: `${data.office * 2}px` }}
                      />
                    </div>
                    <span className="text-xs text-muted-foreground">{data.month}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="mt-4 flex items-center justify-center gap-6">
              <div className="flex items-center gap-2">
                <div className="h-3 w-3 rounded-full bg-primary" />
                <span className="text-sm text-slate-400 font-bold">Office</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-3 w-3 rounded-full bg-accent" />
                <span className="text-sm text-slate-400 font-bold">WFH</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-3 w-3 rounded-full bg-status-leave" />
                <span className="text-sm text-slate-400 font-bold">Leave</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Department Stats */}
        <Card className="border-0 shadow-lg bg-gradient-to-br from-blue-100/20 to-blue-50/10 border border-blue-200/30 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-slate-100">Department Statistics</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { name: "Engineering", attendance: 96, employees: 24 },
                { name: "Design", attendance: 94, employees: 12 },
                { name: "Marketing", attendance: 92, employees: 8 },
                { name: "HR", attendance: 98, employees: 6 },
                { name: "Sales", attendance: 90, employees: 15 },
              ].map((dept) => (
                <div key={dept.name} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-bold text-slate-100">
                      {dept.name}
                    </span>
                    <span className="text-sm text-slate-400">
                      {dept.attendance}% ({dept.employees} employees)
                    </span>
                  </div>
                  <div className="h-2 overflow-hidden rounded-full bg-secondary/50">
                    <div
                      className="h-full rounded-full bg-primary transition-all"
                      style={{ width: `${dept.attendance}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Top Performers */}
      <Card className="mt-6 border-0 shadow-lg bg-gradient-to-br from-blue-100/20 to-blue-50/10 border border-blue-200/30 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-slate-100">Top Performers</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {[
              { name: "Sarah Johnson", score: 98, avatar: "SJ" },
              { name: "Mike Chen", score: 97, avatar: "MC" },
              { name: "Emily Davis", score: 96, avatar: "ED" },
              { name: "Alex Thompson", score: 95, avatar: "AT" },
              { name: "Rachel Kim", score: 94, avatar: "RK" },
            ].map((person, index) => (
              <div
                key={person.name}
                className="flex items-center gap-3 rounded-xl bg-gradient-to-br from-blue-100/20 to-blue-50/10 border border-blue-200/30 p-4"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-sm font-medium text-primary-foreground">
                  {person.avatar}
                </div>
                <div>
                  <p className="text-sm font-bold text-slate-100">{person.name}</p>
                  <p className="text-xs text-slate-400">
                    #{index + 1} - {person.score}% attendance
                  </p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
