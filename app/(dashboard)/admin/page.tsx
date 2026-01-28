"use client"

import { useState } from "react"
import { useSearchParams } from "next/navigation"
import { Suspense } from "react"
import Loading from "./loading"
import {
  UserPlus,
  Search,
  Download,
  FileSpreadsheet,
  FileText,
  Clock,
  Users,
  Shield,
  ChevronDown,
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
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
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { cn } from "@/lib/utils"

type Role = "Employee" | "Manager" | "HR" | "Admin"

interface User {
  id: string
  name: string
  email: string
  role: Role
  department: string
  status: "Active" | "Inactive"
  joinDate: string
}

interface AuditLog {
  id: string
  timestamp: string
  user: string
  action: string
  details: string
}

const roleColors: Record<Role, string> = {
  Employee: "bg-secondary text-secondary-foreground",
  Manager: "bg-accent/20 text-accent",
  HR: "bg-status-idle/20 text-status-idle",
  Admin: "bg-primary/20 text-primary",
}

const users: User[] = [
  { id: "1", name: "John Doe", email: "john@cubeai.com", role: "Admin", department: "IT", status: "Active", joinDate: "Jan 10, 2024" },
  { id: "2", name: "Sarah Johnson", email: "sarah@cubeai.com", role: "Manager", department: "Engineering", status: "Active", joinDate: "Mar 15, 2024" },
  { id: "3", name: "Mike Chen", email: "mike@cubeai.com", role: "Employee", department: "Engineering", status: "Active", joinDate: "Jun 20, 2024" },
  { id: "4", name: "Emily Davis", email: "emily@cubeai.com", role: "HR", department: "Human Resources", status: "Active", joinDate: "Feb 5, 2024" },
  { id: "5", name: "Alex Thompson", email: "alex@cubeai.com", role: "Employee", department: "Marketing", status: "Inactive", joinDate: "Jul 12, 2024" },
  { id: "6", name: "Rachel Kim", email: "rachel@cubeai.com", role: "Manager", department: "Design", status: "Active", joinDate: "Apr 8, 2024" },
]

const auditLogs: AuditLog[] = [
  { id: "1", timestamp: "Jan 21, 2026 10:45 AM", user: "John Doe", action: "User Created", details: "Created new user: Rachel Kim" },
  { id: "2", timestamp: "Jan 21, 2026 09:30 AM", user: "Emily Davis", action: "Leave Approved", details: "Approved leave request for Mike Chen" },
  { id: "3", timestamp: "Jan 20, 2026 04:15 PM", user: "Sarah Johnson", action: "Role Updated", details: "Changed role for Alex Thompson from Manager to Employee" },
  { id: "4", timestamp: "Jan 20, 2026 02:00 PM", user: "John Doe", action: "Report Generated", details: "Generated monthly attendance report" },
  { id: "5", timestamp: "Jan 19, 2026 11:20 AM", user: "Emily Davis", action: "User Deactivated", details: "Deactivated user: Alex Thompson" },
]

export default function AdminPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
  const [newUser, setNewUser] = useState({
    name: "",
    email: "",
    role: "Employee" as Role,
    department: "",
  })

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.department.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const handleCreateUser = () => {
    // Handle user creation (UI only)
    setIsCreateDialogOpen(false)
    setNewUser({ name: "", email: "", role: "Employee", department: "" })
  }

  return (
    <div className="p-6 lg:p-8 relative z-10">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-100">Admin Panel</h1>
        <p className="mt-1 text-slate-400">
          Manage users, view audit logs, and generate reports
        </p>
      </div>

      {/* Stats Cards */}
      <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card className="border-0 shadow-lg bg-gradient-to-br from-blue-100/20 to-blue-50/10 border border-blue-200/30 backdrop-blur-sm">
          <CardContent className="flex items-center gap-4 p-6">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
              <Users className="h-6 w-6 text-primary" />
            </div>
            <div>
              <p className="text-sm text-slate-400 font-bold">Total Users</p>
              <p className="text-2xl font-bold text-slate-100">{users.length}</p>
            </div>
          </CardContent>
        </Card>
        <Card className="border-0 shadow-lg bg-gradient-to-br from-blue-100/20 to-blue-50/10 border border-blue-200/30 backdrop-blur-sm">
          <CardContent className="flex items-center gap-4 p-6">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-status-online/10">
              <Users className="h-6 w-6 text-status-online" />
            </div>
            <div>
              <p className="text-sm text-slate-400 font-bold">Active Users</p>
              <p className="text-2xl font-bold text-slate-100">
                {users.filter((u) => u.status === "Active").length}
              </p>
            </div>
          </CardContent>
        </Card>
        <Card className="border-0 shadow-lg bg-gradient-to-br from-blue-100/20 to-blue-50/10 border border-blue-200/30 backdrop-blur-sm">
          <CardContent className="flex items-center gap-4 p-6">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent/10">
              <Shield className="h-6 w-6 text-accent" />
            </div>
            <div>
              <p className="text-sm text-slate-400 font-bold">Managers</p>
              <p className="text-2xl font-bold text-slate-100">
                {users.filter((u) => u.role === "Manager").length}
              </p>
            </div>
          </CardContent>
        </Card>
        <Card className="border-0 shadow-lg bg-gradient-to-br from-blue-100/20 to-blue-50/10 border border-blue-200/30 backdrop-blur-sm">
          <CardContent className="flex items-center gap-4 p-6">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-status-idle/10">
              <Clock className="h-6 w-6 text-status-idle" />
            </div>
            <div>
              <p className="text-sm text-slate-400 font-bold">Audit Logs</p>
              <p className="text-2xl font-bold text-slate-100">{auditLogs.length}</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="users" className="space-y-6">
        <TabsList className="grid w-full max-w-md grid-cols-3">
          <TabsTrigger value="users">Users</TabsTrigger>
          <TabsTrigger value="audit">Audit Logs</TabsTrigger>
          <TabsTrigger value="reports">Reports</TabsTrigger>
        </TabsList>

        {/* Users Tab */}
        <TabsContent value="users">
          <Card className="border-0 shadow-lg bg-gradient-to-br from-blue-100/20 to-blue-50/10 border border-blue-200/30 backdrop-blur-sm">
            <CardHeader className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <CardTitle className="text-lg font-semibold">User Management</CardTitle>
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    placeholder="Search users..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="h-9 w-full pl-9 sm:w-64"
                  />
                </div>
                <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
                  <DialogTrigger asChild>
                    <Button className="gap-2">
                      <UserPlus className="h-4 w-4" />
                      Create User
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Create New User</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4 pt-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">Full Name</Label>
                        <Input
                          id="name"
                          value={newUser.name}
                          onChange={(e) =>
                            setNewUser({ ...newUser, name: e.target.value })
                          }
                          placeholder="Enter full name"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                          id="email"
                          type="email"
                          value={newUser.email}
                          onChange={(e) =>
                            setNewUser({ ...newUser, email: e.target.value })
                          }
                          placeholder="user@cubeai.com"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Role</Label>
                        <Select
                          value={newUser.role}
                          onValueChange={(value) =>
                            setNewUser({ ...newUser, role: value as Role })
                          }
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Employee">Employee</SelectItem>
                            <SelectItem value="Manager">Manager</SelectItem>
                            <SelectItem value="HR">HR</SelectItem>
                            <SelectItem value="Admin">Admin</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="department">Department</Label>
                        <Input
                          id="department"
                          value={newUser.department}
                          onChange={(e) =>
                            setNewUser({ ...newUser, department: e.target.value })
                          }
                          placeholder="Enter department"
                        />
                      </div>
                      <Button onClick={handleCreateUser} className="w-full">
                        Create User
                      </Button>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow className="hover:bg-transparent border-b border-blue-200/30">
                      <TableHead className="font-bold text-slate-100">Name</TableHead>
                      <TableHead className="font-bold text-slate-100">Email</TableHead>
                      <TableHead className="font-bold text-slate-100">Role</TableHead>
                      <TableHead className="font-bold text-slate-100">Department</TableHead>
                      <TableHead className="font-bold text-slate-100">Status</TableHead>
                      <TableHead className="font-bold text-slate-100">Join Date</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredUsers.map((user) => (
                      <TableRow key={user.id}>
                        <TableCell className="font-medium">{user.name}</TableCell>
                        <TableCell className="text-muted-foreground">
                          {user.email}
                        </TableCell>
                        <TableCell>
                          <span
                            className={cn(
                              "inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium",
                              roleColors[user.role]
                            )}
                          >
                            {user.role}
                          </span>
                        </TableCell>
                        <TableCell>{user.department}</TableCell>
                        <TableCell>
                          <span
                            className={cn(
                              "inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-medium",
                              user.status === "Active"
                                ? "bg-status-online/10 text-status-online"
                                : "bg-muted text-muted-foreground"
                            )}
                          >
                            <span
                              className={cn(
                                "h-1.5 w-1.5 rounded-full",
                                user.status === "Active"
                                  ? "bg-status-online"
                                  : "bg-muted-foreground"
                              )}
                            />
                            {user.status}
                          </span>
                        </TableCell>
                        <TableCell className="text-muted-foreground">
                          {user.joinDate}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Audit Logs Tab */}
        <TabsContent value="audit">
          <Card className="border-0 shadow-lg bg-gradient-to-br from-blue-100/20 to-blue-50/10 border border-blue-200/30 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-slate-100">Audit Logs</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow className="hover:bg-transparent border-b border-blue-200/30">
                      <TableHead className="font-bold text-slate-100">Timestamp</TableHead>
                      <TableHead className="font-bold text-slate-100">User</TableHead>
                      <TableHead className="font-bold text-slate-100">Action</TableHead>
                      <TableHead className="font-bold text-slate-100">Details</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {auditLogs.map((log) => (
                      <TableRow key={log.id}>
                        <TableCell className="text-muted-foreground">
                          {log.timestamp}
                        </TableCell>
                        <TableCell className="font-medium">{log.user}</TableCell>
                        <TableCell>
                          <span className="inline-flex rounded-full bg-secondary px-2.5 py-0.5 text-xs font-medium">
                            {log.action}
                          </span>
                        </TableCell>
                        <TableCell className="max-w-sm truncate text-muted-foreground">
                          {log.details}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Reports Tab */}
        <TabsContent value="reports">
          <Card className="border-0 shadow-lg bg-gradient-to-br from-blue-100/20 to-blue-50/10 border border-blue-200/30 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-slate-100">Download Reports</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {[
                  { name: "Attendance Report", description: "Monthly attendance summary for all employees", icon: FileSpreadsheet },
                  { name: "Leave Report", description: "Leave and WFH requests summary", icon: FileText },
                  { name: "User Report", description: "Complete list of all users and roles", icon: Users },
                ].map((report) => (
                  <Card key={report.name} className="border border-blue-200/30 bg-gradient-to-br from-blue-100/20 to-blue-50/10">
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                          {report.icon && <report.icon className="h-6 w-6 text-primary" />}
                        </div>
                        <div className="flex-1">
                          <h3 className="font-bold text-slate-100">{report.name}</h3>
                          <p className="mt-1 text-sm text-slate-400">
                            {report.description}
                          </p>
                        </div>
                      </div>
                      <div className="mt-4">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="outline" className="w-full gap-2 bg-transparent">
                              <Download className="h-4 w-4" />
                              Download
                              <ChevronDown className="ml-auto h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end" className="w-32">
                            <DropdownMenuItem className="gap-2">
                              <FileSpreadsheet className="h-4 w-4" />
                              Excel
                            </DropdownMenuItem>
                            <DropdownMenuItem className="gap-2">
                              <FileText className="h-4 w-4" />
                              PDF
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
