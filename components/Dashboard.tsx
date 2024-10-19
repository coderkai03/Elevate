import { Search, ChevronDown } from 'lucide-react'
import ProfileCard from './ProfileCard'

const profiles = [
    { name: 'Name', title: 'title', amount: 1000.22, joinDate: 'December 2021', status: 'Completed' as 'Completed', progress: null, avatarUrl: '/placeholder.svg?height=80&width=80' },
    { name: 'Name', title: 'title', amount: 1000.22, joinDate: 'December 2021', status: 'In Progress' as 'In Progress', progress: 78.6, avatarUrl: '/placeholder.svg?height=80&width=80' },
    { name: 'Name', title: 'title', amount: 1000.22, joinDate: 'December 2021', status: 'Completed' as 'Completed', progress: null, avatarUrl: '/placeholder.svg?height=80&width=80' },
    { name: 'Name', title: 'title', amount: 1000.22, joinDate: 'December 2021', status: 'In Progress' as 'In Progress', progress: 78.6, avatarUrl: '/placeholder.svg?height=80&width=80' },
    { name: 'Name', title: 'title', amount: 1000.22, joinDate: 'December 2021', status: 'Completed' as 'Completed', progress: null, avatarUrl: '/placeholder.svg?height=80&width=80' },
    { name: 'Name', title: 'title', amount: 1000.22, joinDate: 'December 2021', status: 'Completed' as 'Completed', progress: null, avatarUrl: '/placeholder.svg?height=80&width=80' },
    { name: 'Name', title: 'title', amount: 1000.22, joinDate: 'December 2021', status: 'Completed' as 'Completed', progress: null, avatarUrl: '/placeholder.svg?height=80&width=80' },
    { name: 'Name', title: 'title', amount: 1000.22, joinDate: 'December 2021', status: 'Completed' as 'Completed', progress: null, avatarUrl: '/placeholder.svg?height=80&width=80' },
    ]

    export default function Dashboard() {
    return (
        <div>
        <h2 className="text-4xl font-bold text-purple-600 mb-6">Profiles</h2>
        <div className="flex justify-between mb-6">
            <div className="relative flex-1 mr-4">
            <input
                type="text"
                placeholder="Search by name, category"
                className="w-full pl-10 pr-4 py-2 rounded-md bg-purple-100 focus:outline-none focus:ring-2 focus:ring-purple-600"
            />
            <Search className="absolute left-3 top-2.5 text-gray-400" size={20} />
            </div>
            <button className="flex items-center space-x-2 bg-gray-800 text-white px-4 py-2 rounded-md">
            <span>Filter by category</span>
            <ChevronDown size={20} />
            </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {profiles.map((profile, index) => (
            <ProfileCard key={index} {...profile} />
            ))}
        </div>
        </div>
    )
}