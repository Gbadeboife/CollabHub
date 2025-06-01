export interface TaskProps {
    id?: number
    category: string
    title: string
    description: string
    assignees: number[]
    date: string
    priority: string
  }