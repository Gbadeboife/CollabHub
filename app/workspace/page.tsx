"use client"

import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { useState, useEffect } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ChevronLeft, Clock, MoreHorizontal, Search, SlidersHorizontal, UserPlus } from "lucide-react"
import TaskColumn from "@/components/tasks/task-column"
import { TaskCard } from "@/components/tasks/task-card"
import { TaskProps } from "../types";
import CreateTaskModule from "@/components/modules/create-task-module";
import { useParams } from 'next/navigation';
import { suggestedMembers } from "@/lib/defaultStates";



export default function Tasks() {
  const [tasks, setTasks] = useState<TaskProps[]>([]);
  const [showCreateTask, setShowCreateTask] = useState(false);
  const [members, setMembers] = useState<null>(null);

  const params = useParams();
  const workspaceId = 1;

  const fetchTasks = async () => {
    try {
      const response = await fetch(`/api/tasks/${workspaceId}`);
      const data = await response.json();
      setTasks(data.tasks);
    } catch (error) {
      console.error("Failed to fetch tasks:", error);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const workspaceData = {
    members: [1,2,3,4]
  }

  return (
    <div className="min-h-screen bg-white flex">

      <div className="flex-1 ml-16">
        <header className="border-b">
          <div className="container flex h-10 sm:h-14 items-center px-4 md:px-6">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Button variant="ghost" size="icon" className="w-4 sm:h-8 sm:w-8">
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <span className="text-sm">Team spaces</span>
              <span>/</span>
              <span className="font-medium text-foreground">Tasks</span>
            </div>
            <div className="ml-auto flex items-center gap-2">
              <div className="relative hidden md:block">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input 
                type="search" 
                placeholder="Search" 
                className="w-64 rounded-md pl-8 md:w-80"
                onChange={(e) => {
                  const searchTerm = e.target.value.toLowerCase();
                  if (searchTerm === '') {
                  fetchTasks(); // Reset to original tasks
                  } else {
                  const filteredTasks = tasks.filter(task => 
                    task.title.toLowerCase().includes(searchTerm) || 
                    task.description.toLowerCase().includes(searchTerm)
                  );
                  setTasks(filteredTasks);
                  }
                }}
                />
              </div>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <Clock className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" className="h-8 w-8">
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
                  <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
                  <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
                </svg>
              </Button>
            </div>
          </div>
        </header>
        <main className="container px-4 py-4 sm-py-6 md:px-6">
          <div className="flex flex-col gap-4">
            <div>
              <h1 className="text-xl sm-text-2xl font-bold tracking-tight">Tasks</h1>
              <p className="text-muted-foreground text-sm">Keep track of your team's tasks all in one place.</p>
            </div>
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex -space-x-2">
                  {suggestedMembers.filter(member => workspaceData.members.includes(member.id))
                  .slice(0, 3)
                  .map((assignee, index) => (
                    <Avatar key={index} className="border-2 border-background ">
                      <AvatarImage src={assignee.avatar} alt={assignee.name}/>
                      <AvatarFallback className="text-[10px]">{assignee.initials}</AvatarFallback>
                    </Avatar>
                  ))}
                  
                  {workspaceData.members.length > 3 && (
                  <div className="flex h-9 w-9 items-center justify-center rounded-full border-2 border-background bg-muted text-xs font-medium">
                    +{workspaceData.members.length - 3}
                  </div>
                  )}
              </div>
              <div className="flex gap-2">
                {/*<Button className="gap-1">
                  <UserPlus className="h-4 w-4" />
                  Invite Member
                </Button>*/}              
                <Button variant="outline" className="gap-1">
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
                    <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" />
                    <polyline points="16 6 12 2 8 6" />
                    <line x1="12" y1="2" x2="12" y2="15" />
                  </svg>
                  Share
                </Button>
                <Button onClick={() => setShowCreateTask(true)} className="gap-1">
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
                    <line x1="12" y1="5" x2="12" y2="19" />
                    <line x1="5" y1="12" x2="19" y2="12" />
                  </svg>
                  Create Task
                </Button>
              </div>
            </div>
            {showCreateTask && (
              <CreateTaskModule
                onClose={() => setShowCreateTask(false)}
                workSpaceMembers={workspaceData.members}
                workspaceId={workspaceId}
                onTaskCreated={fetchTasks}
              />
            )}
            <Tabs defaultValue="board" className="w-full">
              <TabsContent value="board" className="mt-4">
                <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                  <TaskColumn title="To do" count={tasks?.filter(task => task.category === "To do").length} color="text-amber-500">
                    {tasks?.filter(task => task.category === "To do")?.map((task) => (
                      <TaskCard
                        key={task.title}
                        taskInfo={task}
                        onUpdate={fetchTasks}
                      />
                    ))}
                  </TaskColumn>
                  
                  <TaskColumn title="In Progress" count={tasks?.filter(task => task.category === "In progress").length} color="text-blue-500">
                    {tasks?.filter(task => task.category === "In progress")?.map((task) => (
                      <TaskCard
                        key={task.title}
                        taskInfo={task}
                        onUpdate={fetchTasks}
                      />
                    ))}
                  </TaskColumn>

                  <TaskColumn title="Done" count={tasks?.filter(task => task.category === "Done").length} color="text-pink-500">
                    {tasks?.filter(task => task.category === "Done")?.map((task) => (
                      <TaskCard
                        key={task.title}
                        taskInfo={task}
                        onUpdate={fetchTasks}
                      />
                    ))}
                  </TaskColumn>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </main>
      </div>
    </div>
  )
}
