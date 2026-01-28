"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuCheckboxItem,
} from "@/components/ui/dropdown-menu"
import { LogOut, Shield, Zap } from "lucide-react"

interface UserDropdownProps {
  currentRole: "Employee" | "Manager" | "HR" | "Admin"
  onRoleChange: (role: "Employee" | "Manager" | "HR" | "Admin") => void
}

export function UserDropdown({ currentRole, onRoleChange }: UserDropdownProps) {
  const router = useRouter()
  const [open, setOpen] = useState(false)

  const roles = ["Employee", "Manager", "HR", "Admin"] as const

  const handleSignOut = () => {
    router.push("/")
    setOpen(false)
  }

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <div className="cursor-pointer">
        <div className="flex items-center gap-3 rounded-xl bg-sidebar-accent/30 p-3 transition-all hover:bg-sidebar-accent/50">
          <div className="relative">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-sidebar-primary to-sidebar-accent text-sm font-bold text-sidebar-primary-foreground shadow-md">
              JD
            </div>
            <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-sidebar bg-status-online shadow-sm" />
          </div>
          <div className="flex flex-col min-w-0 flex-1">
            <span className="text-sm font-semibold text-sidebar-foreground truncate">John Doe</span>
            <span className="text-xs text-sidebar-foreground/70">{currentRole}</span>
          </div>
          <div className="text-sidebar-foreground/60">▼</div>
        </div>
      </div>
      
      <DropdownMenuContent 
        align="end" 
        className="w-56 bg-sidebar border-sidebar-border/50"
      >
        <DropdownMenuLabel className="text-sidebar-foreground">Switch Role</DropdownMenuLabel>
        <DropdownMenuSeparator className="bg-sidebar-border/30" />
        
        {roles.map((role) => (
          <DropdownMenuCheckboxItem
            key={role}
            checked={currentRole === role}
            onCheckedChange={() => {
              onRoleChange(role)
              setOpen(false)
            }}
            className="text-sidebar-foreground hover:bg-sidebar-accent/40 cursor-pointer"
          >
            <div className="flex items-center gap-2">
              {role === "Admin" ? (
                <Shield className="h-4 w-4 text-status-leave" />
              ) : role === "HR" ? (
                <Zap className="h-4 w-4 text-status-idle" />
              ) : (
                <div className="h-4 w-4 rounded-full bg-status-online" />
              )}
              <span className="capitalize">{role}</span>
            </div>
          </DropdownMenuCheckboxItem>
        ))}
        
        <DropdownMenuSeparator className="bg-sidebar-border/30" />
        <DropdownMenuItem 
          onClick={handleSignOut}
          className="text-status-leave hover:bg-status-leave/20 cursor-pointer flex items-center gap-2"
        >
          <LogOut className="h-4 w-4" />
          <span>Sign Out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
