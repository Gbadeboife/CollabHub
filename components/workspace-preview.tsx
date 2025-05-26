"use client"

import { useState, useEffect } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Users } from "lucide-react"

interface WorkspacePreviewProps {
  iconSrc?: string
  name?: string
  description?: string
  members?: string[]
  channels?: string[]
}

export default function WorkspacePreview({
  iconSrc = "/icons/workspace-icon-1.png",
  name = "Marketing Team",
  description = "Collaborate on marketing campaigns and strategies",
  members,
  channels
}: WorkspacePreviewProps) {
  // In a real app, this would be connected to the form state
  const [icon, setIcon] = useState(iconSrc)

  // Listen for changes to iconSrc prop
  useEffect(() => {
    setIcon(iconSrc)
  }, [iconSrc])

  return (
    <div className="rounded-lg border bg-card p-4">
      <div className="flex flex-col items-center space-y-3 text-center">
        <Avatar className="h-16 w-16">
          <AvatarImage src={icon || "/placeholder.svg"} alt="Workspace icon" />
          <AvatarFallback className="bg-primary text-primary-foreground text-xl">
            {name.substring(0, 2).toUpperCase()}
          </AvatarFallback>
        </Avatar>
        <div>
          <h3 className="text-lg font-semibold">{name}</h3>
          <p className="text-sm text-muted-foreground">{description}</p>
        </div>
      </div>

      <div className="mt-6 space-y-4">
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-sm font-medium">
            <Users className="h-4 w-4" />
            <span>Members</span>
          </div>
          <div className="flex -space-x-2">
            {
              members?.map((member, index) => (
                <Avatar
                  key={index}
                  className="border-2 border-background h-7 w-7"
                >
                  <AvatarImage src={member} alt={`Member ${index + 1}`} />
                  <AvatarFallback className="text-xs">
                    {member}
                  </AvatarFallback>
                </Avatar>
              ))
            }

          </div>
        </div>

        <div className="space-y-2">
          <div className="flex items-center gap-2 text-sm font-medium">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-4 w-4"
            >
              <path d="M8 3H5a2 2 0 0 0-2 2v3" />
              <path d="M21 8V5a2 2 0 0 0-2-2h-3" />
              <path d="M3 16v3a2 2 0 0 0 2 2h3" />
              <path d="M16 21h3a2 2 0 0 0 2-2v-3" />
            </svg>
            <span>Channels</span>
          </div>
          <div className="space-y-1">
            {channels?.map((channel, index) => (
              <div
                key={index}
                className="flex items-center gap-2 rounded-md px-2 py-1 text-sm hover:bg-accent"
              >
                <span className="text-muted-foreground">#</span>
                <span>{channel}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-md bg-muted p-3">
          <div className="text-xs text-muted-foreground">Preview Only</div>
          <div className="mt-2 text-sm">This is a preview of how your workspace will look once created.</div>
        </div>
      </div>
    </div>
  )
}
