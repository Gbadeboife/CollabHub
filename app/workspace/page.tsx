import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ChevronLeft, Clock, MoreHorizontal, Search, SlidersHorizontal, UserPlus } from "lucide-react"
import TaskColumn from "@/components/tasks/task-column"
import { TaskCard } from "@/components/tasks/task-card"


export default async function Workspace() {
  /*const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/sign-in");
  }*/

    const taskCardInfo = {
      status: "In Research",
      statusColor: "text-amber-500",
      title: "Social Media Campaign Planning",
      description: "Develop a social media campaign for the new product launch",
      assignees: ["U3", "U4"],
      date: "30 Mar 2023",
      priority: "High",
      priorityColor: "bg-red-100 text-red-800",
      comments: 8,
      links: 1,
      completion:"2/3"
    }


  return (
    <div className="min-h-screen bg-white">
      <header className="border-b">
        <div className="container flex h-14 items-center px-4 md:px-6">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <span>Team spaces</span>
            <span>/</span>
            <span className="font-medium text-foreground">Tasks</span>
          </div>
          <div className="ml-auto flex items-center gap-2">
            <div className="relative hidden md:block">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input type="search" placeholder="Search" className="w-64 rounded-md pl-8 md:w-80" />
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
      <main className="container px-4 py-6 md:px-6">
        <div className="flex flex-col gap-4">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Tasks</h1>
            <p className="text-muted-foreground">Keep track of your team's tasks all in one place.</p>
          </div>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex -space-x-2">
              <Avatar className="border-2 border-background">
                <AvatarImage src="/placeholder.svg" alt="User" />
                <AvatarFallback>U1</AvatarFallback>
              </Avatar>
              <Avatar className="border-2 border-background">
                <AvatarImage src="/placeholder.svg" alt="User" />
                <AvatarFallback>U2</AvatarFallback>
              </Avatar>
              <Avatar className="border-2 border-background">
                <AvatarImage src="/placeholder.svg" alt="User" />
                <AvatarFallback>U3</AvatarFallback>
              </Avatar>
              <Avatar className="border-2 border-background">
                <AvatarImage src="/placeholder.svg" alt="User" />
                <AvatarFallback>U4</AvatarFallback>
              </Avatar>
              <div className="flex h-9 w-9 items-center justify-center rounded-full border-2 border-background bg-muted text-xs font-medium">
                +2
              </div>
            </div>
            <div className="flex gap-2">
              <Button className="gap-1">
                <UserPlus className="h-4 w-4" />
                Invite Member
              </Button>
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
            </div>
          </div>
          <Tabs defaultValue="board" className="w-full">
            <div className="flex items-center justify-between">
              <TabsList>
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="board" className="border-b-2 border-primary">
                  Board
                </TabsTrigger>
                <TabsTrigger value="list">List</TabsTrigger>
                <TabsTrigger value="table">Table</TabsTrigger>
                <TabsTrigger value="timeline">Timeline</TabsTrigger>
              </TabsList>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" className="h-8 gap-1">
                  <SlidersHorizontal className="h-3.5 w-3.5" />
                  <span className="hidden sm:inline-block">Filter</span>
                </Button>
                <Button variant="outline" size="sm" className="h-8 gap-1">
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
                    className="h-3.5 w-3.5"
                  >
                    <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                    <line x1="3" y1="9" x2="21" y2="9" />
                    <line x1="9" y1="21" x2="9" y2="9" />
                  </svg>
                  <span className="hidden sm:inline-block">Group by</span>
                </Button>
                <Button variant="outline" size="sm" className="h-8 gap-1">
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
                    className="h-3.5 w-3.5"
                  >
                    <line x1="12" y1="5" x2="12" y2="19" />
                    <polyline points="19 12 12 19 5 12" />
                  </svg>
                  <span className="hidden sm:inline-block">Sort</span>
                </Button>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </div>
            </div>
            <TabsContent value="board" className="mt-4">
              <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                <TaskColumn title="To do" count={4} color="text-amber-500">
                  {/*<TaskCard
                    status="Not Started"
                    statusColor="text-purple-500"
                    title="Writing an Article on AI Technology"
                    description="Write a 1000-word article discussing the latest advancements in AI"
                    assignees={["U1", "U2"]}
                    date="25 Mar 2023"
                    priority="Low"
                    priorityColor="bg-blue-100 text-blue-800"
                    comments={5}
                    links={2}
                    completion="3/3"
                  />
                  <TaskCard
                    status="In Research"
                    statusColor="text-amber-500"
                    title="Website Design for E-commerce Platform"
                    description="Design the layout for an e-commerce platform, ensuring a user-friendly interface"
                    assignees={["U1", "U2"]}
                    date="28 Mar 2023"
                    priority="Medium"
                    priorityColor="bg-amber-100 text-amber-800"
                    comments={12}
                    links={1}
                    completion="2/3"
                  />
                </TaskColumn>*/}

                <TaskColumn title="In Progress" count={4} color="text-blue-500">
                  <TaskCard
                    taskInfo={taskCardInfo}
                  />
                  {/*<TaskCard
                    status="On Track"
                    statusColor="text-purple-500"
                    title="Video Editing for Marketing Promo"
                    description="Edit a 3-minute promotional video for a marketing campaign"
                    assignees={["U2", "U3"]}
                    date="02 Apr 2023"
                    priority="Low"
                    priorityColor="bg-blue-100 text-blue-800"
                    comments={3}
                    links={0}
                    completion="2/3"
                  />*/}
                </TaskColumn>

                <TaskColumn title="Done" count={4} color="text-pink-500">
                  <div></div>
                  {/*<TaskCard
                    status="Complete"
                    statusColor="text-green-500"
                    title="Mobile App Bug Fixing"
                    description="Identify and fix bugs in the mobile app, ensuring a smooth user experience"
                    assignees={["U1", "U4"]}
                    date="07 Apr 2023"
                    priority="High"
                    priorityColor="bg-red-100 text-red-800"
                    comments={6}
                    links={0}
                    completion="1/3"
                  />
                  <TaskCard
                    status="Not Started"
                    statusColor="text-purple-500"
                    title="Content Creation for Blog"
                    description="Write three blog posts (500-600 words each) on the specified topics"
                    assignees={["U1", "U3"]}
                    date="10 Apr 2023"
                    priority="Low"
                    priorityColor="bg-blue-100 text-blue-800"
                    comments={4}
                    links={2}
                    completion="0/3"
                  />*/}
                </TaskColumn>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  )
}
