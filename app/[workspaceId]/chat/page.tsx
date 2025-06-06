"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Send, Menu } from "lucide-react"
import ChatSidebar from "@/components/chat-sidebar"
import MessageBubble from "@/components/message-bubble"
import { cn } from "@/lib/utils"
import { useWorkspace } from '@/context/workspace-context'
import { defaultChannels } from "@/lib/defaultStates"
import {custChannels} from "@/lib/defaultStates"


interface Channel {
  id: number
  name: string
  icon: number 
  isOwn?: boolean
  timestamp?: string
  unreadCount?: number
  workspaceId?: number
}

interface Message {
  id: string
  userId: number // Changed from user_id
  content: string
  timestamp: string
  isOwn: boolean // Changed from is_own
}

export default function ChatPage() {
  const [channels, setChannels] = useState<Channel[]>([])
  const [selectedChat, setSelectedChat] = useState<Channel | null>(null)
  const [messageInput, setMessageInput] = useState("")
  const [isSidebarOpen, setIsSidebarOpen] = useState(window?.innerWidth >= 1024)
  const { workspace, loading, error } = useWorkspace()
  const [messages, setMessages] = useState<Message[]>([])
  
  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsSidebarOpen(true)
      }
    }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])
  
  const handleSendMessage =  async () => {
    if (messageInput.trim()) {
      try {
            await fetch("/api/messages/send", {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                userId: 0,
                content: messageInput,
                workspaceId: workspace?.id,
                isOwn: true,
                timestamp: new Date().toLocaleTimeString('en-US', { 
                  hour: 'numeric',
                  minute: '2-digit',
                  hour12: true 
                }),
              })
            })

          fetchMessages() // Refresh messages after sending
      } catch (error) {
        console.error("Failed to fetch channels:", error)
      }
      setMessageInput("")
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  const fetchChannels = async () => {
      try {
          const response = await fetch(`/api/channels/${workspace?.id}`)
          const data = await response.json()
          setChannels(data.channels)
      } catch (error) {
        console.error("Failed to fetch channels:", error)
      }
  }

  const fetchMessages = async () => {
    try {
      const response = await fetch(`/api/messages/${workspace?.id}`)
      const data = await response.json()
      setMessages(data.messages)
    } catch (error) {
      console.error(`Failed to fetch messages for channels`, error)
    }
  }

  useEffect(() => {
    if (workspace) {
      fetchChannels() 
      fetchMessages()
    }
  }, [workspace])
  
  useEffect(() => {
    if(channels.length > 0){
      setSelectedChat(channels[0])
    }
  }, [channels])

  let matchedChannel = [...defaultChannels, ...custChannels].find(
    (channel) => channel.id === Number(selectedChat?.icon)
  ); 

  return (
    <div className="flex h-screen bg-white w-full">
      {/* Left margin for vertical nav */}
      <div className="w-16 flex-shrink-0" />

      {/* Main content */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <div
          className={cn(
            "fixed lg:relative lg:flex left-16 z-20 h-full bg-white transition-all duration-300 border-r",
            isSidebarOpen ? "w-80" : "w-0"
          )}
        >
          {isSidebarOpen && (
            <div className="w-full">
              <ChatSidebar
                chats={channels}
                selectedChat={selectedChat as any}
                onSelectChat={(chat: any) => setSelectedChat(chat)}
                onToggleSidebar={() => setIsSidebarOpen(false)}
              />
            </div>
          )}
        </div>

        {/* Main Chat Area */}
        <div className="flex flex-1 flex-col w-0">
          {/* Chat Header */}
          <div className="border-b bg-white px-4 py-3">
            <div className="flex items-center">
              <div className="flex items-center gap-3">
                {!isSidebarOpen && (
                  <Button variant="ghost" size="icon" onClick={() => setIsSidebarOpen(true)} className="h-8 w-8">
                    <Menu className="h-4 w-4" />
                  </Button>
                )}
                <Avatar className="h-10 w-10 flex items-center justify-center rounded-md bg-muted">
                  {matchedChannel && <matchedChannel.icon/>}
                </Avatar>
                <div>
                  <h2 className="font-semibold">{selectedChat?.name}</h2>
                </div>
              </div>
            </div>
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin scrollbar-thumb-gray-200 scrollbar-track-transparent hover:scrollbar-thumb-gray-300">
            {messages.map((message) => (
              <MessageBubble key={message.id} message={message} />
            ))}
          </div>

          {/* Message Input */}
          <div className="border-t bg-white p-4">
            <div className="flex items-end gap-2">
              <div className="flex-1">
                <Input
                  placeholder="Type a message..."
                  value={messageInput}
                  onChange={(e) => setMessageInput(e.target.value)}
                  onKeyPress={handleKeyPress}
                  className="min-h-[40px] resize-none"
                />
              </div>
              <Button onClick={handleSendMessage} disabled={!messageInput.trim()} className="h-10 w-10 p-0">
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
