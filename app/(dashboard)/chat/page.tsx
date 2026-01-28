"use client"

import { useState } from "react"
import { useSearchParams } from "next/navigation"
import { Suspense } from "react"
import Loading from "./loading"
import {
  Search,
  Hash,
  Send,
  Pin,
  MoreHorizontal,
  ChevronDown,
  ChevronRight,
} from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { cn } from "@/lib/utils"

type UserStatus = "online" | "idle" | "offline"

interface ChatUser {
  id: string
  name: string
  avatar: string
  status: UserStatus
  lastMessage?: string
  unread?: number
}

interface Channel {
  id: string
  name: string
  unread?: number
}

interface Message {
  id: string
  sender: string
  avatar: string
  content: string
  timestamp: string
  isOwn?: boolean
}

const statusColors: Record<UserStatus, string> = {
  online: "bg-status-online",
  idle: "bg-status-idle",
  offline: "bg-status-offline",
}

const chatUsers: ChatUser[] = [
  { id: "1", name: "Sarah Johnson", avatar: "SJ", status: "online", lastMessage: "Thanks for the update!", unread: 2 },
  { id: "2", name: "Mike Chen", avatar: "MC", status: "online", lastMessage: "Can we discuss the project?" },
  { id: "3", name: "Emily Davis", avatar: "ED", status: "idle", lastMessage: "I'll review it today" },
  { id: "4", name: "Alex Thompson", avatar: "AT", status: "offline", lastMessage: "Sounds good!" },
  { id: "5", name: "Rachel Kim", avatar: "RK", status: "online", lastMessage: "Meeting at 3 PM" },
]

const channels: Channel[] = [
  { id: "1", name: "general", unread: 5 },
  { id: "2", name: "engineering" },
  { id: "3", name: "design" },
  { id: "4", name: "announcements", unread: 1 },
]

const teams = [
  { id: "1", name: "Product Team" },
  { id: "2", name: "Engineering" },
  { id: "3", name: "Marketing" },
]

const messages: Message[] = [
  { id: "1", sender: "Sarah Johnson", avatar: "SJ", content: "Hi everyone! I've just pushed the latest updates to the staging environment.", timestamp: "10:30 AM" },
  { id: "2", sender: "Mike Chen", avatar: "MC", content: "Great work! I'll start testing it right away.", timestamp: "10:32 AM" },
  { id: "3", sender: "You", avatar: "JD", content: "Thanks Sarah! Let me know if you need any help with the QA process.", timestamp: "10:35 AM", isOwn: true },
  { id: "4", sender: "Sarah Johnson", avatar: "SJ", content: "Sure thing! I might need some help with the edge cases. Can we sync up after lunch?", timestamp: "10:38 AM" },
  { id: "5", sender: "Emily Davis", avatar: "ED", content: "I can join too. I've been working on similar features.", timestamp: "10:40 AM" },
]

const pinnedMessages = [
  { id: "1", content: "Q1 Goals document updated - please review by EOD Friday", sender: "HR Team" },
  { id: "2", content: "Office will be closed next Monday for maintenance", sender: "Admin" },
]

