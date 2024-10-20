"use client"
import { useState } from 'react'
import { Home, Users, ClipboardList, PlusCircle, Settings, LogOut } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'

interface ProfileOverviewProps {
    id: string;
}

const Sidebar = () => (
    <aside className="w-64 bg-purple-100 h-screen p-6">
        <div className="flex items-center mb-8">
        <div className="w-8 h-8 bg-purple-600 rounded-md mr-2"></div>
        <h1 className="text-2xl font-bold">Elevate</h1>
        </div>
        <nav className="space-y-4">
        <Link href="#" className="flex items-center space-x-2 text-gray-700 hover:text-purple-600">
            <Home size={20} />
            <span>Dashboard</span>
        </Link>
        <Link href="#" className="flex items-center space-x-2 text-gray-700 hover:text-purple-600">
            <Users size={20} />
            <span>Profiles</span>
        </Link>
        <Link href="#" className="flex items-center space-x-2 text-gray-700 hover:text-purple-600">
            <ClipboardList size={20} />
            <span>Task Manager</span>
        </Link>
        <Link href="#" className="flex items-center space-x-2 text-purple-600 bg-white rounded-md p-2">
            <PlusCircle size={20} />
            <span>New Case</span>
        </Link>
        <Link href="#" className="flex items-center space-x-2 text-purple-600 ml-4">
            <span>Overview</span>
        </Link>
        </nav>
        <div className="absolute bottom-6 space-y-4">
        <Link href="#" className="flex items-center space-x-2 text-gray-700 hover:text-purple-600">
            <Settings size={20} />
            <span>Settings</span>
        </Link>
        <button className="flex items-center space-x-2 text-gray-700 hover:text-purple-600">
            <LogOut size={20} />
            <span>Log out</span>
        </button>
        </div>
    </aside>
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
        <div
            className={`h-2.5 rounded-full ${color}`}
            style={{ width: `${progress}%` }}
        ></div>
        </div>
    </div>
)

// Main component
export default function ProfileOverview({ id }: ProfileOverviewProps): JSX.Element {
    const [profile, setProfile] = useState({
        name: 'Name',
        gender: 'Male',
        age: 32,
        about: `Lorem ipsum odor amet, consectetuer adipiscing elit. Morbi pellentesque cubilia integer est tortor metus sociosqu nam. Donec enim in tellus; dictum nibh nisi. Tristique ad sociosqu massa pharetra ultricies felis curae dignissim accumsan. Sollicitudin aenean rhoncus platea ante imperdiet cubilia primis rutrum iaculis. Nunc curae suspendisse in potenti metus praesent.

    Facilisis maecenas dis efficitur gravida taciti aliquam sapien. Blandit aliquam finibus aliquet fermentum bibendum. Etiam tellus quisque ultrices id sollicitudin amet ultrices eros nibh. Massa sem ipsum condimentum faucibus magna faucibus tellus; id neque. Duis mauris ligula et ridiculus tempor fringilla. Gravida facilisi turpis dui dignissim posuere posuere.

    Nisi blandit odio donec mollis tortor nostra fames parturient vestibulum. Efficitur euismod nisi vivamus tempor pellentesque semper sagittis curae. Sagittis ultricies himenaeos convallis litora fringilla; at maecenas. Sagittis purus sollicitudin fermentum euismod malesuada maximus. Facilisi vehicula urna eget sociosqu, curae auctor nisi. Himenaeos dolor conubia commodo ullamcorper et quam. Nostra nostra habitant adipiscing justo nulla mauris cras phasellus. Ridiculus hac eros purus elementum volutpat convallis netus. Vehicula sociosqu dis natoque vestibulum lacinia et. Nunc adipiscing etiam morbi nullam tellus suscipit varius egestas fames.`,
    })

    const [overallProgress, setOverallProgress] = useState(75)
    const [donationProgress, setDonationProgress] = useState(60)

    return (
        <div className="flex h-screen bg-purple-50">
        <Sidebar />
        <main className="flex-1 p-8 overflow-auto">
            <div className="flex justify-between items-start mb-8">
            <h2 className="text-4xl font-bold text-purple-600">Overview</h2>
            <div className="w-64">
                <ProgressBar label="Overall Progress" progress={overallProgress} color="bg-purple-600" />
                <ProgressBar label="Donation Progress" progress={donationProgress} color="bg-green-500" />
            </div>
            </div>
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="bg-gradient-to-r from-blue-100 to-purple-100 p-6 flex items-center space-x-6">
                <Image src="/placeholder.svg?height=128&width=128" width={128} height={128} alt={profile.name} className="rounded-full" />
                <div>
                <h3 className="text-2xl font-bold mb-2">{profile.name}</h3>
                <div className="flex space-x-4 mb-2">
                    <span className="bg-purple-200 text-purple-800 px-3 py-1 rounded-full text-sm">
                    Gender: {profile.gender}
                    </span>
                    <span className="bg-purple-200 text-purple-800 px-3 py-1 rounded-full text-sm">
                    Age: {profile.age}
                    </span>
                </div>
                <div className="space-x-4">
                    <button className="bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700 transition duration-300">
                    Edit Profile
                    </button>
                    <button className="border border-gray-300 px-4 py-2 rounded-md hover:bg-gray-100 transition duration-300">
                    Settings
                    </button>
                </div>
                </div>
            </div>
            <div className="p-6">
                <h4 className="text-xl font-semibold mb-4">About</h4>
                <p className="text-gray-700 whitespace-pre-line">{profile.about}</p>
            </div>
            </div>
        </main>
        </div>
    )
}