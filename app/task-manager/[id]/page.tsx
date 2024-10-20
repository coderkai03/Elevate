"use client"

import { useState, useEffect } from 'react'
import { Filter, PlusCircle, MoreVertical } from 'lucide-react'
import { useParams } from 'next/navigation'
import Sidebar from '@/components/SidebarAlly'
import { profiles } from '@/components/Profiles'
import Image from 'next/image'

// Task card component
interface TaskCardProps {
    title: string;
    description: string;
}

const TaskCard = ({ title, description }: TaskCardProps) => (
    <div className="bg-purple-200 rounded-md p-4 mb-4">
        <div className="flex items-center mb-2">
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

// Progress bar component
interface ProgressBarProps {
    label: string;
    progress: number;
    color: string;
}

const ProgressBar = ({ label, progress, color }: ProgressBarProps) => (
    <div className="mb-4">
        <div className="flex justify-between mb-1">
            <span className="text-sm font-medium text-gray-700">{label}</span>
            <span className="text-sm font-medium text-gray-700">{progress}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div className={`h-2.5 rounded-full ${color}`} style={{ width: `${progress}%` }}></div>
        </div>
    </div>
)

interface Profile {
    name: string;
    gender: string;
    age: number;
    about: string;
}

// Main component
export default function TaskManager() {
    const { id } = useParams();
    const profile = parseInt(id as string) === 0 ? profiles[0] : profiles[parseInt(id as string) - 1]; // Retrieve the profile based on id
    const [tasks, setTasks] = useState(profile.tasks); // Get tasks from the profile
    const [view, setView] = useState('taskManager'); // State to toggle between views
    const [overallProgress, setOverallProgress] = useState(75); // For Profile Overview
    const [donationProgress, setDonationProgress] = useState(60); // For Profile Overview

    const toggleView = () => {
        setView(view === 'taskManager' ? 'profileOverview' : 'taskManager');
    };

    return (
        <div className="flex h-screen">
            <Sidebar activeLink="overview" setActiveLink={() => {}} />
            <main className="flex-1 overflow-auto p-6">
                <div className="flex justify-between items-center mb-8">
                    <h2 className="text-4xl font-bold text-[#9687EC]">
                        {profile.name}'s {view === 'taskManager' ? 'Task Manager' : 'Profile Overview'}
                    </h2>
                    <button
                        onClick={toggleView}
                        className="px-4 py-2 bg-[#3D364B] text-white rounded-md hover:bg-[#9687EC]"
                    >
                        {view === 'taskManager' ? 'Switch to Profile Overview' : 'Switch to Task Manager'}
                    </button>
                </div>

                {view === 'taskManager' ? (
                    <div className="flex space-x-4">
                        <TaskColumn title="TO DO" tasks={[tasks[0]]} />
                        <TaskColumn title="IN PROGRESS" tasks={[tasks[1], tasks[2]]} />
                        <TaskColumn title="WAITING" tasks={[tasks[3]]} />
                        <TaskColumn title="DONE" tasks={[tasks[4]]} />
                    </div>
                ) : (
                    <div className="bg-white rounded-lg shadow-md overflow-hidden">
                        {/* Profile Overview content */}
                        <div className="bg-gradient-to-r from-blue-100 to-purple-100 p-6 flex items-center justify-between">
                            <div className="flex items-center space-x-6">
                                <Image
                                    src={profile.avatarUrl}
                                    width={128}
                                    height={128}
                                    alt={profile?.name || 'Profile Picture'}
                                    className="rounded-full"
                                />
                                <div>
                                    <h3 className="text-2xl font-bold mb-2">{profile?.name}</h3>
                                    <div className="flex space-x-4 mb-2">
                                        <span className="bg-purple-200 text-[#9687EC] px-3 py-1 rounded-full text-sm">
                                            Gender: {profile?.gender}
                                        </span>
                                        <span className="bg-purple-200 text-[#9687EC] px-3 py-1 rounded-full text-sm">
                                            Age: {profile?.age}
                                        </span>
                                    </div>
                                    <div className="space-x-4">
                                        <button className="bg-[#9687EC] text-white text-sm px-4 py-2 rounded-md hover:bg-purple-700 transition duration-300">
                                            Edit Profile
                                        </button>
                                        <button className="border border-gray-300 text-sm px-4 py-2 rounded-md hover:bg-gray-100 transition duration-300">
                                            Settings
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <div className="w-64">
                                <ProgressBar label="Overall Progress" progress={overallProgress} color="bg-[#9687EC]" />
                                <ProgressBar label="Donation Progress" progress={donationProgress} color="bg-[#9687EC]" />
                            </div>
                        </div>
                        <div className="p-6">
                            <h4 className="text-xl font-semibold mb-4">About</h4>
                            <p className="text-gray-700 whitespace-pre-line">{profile?.about}</p>
                        </div>
                    </div>
                )}
            </main>
        </div>
    );
}
