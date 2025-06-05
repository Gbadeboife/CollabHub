import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { cn } from "@/lib/utils"
import { suggestedMembers } from "@/lib/defaultStates"


interface Message {
  id: string
  user_id: number
  content: string
  timestamp: string
  is_own: boolean
}

interface MessageBubbleProps {
  message: Message
}

export default function MessageBubble({ message }: MessageBubbleProps) {
  return (
    <div className={cn("flex gap-3", message.is_own ? "flex-row-reverse" : "flex-row")}>
      {!message.is_own && (
        <Avatar className="h-8 w-8">
          <AvatarImage src={suggestedMembers.find(m => m.id === message.user_id)?.avatar} />
          <AvatarFallback>{suggestedMembers.find(m => m.id === message.user_id)?.name.substring(0, 2)}</AvatarFallback>
        </Avatar>
      )}

      <div className={cn("flex flex-col gap-1 max-w-[70%]", message.is_own ? "items-end" : "items-start")}>
        {!message.is_own && <span className="text-xs font-medium text-muted-foreground">{suggestedMembers.find(m => m.id === message.user_id)?.name}</span>}

        <div
          className={cn(
            "rounded-lg px-3 py-2 text-sm",
            message.is_own ? "bg-primary text-primary-foreground" : "bg-muted",
          )}
        >
          {message.content}
        </div>

        <span className="text-xs text-muted-foreground">{message.timestamp}</span>
      </div>

      {message.is_own && (
        <Avatar className="h-8 w-8">
          <AvatarImage src={suggestedMembers.find(m => m.id === message.user_id)?.avatar} />
          <AvatarFallback>ME</AvatarFallback>
        </Avatar>
      )}
    </div>
  )
}
