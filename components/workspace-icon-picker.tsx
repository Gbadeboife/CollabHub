"use client"

import { useState } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"

const PREDEFINED_ICONS = [
  {
    id: "icon-1",
    src: "/icons/workspace-icon-1.png",
    alt: "Abstract colorful shapes",
  },
  {
    id: "icon-2",
    src: "/icons/workspace-icon-2.png",
    alt: "Mountain landscape",
  },
  {
    id: "icon-3",
    src: "/icons/workspace-icon-3.png",
    alt: "Geometric pattern",
  },
  {
    id: "icon-4",
    src: "/icons/workspace-icon-4.png",
    alt: "Team collaboration",
  },
  {
    id: "icon-5",
    src: "/icons/workspace-icon-5.png",
    alt: "Project management",
  },
]

interface WorkspaceIconPickerProps {
  onSelectIcon: (iconSrc: string) => void
  defaultIcon?: string
  workspaceName?: string
}

export default function WorkspaceIconPicker({
  onSelectIcon,
  defaultIcon = "",
  workspaceName = "WS",
}: WorkspaceIconPickerProps) {
  const [selectedIcon, setSelectedIcon] = useState(defaultIcon || PREDEFINED_ICONS[0].src)

  const handleSelectIcon = (iconSrc: string) => {
    setSelectedIcon(iconSrc)
    onSelectIcon(iconSrc)
  }

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label>Workspace Icon</Label>
        <div className="flex items-center gap-4">
          <Avatar className="h-16 w-16">
            <AvatarImage src={selectedIcon || "/placeholder.svg"} alt="Selected workspace icon" />
            <AvatarFallback className="bg-primary text-primary-foreground text-xl">
              {workspaceName.substring(0, 2).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div>
            <p className="text-sm text-muted-foreground">Selected workspace icon</p>
          </div>
        </div>
      </div>

      <div>
        <Label className="mb-2 block">Choose an icon</Label>
        <div className="grid grid-cols-5 gap-2 sm:gap-4">
          {PREDEFINED_ICONS.map((icon) => (
            <button
              key={icon.id}
              type="button"
              className={cn(
                "flex aspect-square items-center justify-center rounded-md border-2 p-1 transition-all hover:bg-accent",
                selectedIcon === icon.src ? "border-primary" : "border-transparent",
              )}
              onClick={() => handleSelectIcon(icon.src)}
            >
              <Avatar className="h-full w-full">
                <AvatarImage src={icon.src || "/placeholder.svg"} alt={icon.alt} />
                <AvatarFallback className="bg-muted text-muted-foreground">{icon.id.slice(-1)}</AvatarFallback>
              </Avatar>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
