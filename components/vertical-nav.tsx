"use client"
import { MessageSquare, CheckSquare, Plus } from "lucide-react"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { usePathname } from 'next/navigation'
import { useRouter } from 'next/navigation';
import { useWorkspace } from '@/context/workspace-context'

interface VerticalNavProps {
  workspaceLogo?: string
  workspaceName: string
}

export function VerticalNav() {
  const currentPath = usePathname()
  const router = useRouter()
  const { workspace, loading, error } = useWorkspace()

  

  const navItems = [
    {
      icon: <MessageSquare className="w-5 h-5" />,
      label: "Chat",
      href: `/${workspace?.id}/chat`
    },
    {
      icon: <CheckSquare className="w-5 h-5" />,
      label: "Tasks",
      href: `/${workspace?.id}/tasks`
    }
  ]



  return (
    <div className="fixed left-0 top-0 h-full w-16 bg-white border-r flex flex-col items-center py-4">
      {/* Workspace Logo */}
      <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer mb-8">
        {workspace ? (
          <img src={workspace?.icon} alt={workspace?.name} className="w-full h-full rounded-xl" />
        ) : (
          <span className="text-lg font-semibold">{workspace?.name[0]}</span>
        )}
      </div>

      {/* Navigation Items */}
      <nav className="flex flex-col items-center gap-4">
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "group flex flex-col items-center gap-1.5 px-3 py-2 rounded-lg transition-all duration-200",
              "hover:bg-gray-100",
              currentPath.includes(item.href) ? 
                "text-blue-600 bg-blue-50" : 
                "text-gray-500 hover:text-gray-900"
            )}
          >
            <div className="transition-transform duration-200 group-hover:scale-110">
              {item.icon}
            </div>
            <span className="text-[11px] font-medium">{item.label}</span>
          </Link>
        ))}

        <button
          className={cn(
            "group flex flex-col items-center gap-1.5 px-3 py-2 rounded-lg transition-all duration-200",
            "hover:bg-gray-100 text-gray-500 hover:text-gray-900",
            "mt-4 border-t border-gray-100 pt-6"
          )}
          onClick={() => {router.push('/create-workspace')}}
        >
          <div className="transition-transform duration-200 group-hover:scale-110">
            <Plus className="w-5 h-5" />
          </div>
          <span className="text-[11px] font-medium">New Space</span>
        </button>
      </nav>
    </div>
  )
}