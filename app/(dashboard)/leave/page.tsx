"use client"

import React from "react"

import { useState } from "react"
import { CalendarDays, Clock, Check, X, Home, Palmtree } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { cn } from "@/lib/utils"

type RequestType = "Leave" | "WFH"
type RequestStatus = "Pending" | "Approved" | "Rejected"

interface LeaveRequest {
  id: string
  type: RequestType
  fromDate: string
  toDate: string
  reason: string
  status: RequestStatus
  appliedOn: string
}

interface TeamRequest extends LeaveRequest {
  employeeName: string
}

const statusStyles: Record<RequestStatus, { bg: string; text: string }> = {
  Pending: { bg: "bg-status-idle/10", text: "text-status-idle" },
  Approved: { bg: "bg-status-online/10", text: "text-status-online" },
  Rejected: { bg: "bg-status-leave/10", text: "text-status-leave" },
}

const myRequests: LeaveRequest[] = [
  { id: "1", type: "Leave", fromDate: "Jan 25, 2026", toDate: "Jan 26, 2026", reason: "Personal work", status: "Pending", appliedOn: "Jan 20, 2026" },
  { id: "2", type: "WFH", fromDate: "Jan 22, 2026", toDate: "Jan 22, 2026", reason: "Plumber visit", status: "Approved", appliedOn: "Jan 18, 2026" },
  { id: "3", type: "Leave", fromDate: "Jan 15, 2026", toDate: "Jan 15, 2026", reason: "Medical appointment", status: "Approved", appliedOn: "Jan 12, 2026" },
  { id: "4", type: "WFH", fromDate: "Jan 10, 2026", toDate: "Jan 10, 2026", reason: "Internet installation", status: "Rejected", appliedOn: "Jan 8, 2026" },
]

const teamRequests: TeamRequest[] = [
  { id: "1", employeeName: "Sarah Johnson", type: "Leave", fromDate: "Jan 27, 2026", toDate: "Jan 28, 2026", reason: "Family function", status: "Pending", appliedOn: "Jan 21, 2026" },
  { id: "2", employeeName: "Mike Chen", type: "WFH", fromDate: "Jan 24, 2026", toDate: "Jan 24, 2026", reason: "Doctor appointment", status: "Pending", appliedOn: "Jan 20, 2026" },
  { id: "3", employeeName: "Emily Davis", type: "Leave", fromDate: "Jan 29, 2026", toDate: "Jan 31, 2026", reason: "Vacation", status: "Pending", appliedOn: "Jan 19, 2026" },
]

