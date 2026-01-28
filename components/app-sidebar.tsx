"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState } from "react"
import {
  LayoutDashboard,
  MessageSquare,
  Clock,
  CalendarDays,
  FileText,
  Settings,
  Palmtree,
  Building2,
  LogOut,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { UserDropdown } from "./user-dropdown"

const navigation = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { name: "Chat", href: "/chat", icon: MessageSquare },
  { name: "Attendance", href: "/attendance", icon: Clock },
  { name: "Leave / WFH", href: "/leave", icon: Palmtree },
  { name: "Calendar", href: "/calendar", icon: CalendarDays },
  { name: "Reports", href: "/reports", icon: FileText },
  { name: "Admin", href: "/admin", icon: Settings },
]

interface AppSidebarProps {
  userRole?: "Employee" | "Manager" | "HR" | "Admin"
}

export function AppSidebar({ userRole: initialRole = "Employee" }: AppSidebarProps) {
  const pathname = usePathname()
  const [userRole, setUserRole] = useState(initialRole)

  const filteredNavigation = navigation.filter((item) => {
    if (item.name === "Admin" && userRole !== "Admin") {
      return false
    }
    return true
  })

  return (
    <aside className="flex h-screen w-64 flex-col bg-gradient-to-b from-sidebar/95 via-sidebar/90 to-sidebar/80 text-sidebar-foreground shadow-2xl border-r border-sidebar-border/50 backdrop-blur-xl z-20">
      {/* Logo */}
      <div className="flex h-16 items-center gap-3 border-b border-sidebar-border/50 px-4 backdrop-blur-sm">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-sidebar-primary to-sidebar-primary/80 shadow-md">
          <Building2 className="h-5 w-5 text-sidebar-primary-foreground" />
        </div>
        <div className="flex flex-col">
          <span className="text-sm font-bold text-sidebar-foreground">Cube AI</span>
          <span className="text-xs text-sidebar-foreground/70">Workforce Hub</span>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-1.5 px-3 py-6">
        {filteredNavigation.map((item) => {
          const isActive = pathname === item.href || pathname?.startsWith(item.href + "/")
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-all duration-200 group",
                isActive
                  ? "bg-sidebar-accent text-sidebar-accent-foreground shadow-md"
                  : "text-sidebar-foreground/75 hover:bg-sidebar-accent/40 hover:text-sidebar-foreground/95"
              )}
            >
              <item.icon className={cn(
                "h-5 w-5 transition-transform",
                isActive && "scale-110"
              )} />
              {item.name}
            </Link>
          )
        })}
      </nav>

      {/* User Section */}
      <div className="border-t border-sidebar-border/50 bg-sidebar/50 p-4 backdrop-blur-sm">
        <UserDropdown 
          currentRole={userRole as "Employee" | "Manager" | "HR" | "Admin"} 
          onRoleChange={(role) => setUserRole(role)}
        />
      </div>

      {/* Sign Out Button */}
      <div className="border-t border-sidebar-border/50 p-3">
        <Link
          href="/"
          className="flex w-full items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-status-leave/20 to-status-leave/10 px-4 py-3 font-medium text-status-leave transition-all hover:from-status-leave/30 hover:to-status-leave/20 hover:shadow-lg border border-status-leave/30"
        >
          <LogOut className="h-5 w-5" />
          <span>Sign Out</span>
        </Link>
      </div>
    </aside>
  )
}
