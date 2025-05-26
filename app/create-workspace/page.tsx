"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Checkbox } from "@/components/ui/checkbox"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ChevronLeft, Plus, Users } from "lucide-react"
import WorkspacePreview from "@/components/workspace-preview"
import WorkspaceIconPicker from "@/components/workspace-icon-picker"
import { redirect } from "next/navigation";
import { custom, set } from "zod"
import { suggestedMembers, defaultChannels, custChannels } from "@/lib/defaultStates"


export default function CreateWorkspacePage() {

  const [customChannels, setCustomChannels] = useState(custChannels)
  
  
  interface WorkspaceData {
    name: string;
    description: string;
    iconSrc: string;
    members: number[];
    channels: number[]; // Add this line
  }
  
  const [workspaceData, setWorkspaceData] = useState <WorkspaceData> ({
    name: "Marketing Team",
    description: "Collaborate on marketing campaigns and strategies",
    iconSrc: "/icons/workspace-icon-1.png",
    members: [1],
    channels: [1,2],
  })

  
  const [activeTab, setActiveTab] = useState <string>("details")

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setWorkspaceData({ ...workspaceData, name: e.target.value })
  }

  const handleDescriptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setWorkspaceData({ ...workspaceData, description: e.target.value })
  }

  const handleIconSelect = (iconSrc: string) => {
    setWorkspaceData({ ...workspaceData, iconSrc })
  }

  const handleMemberSelect = (memberId: number) => {
    setWorkspaceData({...workspaceData, members: [...workspaceData.members, memberId]})
  }

  const [newChannel, setNewChannel]= useState<string>("")

  const createWorkspace= async()=>{
    try{
      const data= fetch('api/workspaces/create', {
          method: "POST",
          headers: {
              "Content-Type": "application/json",
          },
          body: JSON.stringify({ workspaceData }),
      });

      return redirect(`/workspace/${workspaceId}`)
    } catch (error){
      console.log(error)
    }
  }

  const addCustomChannel = () => {
    setCustomChannels([
      ...customChannels,
      {                                  
        id: customChannels.length + 3,
        name: newChannel,
        description: "New channel",
        icon: () => (
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
            className="h-5 w-5"
          >
            <polyline points="16 18 22 12 16 6" />
            <polyline points="8 6 2 12 8 18" />
          </svg>
        ),
      },
    ])

    setNewChannel("");
    console.log(newChannel)
    
  }


  return (
    <div className="min-h-screen bg-white">
      <header className="border-b">
        <div className="container flex h-14 items-center px-4 md:px-6">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <span className="font-medium text-foreground">Create Workspace</span>
          </div>
        </div>
      </header>
      <main className="container px-4 py-6 md:px-6">
        <div className="flex flex-col gap-6">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Create a New Workspace</h1>
            <p className="text-muted-foreground">Set up a collaborative space for your team to work together.</p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            <div className="md:col-span-2">
              <Tabs value={activeTab} onValueChange={setActiveTab} defaultValue="details" className="w-full">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="details">Details</TabsTrigger>
                  <TabsTrigger value="members">Members</TabsTrigger>
                  <TabsTrigger value="channels">Channels</TabsTrigger>
                </TabsList>

                <TabsContent value="details" className="mt-4 space-y-4">
                  <Card>
                    <CardHeader>
                      <CardTitle>Workspace Details</CardTitle>
                      <CardDescription>Enter the basic information about your workspace.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">Workspace Name</Label>
                        <Input
                          id="name"
                          placeholder="Enter workspace name"
                          value={workspaceData.name}
                          onChange={handleNameChange}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="description">Description (Optional)</Label>
                        <Input
                          id="description"
                          placeholder="Describe what this workspace is for"
                          value={workspaceData.description}
                          onChange={handleDescriptionChange}
                        />
                      </div>
                      <WorkspaceIconPicker
                        onSelectIcon={handleIconSelect}
                        defaultIcon={workspaceData.iconSrc}
                        workspaceName={workspaceData.name}
                      />
                    </CardContent>
                    <CardFooter className="flex justify-between">
                      <Button variant="outline">Cancel</Button>
                      <Button  onClick={() => setActiveTab("members")}>Continue to Members</Button>
                    </CardFooter>
                  </Card>
                </TabsContent>

                <TabsContent value="members" className="mt-4 space-y-4">
                  <Card>
                    <CardHeader>
                      <CardTitle>Add Team Members</CardTitle>
                      <CardDescription>Invite people to collaborate in your workspace.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      
                      {/*<div className="space-y-2">
                        <Label htmlFor="email">Invite by Email</Label>
                        <div className="flex gap-2">
                          <Input id="email" placeholder="Enter email address" className="flex-1" />
                          <Button>
                            <Plus className="mr-2 h-4 w-4" />
                            Add
                          </Button>
                        </div>
                      </div>*/}


                      <div className="space-y-3">
                        <Label>Suggested People</Label>
                        {suggestedMembers.map((member) => (
                          <div key={member.id} className="flex items-center justify-between rounded-lg border p-3">
                            <div className="flex items-center gap-3">
                              <Avatar>
                                <AvatarImage src={member.avatar} />
                                <AvatarFallback>{member.initials}</AvatarFallback>
                              </Avatar>
                              <div>
                                <p className="font-medium">{member.name}</p>
                                <p className="text-sm text-muted-foreground">{member.email}</p>
                              </div>
                            </div>
                            <Checkbox
                              id={`member-${member.id}`}
                              checked={workspaceData.members.includes(member.id)}
                              onCheckedChange={(checked) => {
                                const isChecked = checked === true;
                                setWorkspaceData((prev) => ({
                                  ...prev,
                                  members: isChecked
                                    ? [...prev.members, member.id]
                                    : prev.members.filter((id) => id !== member.id),
                                }));
                              }}
                            />
                                
                          </div>
                        ))}
                      </div>
                    </CardContent>
                    <CardFooter className="flex justify-between">
                      <Button variant="outline" onClick={() => setActiveTab("details")}>Back</Button>
                      <Button onClick={() => setActiveTab("channels")}>Continue to Channels</Button>
                    </CardFooter>
                  </Card>
                </TabsContent>

                <TabsContent value="channels" className="mt-4 space-y-4">
                  <Card>
                    <CardHeader>
                      <CardTitle>Create Channels</CardTitle>
                      <CardDescription>Set up communication channels for different topics or teams.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="channel-name">Channel Name</Label>
                        <div className="flex gap-2">
                          <Input value={newChannel} id="channel-name" placeholder="Enter channel name" className="flex-1" onChange={(e)=> setNewChannel(e.target.value)}/>
                          <Button
                            onClick={addCustomChannel}
                            disabled={!newChannel.trim()}>
                            
                            <Plus className="mr-2 h-4 w-4" />
                            Add
                          </Button>

                        </div>
                      </div>


                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <Label>Default Channels</Label>
                          <Button variant="ghost" size="sm" className="h-8 gap-1">
                            Select All
                          </Button>
                        </div>

                        {defaultChannels.map((channel) => (
                          <div key={channel.id} className="flex items-center justify-between rounded-lg border p-3">
                            <div className="flex items-center gap-3">
                              <div className="flex h-9 w-9 items-center justify-center rounded-md bg-muted">
                                <channel.icon className="h-5 w-5" />
                              </div>
                              <div>
                                <p className="font-medium">{channel.name}</p>
                                <p className="text-sm text-muted-foreground">{channel.description}</p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>


                      <div className="space-y-3">
                        <Label>Custom Channels</Label>
                        {customChannels.map((channel) => (
                          <div key={channel.id} className="flex items-center justify-between rounded-lg border p-3">
                            <div className="flex items-center gap-3">
                              <div className="flex h-9 w-9 items-center justify-center rounded-md bg-muted">
                                <channel.icon className="h-5 w-5" />
                              </div>
                              <div>
                                <p className="font-medium">{channel.name}</p>
                                <p className="text-sm text-muted-foreground">{channel.description}</p>
                              </div>
                            </div>
                            <Checkbox 
                              id={`channel-${channel.id}`}
                              checked={workspaceData.channels.includes(channel.id)}
                              onCheckedChange={(checked) => {
                                setWorkspaceData(prev => ({
                                  ...prev,
                                  channels: checked 
                                    ? [...prev.channels, channel.id]
                                    : prev.channels.filter(id => id !== channel.id)
                                }));
                              }}
                            />
                          </div>
                        ))}
                      </div>
                    </CardContent>
                    <CardFooter className="flex justify-between">
                      <Button variant="outline" onClick={() => setActiveTab("members")}>Back</Button>
                      <Button>Create Workspace</Button>
                    </CardFooter>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>

            <div className="hidden md:block">
              <div className="sticky top-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Workspace Preview</CardTitle>
                    <CardDescription>See how your workspace will look.</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <WorkspacePreview
                      iconSrc={workspaceData.iconSrc}
                      name={workspaceData.name}
                      description={workspaceData.description}
                      members={suggestedMembers.filter(member => workspaceData.members.includes(member.id)).map(member => member.initials)}
                      channels={[...defaultChannels, ...customChannels].filter(channel => workspaceData.channels.includes(channel.id)).map(channel => channel.name)}
                    />
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
