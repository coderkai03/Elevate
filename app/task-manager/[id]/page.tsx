"use client"

import { useState } from 'react'
import { Home, Users, ClipboardList, PlusCircle, Settings, LogOut, Filter, MoreVertical } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import Sidebar from '@/components/SidebarAlly'
import { useParams } from 'next/navigation'
import { profiles } from '@/components/Profiles'

// Task card component
interface TaskCardProps {
    title: string;
    description: string;
}

const TaskCard = ({ title, description }: TaskCardProps) => (
    <div className="bg-purple-200 rounded-md p-4 mb-4">
        <div className="flex items-center mb-2">
        <Image src="/placeholder.svg?height=32&width=32" width={32} height={32} alt={title} className="rounded-full mr-2" />
        <span className="font-semibold">{title}</span>
        </div>
        <p className="text-sm text-gray-600">{description}</p>
    </div>
)

// Task column component
interface Task {
    title: string;
    description: string;
}

interface TaskColumnProps {
    title: string;
    tasks: Task[];
}

const TaskColumn = ({ title, tasks }: TaskColumnProps) => (
    <div className="bg-gray-100 rounded-md p-4 w-1/4">
        <div className="flex justify-between items-center mb-4">
        <h3 className="font-bold">{title}</h3>
        <div className="flex space-x-2">
            <button className="text-gray-600 hover:text-purple-600">
            <PlusCircle size={20} />
            </button>
            <button className="text-gray-600 hover:text-purple-600">
            <MoreVertical size={20} />
            </button>
        </div>
        </div>
        {tasks.map((task, index) => (
        <TaskCard key={index} {...task} />
        ))}
    </div>
)

// Main component
export default function TaskManager() {
    const { id } = useParams();
    const [tasks, setTasks] = useState(profiles[parseInt(id as string)-1].tasks)

    return (
        <div className="flex h-screen">
        <Sidebar activeLink="overview" setActiveLink={() => {}} />
        <main className="flex-1 overflow-auto">
            <div className="flex justify-between items-center mb-8">
            <h2 className="text-4xl font-bold text-[#9687EC]">Task Manager</h2>
            <div className="flex items-center space-x-4">
                <button className="px-4 py-2 border border-[#3D364B] rounded-md flex items-center space-x-2 hover:bg-gray-100">
                <Filter size={20} />
                <span>Filters</span>
                </button>
                <button className="px-4 py-2 bg-[#3D364B] text-white rounded-md hover:bg-[#9687EC]">
                + Create Task
                </button>
            </div>
            </div>
            <div className="flex space-x-4">
            <TaskColumn title="TO DO" tasks={[tasks[0]]} />
            <TaskColumn title="IN PROGRESS" tasks={[tasks[1], tasks[2]]} />
            <TaskColumn title="WAITING" tasks={[tasks[3]]} />
            <TaskColumn title="DONE" tasks={[tasks[4]]} />
            </div>
        </main>
        </div>
    )
}