

export const suggestedMembers = [
  {
    id: 1,
    name: "Alex Johnson",
    email: "alex.johnson@example.com",
    avatar: "/placeholder.svg",
    initials: "AJ",
  },
  {
    id: 2,
    name: "Sarah Williams",
    email: "sarah.w@example.com",
    avatar: "/placeholder.svg",
    initials: "SW",
  },
  {
    id: 3,
    name: "Michael Chen",
    email: "michael.c@example.com",
    avatar: "/placeholder.svg",
    initials: "MC",
  },
  {
    id: 4,
    name: "Emma Davis",
    email: "emma.d@example.com",
    avatar: "/placeholder.svg",
    initials: "ED",
  },
]

const defaultChannels = [
  {
    id: 1,
    name: "General",
    description: "Team-wide announcements and discussions",
    icon: Users,
  },
  {
    id: 2,
    name: "Tasks",
    description: "Track and manage team tasks",
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
        <rect width="8" height="8" x="3" y="3" rx="1" />
        <rect width="8" height="8" x="13" y="3" rx="1" />
        <rect width="8" height="8" x="3" y="13" rx="1" />
        <rect width="8" height="8" x="13" y="13" rx="1" />
      </svg>
    ),
  },
]

export const customChannels =[
  {
    id: 3,
    name: "Marketing",
    description: "Marketing team discussions and campaigns",
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
        <path d="M2 3h20" />
        <path d="M21 3v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V3" />
        <path d="m7 21 5-5 5 5" />
      </svg>
    ),
  },
  {
    id: 4,
    name: "Development",
    description: "Technical discussions and updates",
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
