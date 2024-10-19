import { Home, Settings, PlusCircle, LogOut } from 'lucide-react'
import Link from 'next/link'

export default function Sidebar() {
    return (
        <aside className="w-64 bg-white p-6 shadow-lg">
        <div className="flex items-center mb-8">
            <div className="w-8 h-8 bg-purple-600 rounded-md mr-2"></div>
            <h1 className="text-2xl font-bold">Elevate</h1>
        </div>
        <nav className="space-y-4">
            <Link href="#" className="flex items-center space-x-2 text-purple-600 bg-purple-100 p-2 rounded-md">
            <Home size={20} />
            <span>Dashboard</span>
            </Link>
            <Link href="#" className="flex items-center space-x-2 text-gray-600 hover:bg-purple-100 p-2 rounded-md">
            <Settings size={20} />
            <span>Settings</span>
            </Link>
            <Link href="#" className="flex items-center space-x-2 text-gray-600 hover:bg-purple-100 p-2 rounded-md">
            <PlusCircle size={20} />
            <span>New Case</span>
            </Link>
        </nav>
        <div className="absolute bottom-6">
            <button className="flex items-center space-x-2 text-gray-600 hover:text-gray-900">
            <LogOut size={20} />
            <span>Log out</span>
            </button>
        </div>
        </aside>
    )
}