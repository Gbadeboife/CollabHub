"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Send, MoreHorizontal } from "lucide-react"
import ChatSidebar from "@/components/chat-sidebar"
import MessageBubble from "@/components/message-bubble"
import { cn } from "@/lib/utils"
import { useWorkspace } from '@/context/workspace-context'
import { defaultChannels } from "@/lib/defaultStates"
import {custChannels} from "@/lib/defaultStates"
import { timeStamp } from "console"


interface Channel {
  id: number,
  name: string,
  icon: number,
  timestamp?: string,
  unreadCount?: number
}


interface Message {
  id: string
  userId: number
  content: string
  timestamp: string
  isOwn: boolean
}

const chats: Channel[] = [
  {
    id: 1,
    name: "Marketing Team",
    icon: 1, 
  }
]

/*

const messages: Message[] = [
  {
    id: "1",
    senderId: "alex",
    senderName: "Alex Johnson",
    senderAvatar: "/placeholder.svg",
    content:
      "Hey team! I've finished the initial design mockups for the new landing page. Would love to get your feedback.",
    timestamp: "10:30 AM",
    isOwn: false,
  },
  {
    id: "2",
    senderId: "me",
    senderName: "You",
    senderAvatar: "/placeholder.svg",
    content: "Looks fantastic! The color scheme really works well with our brand guidelines.",
    timestamp: "10:32 AM",
    isOwn: true,
  },
  {
    id: "3",
    senderId: "sarah",
    senderName: "Sarah Williams",
    senderAvatar: "/placeholder.svg",
    content: "I agree! The typography choices are spot on. Should we schedule a review meeting with the stakeholders?",
    timestamp: "10:35 AM",
    isOwn: false,
  },
  {
    id: "4",
    senderId: "me",
    senderName: "You",
    senderAvatar: "/placeholder.svg",
    content: "Great idea! I'll send out calendar invites for tomorrow afternoon.",
    timestamp: "10:36 AM",
    isOwn: true,
  },
  {
    id: "5",
    senderId: "alex",
    senderName: "Alex Johnson",
    senderAvatar: "/placeholder.svg",
    content: "Perfect! I'll prepare a presentation with all the design variations we discussed.",
    timestamp: "10:38 AM",
    isOwn: false,
  },
]*/

export default function ChatPage() {
  const [channels, setChannels] = useState<Channel[]>([])
  const [selectedChat, setSelectedChat] = useState<Channel>(chats[0])
  const [messageInput, setMessageInput] = useState("")
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)
  const { workspace, loading, error } = useWorkspace()
  const [messages, setMessages] = useState<Message[]>([])
  
  
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
                workspaceId: 1,
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
      console.log("Sending message:", messageInput)
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
          const response= await fetch(`/api/channels/${workspace?.id}`)
          const data= await response.json()
          console.log(data.channels)
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
      console.log(data.messages)
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


    console.log(selectedChat)

    
  return (
    <div className="flex h-screen bg-white">
      {/* Sidebar */}
      <div
        className={cn("border-r bg-white transition-all duration-300", isSidebarOpen ? "w-80" : "w-0 overflow-hidden")}
      >
        <ChatSidebar
          chats={channels}
          selectedChat={selectedChat}
          onSelectChat={setSelectedChat}
          onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
        />
      </div>

      {/* Main Chat Area */}
      <div className="flex flex-1 flex-col ">
        {/* Chat Header */}
        <div className="border-b bg-white px-4 py-3">
          <div className="flex items-center">
            <div className="flex items-center gap-3">
              {!isSidebarOpen && (
                <Button variant="ghost" size="icon" onClick={() => setIsSidebarOpen(true)} className="h-8 w-8">
                  <MoreHorizontal className="h-4 w-4" />
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
  )
}
