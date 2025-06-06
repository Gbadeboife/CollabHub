"use client"

import { useState } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, Plus, Settings, Menu } from "lucide-react"
import { cn } from "@/lib/utils"
import { defaultChannels } from "@/lib/defaultStates"
import {custChannels} from "@/lib/defaultStates"


interface Chat {
  id: number
  name: string
  icon: number
  timestamp?: string
  unreadCount?: number
}

interface ChatSidebarProps {
  chats: Chat[]
  selectedChat: Chat | null
  onSelectChat: (chat: Chat) => void
  onToggleSidebar: () => void
}

export default function ChatSidebar({ chats, selectedChat, onSelectChat, onToggleSidebar }: ChatSidebarProps) {
  const [searchQuery, setSearchQuery] = useState("")

  const filteredChats = chats.filter((chat) => chat.name.toLowerCase().includes(searchQuery.toLowerCase()))

  return (
    <div className="flex h-full flex-col">
      {/* Sidebar Header */}
      <div className="border-b p-4">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-xl font-bold">Messages</h1>
          <div className="flex items-center gap-1">
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <Plus className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <Settings className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" className="h-8 w-8 lg:hidden" onClick={onToggleSidebar}>
              <Menu className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Search */}
        <div className="relative">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search conversations..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-8"
          />
        </div>
      </div>

      {/* Chat List */}
      <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-200 scrollbar-track-transparent hover:scrollbar-thumb-gray-300">
        <div className="p-2">
          {filteredChats.map((chat) => {
            const matchedChannel = [...defaultChannels, ...custChannels].find(
              (channel) => channel.id === Number(chat.icon)
            ); 
            const fallbackIcon= defaultChannels[0]

            return(
              <button
                key={chat.id}
                onClick={() => {
                  onSelectChat(chat)
                  // Close sidebar on mobile when selecting a chat
                  if (window.innerWidth < 1024) {
                    onToggleSidebar()
                  }
                }}
                className={cn(
                  "w-full rounded-lg p-3 text-left transition-colors hover:bg-accent",
                  selectedChat?.id === chat.id && "bg-accent",
                )}
              >
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <div className="flex h-9 w-9 items-center justify-center rounded-md bg-muted">
                      {
                        matchedChannel ? 
                        (
                            <matchedChannel.icon/>
                          )
                          :
                          (<fallbackIcon.icon/>)
                        }
                    </div>
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <h3 className="font-medium truncate">{chat.name}</h3>
                      <span className="text-xs text-muted-foreground">{/*chat.timestamp*/}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <p className="text-sm text-muted-foreground truncate">{/*chat.lastMessage*/}</p>
                      {/*chat.unreadCount > 0 && (
                        <div className="flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs text-primary-foreground">
                          {chat.unreadCount}
                        </div>
                      )*/}
                    </div>
                  </div>
                </div>
              </button>
            )})}
        </div>
      </div>
    </div>
  )
}
