"use client"

import { useState } from "react";
import { TaskProps } from "@/app/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CalendarIcon, X, Check } from "lucide-react";
import { suggestedMembers } from "@/lib/defaultStates";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Checkbox } from "@/components/ui/checkbox";



interface CreateTaskModuleProps {
  onClose: () => void;
  workSpaceMembers: number[];
  workspaceId?: number;
  onTaskCreated?: () => void;
}

export default function CreateTaskModule({ onClose, workSpaceMembers, workspaceId, onTaskCreated }: CreateTaskModuleProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<TaskProps>({
    category: "To do",
    title: "",
    description: "",
    assignees: [],
    date: new Date().toLocaleDateString(),
    priority: "Medium",
  });

  const createTask = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    console.log("Form Data:", formData);
    try {
      const response = await fetch(`/api/tasks/create/${workspaceId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify( formData ), 
      });

      const data = await response.json();
      if (response.ok && data.task) {
        onTaskCreated?.();
        onClose();
      } else {
        console.error("Failed to create task:", data.error);
        // Here you could also set an error state and show it to the user
      }
    } catch (error) {
      console.error("Failed to create task:", error);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg w-full max-w-md relative flex flex-col max-h-[90vh]">
        <div className="p-6 pb-4 border-b">
          <Button 
            variant="ghost" 
            size="icon" 
            className="absolute right-4 top-4"
            onClick={onClose}
          >
            <X className="h-4 w-4" />
          </Button>
          <h2 className="text-xl font-bold">Create New Task</h2>
        </div>        
        <div className="p-6 overflow-y-auto flex-1 scrollbar-thin scrollbar-thumb-gray-200 hover:scrollbar-thumb-gray-300 scrollbar-track-transparent">
          <form onSubmit={createTask} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Title</label>
              <Input
                type="text"
                placeholder="Task title"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                required
                maxLength={50}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Description</label>
              <textarea
                className="w-full px-3 py-2 border rounded-md bg-white"
                rows={3}
                placeholder="Task description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                required
                maxLength={250}
              />
            </div>            <div>
              <label className="block text-sm font-medium mb-1">Priority</label>
              <select
                className="w-full px-3 py-2 border rounded-md bg-white"
                value={formData.priority}
                onChange={(e) => {
                  setFormData({ 
                    ...formData, 
                    priority: e.target.value,
                  });
                }}
              >
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Assignees</label>
              <div className="space-y-2">
                {
                workSpaceMembers.map((member) => {
                  const currentMember = suggestedMembers.find((m) => m.id === member);
                  console.log("Current Member:", currentMember);
                  return(                  <div key={member} className="flex items-center space-x-2">
                    <Checkbox
                      id={`member-${member}`}
                      checked={formData.assignees.includes(member)}
                      onCheckedChange={(checked) => {
                        setFormData({
                          ...formData,
                          assignees: checked
                            ? [...formData.assignees, member]
                            : formData.assignees.filter(u => u !== member)
                        });
                      }}
                    />
                    <label
                      htmlFor={`member-${member}`}
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      {currentMember?.name}
                    </label>
                  </div>
                  )
              })}
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Due Date</label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-full justify-start text-left font-normal"
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {formData.date}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={new Date(formData.date)}
                    onSelect={(date) => date && setFormData({ ...formData, date: date.toLocaleDateString() })}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
            <div className="flex justify-end gap-2">
              <Button type="button" variant="outline" onClick={onClose}>
                Cancel
              </Button>              
              <Button 
                type="submit" 
                disabled={!formData.title || !formData.description || !formData.assignees.length || isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <svg
                      className="animate-spin -ml-1 mr-3 h-4 w-4 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Creating...
                  </>
                ) : (
                  "Create Task"
                )}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}