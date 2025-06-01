export interface TaskProps {
    id?: number
    category: string
    title: string
    description: string
    assignees: number[]
    date: string
    priority: string
  }

export interface WorkspaceData {
  id?: number
  name: string
  description?: string
  icon: string
  members: number[]
  channels: number[]
  owner_id: number
}