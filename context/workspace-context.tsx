"use client"

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { WorkspaceData } from '@/types'
import { useParams } from 'next/navigation';

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
  const [error, setError] = cuseState<string | null>(null)

  const params= useParams();
  const workspaceId = params.workspaceId as string;

  const fetchWorkspaceData = async (workspaceId: string) => {
    try {
      const baseUrl = process.env.NEXT_PUBLIC_BASE_URL
      const response = await fetch(`${baseUrl}/api/workspaces/${workspaceId}`)
      const data = await response.json()
      
      if (response.ok) {
        setWorkspace(data)
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