export default function ChatPage() {
  const searchParams = useSearchParams()
  const [selectedChat, setSelectedChat] = useState<ChatUser | null>(chatUsers[0])
  const [messageInput, setMessageInput] = useState("")
  const [expandedSections, setExpandedSections] = useState({
    chats: true,
    channels: true,
    teams: true,
  })

  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections((prev) => ({ ...prev, [section]: !prev[section] }))
  }

  return (
    <Suspense fallback={<Loading />}>
      <div className="flex h-full">
        {/* Left Panel - Chat List */}
        <div className="flex w-72 flex-col border-r border-blue-200/30 bg-gradient-to-b from-blue-100/20 to-blue-50/10 relative z-10">
          {/* Search */}
          <div className="p-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search chats..."
                className="h-9 pl-9 bg-secondary/50"
              />
            </div>
          </div>

          <ScrollArea className="flex-1">
            {/* Chats Section */}
            <div className="px-2">
              <button
                onClick={() => toggleSection("chats")}
                className="flex w-full items-center gap-1 px-2 py-2 text-xs font-bold uppercase tracking-wider text-slate-400 hover:text-slate-200"
              >
                {expandedSections.chats ? (
                  <ChevronDown className="h-3 w-3" />
                ) : (
                  <ChevronRight className="h-3 w-3" />
                )}
                Chats
              </button>
              {expandedSections.chats && (
                <div className="space-y-0.5">
                  {chatUsers.map((user) => (
                    <button
                      key={user.id}
                      onClick={() => setSelectedChat(user)}
                      className={cn(
                        "flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left transition-colors text-slate-100",
                        selectedChat?.id === user.id
                          ? "bg-blue-200/20 text-slate-100 border border-blue-300/30"
                          : "hover:bg-blue-100/15"
                      )}
                    >
                      <div className="relative">
                        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary text-xs font-medium text-primary-foreground">
                          {user.avatar}
                        </div>
                        <span
                          className={cn(
                            "absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full border-2 border-card",
                            statusColors[user.status]
                          )}
                        />
                      </div>
                      <div className="flex-1 overflow-hidden">
                        <div className="flex items-center justify-between">
                          <p className="truncate text-sm font-medium">{user.name}</p>
                          {user.unread && (
                            <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-primary px-1.5 text-xs font-medium text-primary-foreground">
                              {user.unread}
                            </span>
                          )}
                        </div>
                        <p className="truncate text-xs text-muted-foreground">
                          {user.lastMessage}
                        </p>
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Channels Section */}
            <div className="mt-4 px-2">
              <button
                onClick={() => toggleSection("channels")}
                className="flex w-full items-center gap-1 px-2 py-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground hover:text-foreground"
              >
                {expandedSections.channels ? (
                  <ChevronDown className="h-3 w-3" />
                ) : (
                  <ChevronRight className="h-3 w-3" />
                )}
                Channels
              </button>
              {expandedSections.channels && (
                <div className="space-y-0.5">
                  {channels.map((channel) => (
                    <button
                      key={channel.id}
                      className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-sm transition-colors hover:bg-secondary"
                    >
                      <Hash className="h-4 w-4 text-muted-foreground" />
                      <span className="flex-1">{channel.name}</span>
                      {channel.unread && (
                        <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-primary px-1.5 text-xs font-medium text-primary-foreground">
                          {channel.unread}
                        </span>
                      )}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Teams Section */}
            <div className="mt-4 px-2 pb-4">
              <button
                onClick={() => toggleSection("teams")}
                className="flex w-full items-center gap-1 px-2 py-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground hover:text-foreground"
              >
                {expandedSections.teams ? (
                  <ChevronDown className="h-3 w-3" />
                ) : (
                  <ChevronRight className="h-3 w-3" />
                )}
                Teams
              </button>
              {expandedSections.teams && (
                <div className="space-y-0.5">
                  {teams.map((team) => (
                    <button
                      key={team.id}
                      className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-sm transition-colors hover:bg-primary/20 text-card-foreground"
                    >
                      <div className="flex h-6 w-6 items-center justify-center rounded bg-gradient-to-br from-primary to-accent text-xs font-medium text-white shadow-md">
                        {team.name.charAt(0)}
                      </div>
                      <span className="font-medium">{team.name}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </ScrollArea>
        </div>

        {/* Middle Panel - Chat Messages */}
        <div className="flex flex-1 flex-col">
          {selectedChat && (
            <>
              {/* Chat Header */}
              <div className="flex items-center justify-between border-b border-blue-200/30 bg-gradient-to-br from-blue-100/20 to-blue-50/10 backdrop-blur-sm px-6 py-4">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-sm font-medium text-primary-foreground">
                      {selectedChat.avatar}
                    </div>
                    <span
                      className={cn(
                        "absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-card",
                        statusColors[selectedChat.status]
                      )}
                    />
                  </div>
                  <div>
                    <h2 className="font-semibold text-slate-100">
                      {selectedChat.name}
                    </h2>
                    <p className="text-xs capitalize text-slate-400">
                      {selectedChat.status}
                    </p>
                  </div>
                </div>
                <Button variant="ghost" size="icon">
                  <MoreHorizontal className="h-5 w-5" />
                </Button>
              </div>

              {/* Messages */}
              <ScrollArea className="flex-1 p-6">
                <div className="space-y-4">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={cn(
                        "flex gap-3",
                        message.isOwn && "flex-row-reverse"
                      )}
                    >
                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary text-xs font-medium text-primary-foreground">
                        {message.avatar}
                      </div>
                      <div
                        className={cn(
                          "max-w-md",
                          message.isOwn && "text-right"
                        )}
                      >
                        <div
                          className={cn(
                            "flex items-center gap-2",
                            message.isOwn && "flex-row-reverse"
                          )}
                        >
                          <span className="text-sm font-bold text-slate-100">
                            {message.sender}
                          </span>
                          <span className="text-xs text-muted-foreground">
                            {message.timestamp}
                          </span>
                        </div>
                        <div
                          className={cn(
                            "mt-1 inline-block rounded-2xl px-4 py-2 text-sm",
                            message.isOwn
                              ? "bg-primary text-primary-foreground"
                              : "bg-secondary text-secondary-foreground"
                          )}
                        >
                          {message.content}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>

              {/* Message Input */}
              <div className="border-t border-blue-200/30 bg-gradient-to-br from-blue-100/20 to-blue-50/10 backdrop-blur-sm p-4">
                <div className="flex items-center gap-3">
                  <Input
                    placeholder="Type a message..."
                    value={messageInput}
                    onChange={(e) => setMessageInput(e.target.value)}
                    className="flex-1"
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && !e.shiftKey) {
                        e.preventDefault()
                        // Handle send
                        setMessageInput("")
                      }
                    }}
                  />
                  <Button size="icon" className="shrink-0">
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </>
          )}
        </div>

        {/* Right Panel - Announcements */}
        <div className="hidden w-72 flex-col border-l border-blue-200/30 bg-gradient-to-b from-blue-100/20 to-blue-50/10 backdrop-blur-sm xl:flex">
          <div className="border-b border-blue-200/30 p-4">
            <h3 className="flex items-center gap-2 font-semibold text-foreground">
              <Pin className="h-4 w-4 text-primary" />
              Pinned Messages
            </h3>
          </div>
          <ScrollArea className="flex-1 p-4">
            <div className="space-y-3">
              {pinnedMessages.map((msg) => (
                <div
                  key={msg.id}
                  className="rounded-lg border border-blue-200/30 bg-gradient-to-br from-blue-100/15 to-blue-50/10 p-3"
                >
                  <p className="text-sm text-foreground">{msg.content}</p>
                  <p className="mt-2 text-xs text-muted-foreground">
                    — {msg.sender}
                  </p>
                </div>
              ))}
            </div>
          </ScrollArea>
        </div>
      </div>
    </Suspense>
  )
}
