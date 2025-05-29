import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { FileText, Link2, MessageSquare, MoreHorizontal } from "lucide-react"
import { TaskProps } from "@/app/types"


interface TaskCardProps {
  taskInfo: TaskProps
}

export function TaskCard({taskInfo}: TaskCardProps) {
  const {
    category,
    title,
    description,
    assignees,
    date,
    priority,
  } = taskInfo


  const priorityColor = priority === "High" ? "bg-red-100 text-red-800" : status === "Medium" ? "bg-amber-100 text-amber-800" : "bg-blue-100 text-blue-800";

  return (
    <Card className="overflow-hidden">
      <CardHeader className="p-3 pt-0 pb-0">
        <div className="flex items-center justify-between">
          <div className="space-y-1.5 pt-3">
            <h3 className="font-medium">{title}</h3>
            <p className="text-xs text-muted-foreground line-clamp-2">{description}</p>
          </div>

          <Button variant="ghost" size="icon" className="h-7 w-7">
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="p-3 pt-2">

        <div className="mt-3">
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <div>
              <span>Assignees:</span>
            </div>
            <div className="flex -space-x-2">
              {assignees.map((assignee, index) => (
                <Avatar key={index} className="h-6 w-6 border-2 border-background">
                  <AvatarImage src="/placeholder.svg" alt={assignee} />
                  <AvatarFallback className="text-[10px]">{assignee}</AvatarFallback>
                </Avatar>
              ))}
            </div>
          </div>
        </div>
        <div className="mt-3 flex items-center justify-between">
          <div className="flex items-center gap-1 text-xs text-muted-foreground">
            <FileText className="h-3.5 w-3.5" />
            <span>{date}</span>
          </div>
          <div className={`rounded-full px-2 py-0.5 text-xs font-medium ${priorityColor}`}>{priority}</div>
        </div>
      </CardContent>

    </Card>
  )
}