export default function LeavePage() {
  const [requestType, setRequestType] = useState<RequestType>("Leave")
  const [fromDate, setFromDate] = useState("")
  const [toDate, setToDate] = useState("")
  const [reason, setReason] = useState("")
  const [activeTab, setActiveTab] = useState("apply")
  const [requests, setRequests] = useState(myRequests)
  const [teamReqs, setTeamReqs] = useState(teamRequests)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const newRequest: LeaveRequest = {
      id: String(requests.length + 1),
      type: requestType,
      fromDate: new Date(fromDate).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
      toDate: new Date(toDate).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
      reason,
      status: "Pending",
      appliedOn: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
    }
    setRequests([newRequest, ...requests])
    setFromDate("")
    setToDate("")
    setReason("")
    setActiveTab("my-requests")
  }

  const handleApprove = (id: string) => {
    setTeamReqs(teamReqs.map(req => req.id === id ? { ...req, status: "Approved" as RequestStatus } : req))
  }

  const handleReject = (id: string) => {
    setTeamReqs(teamReqs.map(req => req.id === id ? { ...req, status: "Rejected" as RequestStatus } : req))
  }

  return (
    <div className="p-6 lg:p-8 relative z-10">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-100">Leave & Work from Home</h1>
        <p className="mt-1 text-slate-400">
          Apply for leave or work from home requests
        </p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full max-w-md grid-cols-3">
          <TabsTrigger value="apply">Apply</TabsTrigger>
          <TabsTrigger value="my-requests">My Requests</TabsTrigger>
          <TabsTrigger value="team">Team Requests</TabsTrigger>
        </TabsList>

        {/* Apply Form */}
        <TabsContent value="apply">
          <Card className="max-w-2xl border-0 shadow-lg bg-gradient-to-br from-blue-100/20 to-blue-50/10 border border-blue-200/30 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-slate-100">New Request</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Request Type */}
                <div className="space-y-2">
                  <Label className="text-slate-100 font-bold">Request Type</Label>
                  <Select
                    value={requestType}
                    onValueChange={(value) => setRequestType(value as RequestType)}
                  >
                    <SelectTrigger className="h-11">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Leave">
                        <div className="flex items-center gap-2">
                          <Palmtree className="h-4 w-4 text-status-leave" />
                          Leave
                        </div>
                      </SelectItem>
                      <SelectItem value="WFH">
                        <div className="flex items-center gap-2">
                          <Home className="h-4 w-4 text-accent" />
                          Work From Home
                        </div>
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Date Range */}
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="from-date" className="text-slate-100 font-bold">From Date</Label>
                    <div className="relative">
                      <CalendarDays className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                      <Input
                        id="from-date"
                        type="date"
                        value={fromDate}
                        onChange={(e) => setFromDate(e.target.value)}
                        className="h-11 pl-10"
                        required
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="to-date" className="text-slate-100 font-bold">To Date</Label>
                    <div className="relative">
                      <CalendarDays className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                      <Input
                        id="to-date"
                        type="date"
                        value={toDate}
                        onChange={(e) => setToDate(e.target.value)}
                        className="h-11 pl-10"
                        required
                      />
                    </div>
                  </div>
                </div>

                {/* Reason */}
                <div className="space-y-2">
                  <Label htmlFor="reason" className="text-slate-100 font-bold">Reason</Label>
                  <Textarea
                    id="reason"
                    placeholder="Please provide a reason for your request..."
                    value={reason}
                    onChange={(e) => setReason(e.target.value)}
                    rows={4}
                    required
                  />
                </div>

                <Button type="submit" className="w-full sm:w-auto" size="lg">
                  Submit Request
                </Button>
              </form>
            </CardContent>
          </Card>
        </TabsContent>

        {/* My Requests */}
        <TabsContent value="my-requests">
          <Card className="border-0 shadow-lg bg-gradient-to-br from-blue-100/20 to-blue-50/10 border border-blue-200/30 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-slate-100">My Requests</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow className="hover:bg-transparent border-b border-blue-200/30">
                      <TableHead className="font-bold text-slate-100">Type</TableHead>
                      <TableHead className="font-bold text-slate-100">From</TableHead>
                      <TableHead className="font-bold text-slate-100">To</TableHead>
                      <TableHead className="font-bold text-slate-100">Reason</TableHead>
                      <TableHead className="font-bold text-slate-100">Status</TableHead>
                      <TableHead className="font-bold text-slate-100">Applied On</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {requests.map((request) => {
                      const styles = statusStyles[request.status]
                      return (
                        <TableRow key={request.id}>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              {request.type === "Leave" ? (
                                <Palmtree className="h-4 w-4 text-status-leave" />
                              ) : (
                                <Home className="h-4 w-4 text-accent" />
                              )}
                              {request.type}
                            </div>
                          </TableCell>
                          <TableCell>{request.fromDate}</TableCell>
                          <TableCell>{request.toDate}</TableCell>
                          <TableCell className="max-w-xs truncate">
                            {request.reason}
                          </TableCell>
                          <TableCell>
                            <span
                              className={cn(
                                "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium",
                                styles.bg,
                                styles.text
                              )}
                            >
                              {request.status}
                            </span>
                          </TableCell>
                          <TableCell className="text-muted-foreground">
                            {request.appliedOn}
                          </TableCell>
                        </TableRow>
                      )
                    })}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Team Requests (Manager View) */}
        <TabsContent value="team">
          <Card className="border-0 shadow-lg bg-gradient-to-br from-blue-100/20 to-blue-50/10 border border-blue-200/30 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-lg font-semibold">Team Requests</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow className="hover:bg-transparent border-b border-blue-200/30">
                      <TableHead className="font-bold text-slate-100">Employee</TableHead>
                      <TableHead className="font-bold text-slate-100">Type</TableHead>
                      <TableHead className="font-bold text-slate-100">From</TableHead>
                      <TableHead className="font-bold text-slate-100">To</TableHead>
                      <TableHead className="font-bold text-slate-100">Reason</TableHead>
                      <TableHead className="font-bold text-slate-100">Status</TableHead>
                      <TableHead className="font-bold text-slate-100">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {teamReqs.map((request) => {
                      const styles = statusStyles[request.status]
                      return (
                        <TableRow key={request.id}>
                          <TableCell className="font-medium">
                            {request.employeeName}
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              {request.type === "Leave" ? (
                                <Palmtree className="h-4 w-4 text-status-leave" />
                              ) : (
                                <Home className="h-4 w-4 text-accent" />
                              )}
                              {request.type}
                            </div>
                          </TableCell>
                          <TableCell>{request.fromDate}</TableCell>
                          <TableCell>{request.toDate}</TableCell>
                          <TableCell className="max-w-xs truncate">
                            {request.reason}
                          </TableCell>
                          <TableCell>
                            <span
                              className={cn(
                                "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium",
                                styles.bg,
                                styles.text
                              )}
                            >
                              {request.status}
                            </span>
                          </TableCell>
                          <TableCell>
                            {request.status === "Pending" && (
                              <div className="flex items-center gap-2">
                                <Button
                                  size="sm"
                                  variant="ghost"
                                  className="h-8 w-8 p-0 text-status-online hover:bg-status-online/10"
                                  onClick={() => handleApprove(request.id)}
                                >
                                  <Check className="h-4 w-4" />
                                </Button>
                                <Button
                                  size="sm"
                                  variant="ghost"
                                  className="h-8 w-8 p-0 text-status-leave hover:bg-status-leave/10"
                                  onClick={() => handleReject(request.id)}
                                >
                                  <X className="h-4 w-4" />
                                </Button>
                              </div>
                            )}
                          </TableCell>
                        </TableRow>
                      )
                    })}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>

          {/* Team Overview */}
          <Card className="mt-6 border-0 shadow-lg bg-gradient-to-br from-blue-100/20 to-blue-50/10 border border-blue-200/30 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-lg font-semibold">Team Leave Overview</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 sm:grid-cols-3">
                <div className="rounded-xl bg-gradient-to-br from-blue-100/20 to-blue-50/10 border border-blue-200/30 p-4">
                  <div className="flex items-center gap-2">
                    <Clock className="h-5 w-5 text-status-idle" />
                    <span className="text-sm text-slate-400 font-bold">Pending</span>
                  </div>
                  <p className="mt-2 text-2xl font-bold text-slate-100">
                    {teamReqs.filter((r) => r.status === "Pending").length}
                  </p>
                </div>
                <div className="rounded-xl bg-gradient-to-br from-blue-100/20 to-blue-50/10 border border-blue-200/30 p-4">
                  <div className="flex items-center gap-2">
                    <Check className="h-5 w-5 text-status-online" />
                    <span className="text-sm text-slate-400 font-bold">Approved</span>
                  </div>
                  <p className="mt-2 text-2xl font-bold text-slate-100">
                    {teamReqs.filter((r) => r.status === "Approved").length}
                  </p>
                </div>
                <div className="rounded-xl bg-gradient-to-br from-blue-100/20 to-blue-50/10 border border-blue-200/30 p-4">
                  <div className="flex items-center gap-2">
                    <X className="h-5 w-5 text-status-leave" />
                    <span className="text-sm text-slate-400 font-bold">Rejected</span>
                  </div>
                  <p className="mt-2 text-2xl font-bold text-slate-100">
                    {teamReqs.filter((r) => r.status === "Rejected").length}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
