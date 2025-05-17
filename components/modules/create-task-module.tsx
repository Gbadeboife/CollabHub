"use client"

import { useState } from "react";
import { TaskProps } from "@/app/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { X } from "lucide-react";

interface CreateTaskModuleProps {
  onClose: () => void;
  wrkSpaceMembers: string[]
}

export default function CreateTaskModule({ onClose, wrkSpaceMembers }: CreateTaskModuleProps) {
  const [formData, setFormData] = useState<TaskProps>({
    category: "To do",
    status: "Not Started",
    statusColor: "text-purple-500",
    title: "",
    description: "",
    assignees: [],
    date: new Date().toLocaleDateString(),
    priority: "Medium",
    priorityColor: "bg-amber-100 text-amber-800",
    comments: 0,
  });


  const createTask = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/workspace/tasks/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ formData }),
      });

      const data = await response.json();
      if (response.ok) {
        onClose();
      }
    } catch (error) {
      console.error("Failed to create task:", error);
    }
  }

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md relative">
        <Button 
          variant="ghost" 
          size="icon" 
          className="absolute right-4 top-4"
          onClick={onClose}
        >
          <X className="h-4 w-4" />
        </Button>
        <h2 className="text-xl font-bold mb-4">Create New Task</h2>
        <form onSubmit={createTask} className="space-y-4">          <div>
            <label className="block text-sm font-medium mb-1">Title</label>
            <Input
              type="text"
              placeholder="Task title"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Category</label>
            <select
              className="w-full px-3 py-2 border rounded-md bg-white"
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              required
            >
              <option value="To do">To do</option>
              <option value="In Progress">In Progress</option>
              <option value="Done">Done</option>
            </select>
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
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Priority</label>
            <select
              className="w-full px-3 py-2 border rounded-md bg-white"
              value={formData.priority}
              onChange={(e) => {
                const priorityColors = {
                  Low: "bg-blue-100 text-blue-800",
                  Medium: "bg-amber-100 text-amber-800",
                  High: "bg-red-100 text-red-800"
                };
                setFormData({ 
                  ...formData, 
                  priority: e.target.value,
                  priorityColor: priorityColors[e.target.value as keyof typeof priorityColors]
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
              {["U1", "U2", "U3", "U4"].map((user) => (
                <label key={user} className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    className="rounded border-gray-300"
                    checked={formData.assignees.includes(user)}
                    onChange={(e) => {
                      setFormData({
                        ...formData,
                        assignees: e.target.checked
                          ? [...formData.assignees, user]
                          : formData.assignees.filter(u => u !== user)
                      });
                    }}
                  />
                  <img src="" alt="" />
                  <span className="text-sm">User {user}</span>
                </label>
              ))}
            </div>
          </div>
          <div className="flex justify-end gap-2">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">
              Create Task
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}