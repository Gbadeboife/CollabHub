"use client"

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { WorkspaceData } from '@/app/types'

interface WorkspaceContextType {
  workspace: WorkspaceData | null
  loading: boolean
  error: string | null
  setWorkspace: (workspace: WorkspaceData) => void
}

export const WorkspaceContext = createContext<WorkspaceContextType | undefined>(undefined)

export function WorkspaceProvider({ children }: { children: ReactNode }) {
  const [workspace, setWorkspace] = useState<WorkspaceData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchWorkspaceData = async (workspaceId: number) => {
    try {
      const baseUrl = process.env.NEXT_PUBLIC_BASE_URL
      const response = await fetch(`${baseUrl}/api/workspaces/${workspaceId}`)
      const data = await response.json()
      
      if (response.ok) {
        setWorkspace(data.workspace)
      } else {
        setError(data.error)
      }
    } catch (error) {
      setError('Failed to fetch workspace data')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    const workspaceId = 1 
    fetchWorkspaceData(workspaceId)
  }, [])

  return (
    <WorkspaceContext.Provider value={{ workspace, loading, error, setWorkspace }}>
      {children}
    </WorkspaceContext.Provider>
  )
}

export function useWorkspace() {
  const context = useContext(WorkspaceContext)
  if (context === undefined) {
    throw new Error('useWorkspace must be used within a WorkspaceProvider')
  }
  return context
}