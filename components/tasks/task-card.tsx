import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { FileText, Link2, MessageSquare, MoreHorizontal, CheckCircle2, Trash2 } from "lucide-react"
import { TaskProps } from "@/types"
import { suggestedMembers } from "@/lib/defaultStates"
import { useState } from "react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

interface TaskCardProps {
  taskInfo: TaskProps;
  onUpdate?: () => void;
}

export function TaskCard({taskInfo, onUpdate}: TaskCardProps) {
  const [isUpdating, setIsUpdating] = useState(false);
  const {
    id,
    title,
    description,
    assignees,
    date,
    priority,
    category
  } = taskInfo;

  const getNextStage = (currentStage: string): string => {
    switch (currentStage) {
      case "To do":
        return "In progress";
      case "In progress":
        return "Done";
      default:
        return currentStage;
    }
  };

  const moveToNextStage = async () => {
    if (isUpdating || category === "Done") return;
    
    setIsUpdating(true);
    try {
      const response = await fetch(`/api/tasks/edit/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ category: getNextStage(category) }),
      });

      if (!response.ok) {
        throw new Error('Failed to update task stage');
      }

      onUpdate?.();
    } catch (error) {
      console.error('Error updating task stage:', error);
    } finally {
      setIsUpdating(false);
    }
  };

  const deleteTask = async () => {
    if (isUpdating) return;
    
    setIsUpdating(true);
    try {
      const response = await fetch(`/api/tasks/delete/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete task');
      }

      onUpdate?.();
    } catch (error) {
      console.error('Error deleting task:', error);
    } finally {
      setIsUpdating(false);
    }
  };

  const priorityColor = priority === "High" ? "bg-red-100 text-red-800" : 
                       priority === "Medium" ? "bg-amber-100 text-amber-800" : 
                       "bg-blue-100 text-blue-800";

  return (
    <Card className="overflow-hidden">
      <CardHeader className="p-3 pt-0 pb-0">
        <div className="flex items-center justify-between">
          <div className="space-y-1.5 pt-3">
            <h3 className="font-medium">{title}</h3>
            <p className="text-sm text-muted-foreground line-clamp-2">{description}</p>
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button 
                variant="ghost" 
                size="icon" 
                className="h-7 w-7"
                disabled={isUpdating}
              >
                {isUpdating ? (
                  <svg className="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                ) : (
                  <MoreHorizontal className="h-4 w-4" />
                )}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem 
                onClick={moveToNextStage}
                className="gap-2"
                disabled={isUpdating || category === "Done"}
              >
                <CheckCircle2 className="h-4 w-4" />
                <span>Mark as complete</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem 
                onClick={deleteTask}
                className="gap-2 text-red-600 focus:text-red-600"
                disabled={isUpdating}
              >
                <Trash2 className="h-4 w-4" />
                <span>Delete task</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>
      
      <CardContent className="p-3 pt-2">
        <div className="mt-3">
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <div>
              <span>Assignees:</span>
            </div>
            <div className="flex -space-x-2">
              {suggestedMembers.filter(member => assignees.includes(member.id))
                .map((assignee, index) => (
                  <Avatar key={index} className="h-6 w-6 border-2 border-background">
                    <AvatarImage src={assignee.avatar} alt={assignee.name} />
                    <AvatarFallback className="text-[10px]">{assignee.initials}</AvatarFallback>
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
  );
}
