import { Button } from "@/components/ui/button"
import { MoreHorizontal, Plus } from "lucide-react"
import type { ReactNode } from "react"

interface TaskColumnProps {
  title: string
  count: number
  color: string
  children: ReactNode
  setShowCreateTask: (show: boolean) => void
}

export default function TaskColumn({ title, count, color, children, setShowCreateTask }: TaskColumnProps) {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className={`h-2 w-2 rounded-full ${color.replace("text", "bg")}`} />
          <h3 className="font-medium">{title}</h3>
          <div className="flex h-5 w-5 items-center justify-center rounded-full bg-gray-100 text-xs">{count}</div>
        </div>
        <div className="flex items-center gap-1">
          <Button variant="ghost" size="icon" className="h-7 w-7" onClick={()=>setShowCreateTask(true)}>
            <Plus className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" className="h-7 w-7">
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </div>
      </div>
      <div className="flex flex-col gap-3">{children}</div>
    </div>
  )
}
