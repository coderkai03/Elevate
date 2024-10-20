"use client"
import { useEffect, useState } from 'react'
import { Home, Users, ClipboardList, PlusCircle, Settings, LogOut } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import Sidebar from '@/components/SidebarAlly';
import { fetchUserData } from '@/app/test/page'
import { useParams } from 'next/navigation';
import { profiles } from '@/components/Profiles';


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

interface Profile {
    name: string;
    gender: string;
    age: number;
    about: string;
}

// Main component
export default function ProfileOverview() {
    const { id } = useParams();
    const [profile, setProfile] = useState<Profile | null>(null)
    const [overallProgress, setOverallProgress] = useState(75)
    const [donationProgress, setDonationProgress] = useState(60)
    useEffect(() => {
        console.log(id)
        const selectedProfile = profiles[parseInt(id as string)-1];
        if (selectedProfile) {
            setProfile({
                name: selectedProfile.name,
                gender: selectedProfile.gender || '',
                age: selectedProfile.age,
                about: selectedProfile.about || ''
            });
        }
    }, [id]);

    if (!profile) {
        return <div>Loading...</div>;
    }

    return (
        <div className="flex h-screen bg-purple-50">
            <Sidebar activeLink="overview" setActiveLink={() => {}} />
            <main className="flex-1 p-8 overflow-auto">
                {/* Remove the progress bars from here */}
                <div className="flex justify-between items-start mb-8">
                <h2 className="text-4xl font-bold text-[#9687EC]">Overview</h2>
                </div>
                <div className="bg-white rounded-lg shadow-md overflow-hidden">
                {/* Updated container */}
                <div className="bg-gradient-to-r from-blue-100 to-purple-100 p-6 flex items-center justify-between">
                    {/* Left side: Profile image and info */}
                    <div className="flex items-center space-x-6">
                    <Image
                        src="/placeholder.svg?height=128&width=128"
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
                    {/* Right side: Progress bars */}
                    <div className="w-64">
                    <ProgressBar
                        label="Overall Progress"
                        progress={overallProgress}
                        color="bg-[#9687EC]"
                    />
                    <ProgressBar
                        label="Donation Progress"
                        progress={donationProgress}
                        color="bg-[#9687EC]"
                    />
                    </div>
                </div>
                <div className="p-6">
                    <h4 className="text-xl font-semibold mb-4">About</h4>
                    <p className="text-gray-700 whitespace-pre-line">{profile?.about}</p>
                </div>
                </div>
            </main>
        </div>
    )
}