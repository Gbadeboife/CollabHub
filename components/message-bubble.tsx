import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { cn } from "@/lib/utils"

interface Message {
  id: string
  senderId: string
  senderName: string
  senderAvatar: string
  content: string
  timestamp: string
  isOwn: boolean
}

interface MessageBubbleProps {
  message: Message
}

export default function MessageBubble({ message }: MessageBubbleProps) {
  return (
    <div className={cn("flex gap-3", message.isOwn ? "flex-row-reverse" : "flex-row")}>
      {!message.isOwn && (
        <Avatar className="h-8 w-8">
          <AvatarImage src={message.senderAvatar || "/placeholder.svg"} />
          <AvatarFallback>{message.senderName.substring(0, 2)}</AvatarFallback>
        </Avatar>
      )}

      <div className={cn("flex flex-col gap-1 max-w-[70%]", message.isOwn ? "items-end" : "items-start")}>
        {!message.isOwn && <span className="text-xs font-medium text-muted-foreground">{message.senderName}</span>}

        <div
          className={cn(
            "rounded-lg px-3 py-2 text-sm",
            message.isOwn ? "bg-primary text-primary-foreground" : "bg-muted",
          )}
        >
          {message.content}
        </div>

        <span className="text-xs text-muted-foreground">{message.timestamp}</span>
      </div>

      {message.isOwn && (
        <Avatar className="h-8 w-8">
          <AvatarImage src={message.senderAvatar || "/placeholder.svg"} />
          <AvatarFallback>ME</AvatarFallback>
        </Avatar>
      )}
    </div>
  )
}
