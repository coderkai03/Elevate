"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation'; // Correct import for Next.js navigation
import Sidebar from '@/components/SidebarAlly';
import Profiles from '@/components/Profiles';
import TaskManager from '@/components/TaskManager';
import dynamic from 'next/dynamic';
import Chat from '@/components/Chat';

export default function MainLayout() {
    const [activeLink, setActiveLink] = useState('Dashboard');
    const [accessToken, setAccessToken] = useState<string>("");
    const router = useRouter(); 

    useEffect(() => {
        const fetchAccessToken = async () => {
            try {
                const response = await fetch('/api/hume-token');
                const data = await response.json();
                if (response.ok) {
                    setAccessToken(data.accessToken);
                } else {
                    console.error('Failed to fetch Hume access token:', data.error);
                }
            } catch (error) {
                console.error('Error fetching Hume access token:', error);
            }
        };

        fetchAccessToken();
    }, []);

    const handleLogOut = () => {
        setActiveLink('LogOut');
        router.push('/'); 
    };

    const renderContent = () => {
        switch (activeLink) {
            case 'Profiles':
                return <Profiles />;
            case 'Task Manager':
                return <TaskManager />;
            case 'New Case':
                return accessToken ? <Chat accessToken={accessToken} /> : null;
            case 'LogOut':
                return null;
            default:
                return <Profiles />;
        }
    };

    return (
        <div className="flex h-screen overflow-hidden">
            {activeLink !== 'LogOut' && (
                <Sidebar activeLink={activeLink} setActiveLink={setActiveLink} />
            )}

            <div
                className="flex-1 p-6 overflow-y-auto"
                style={{
                    background:
                        'linear-gradient(to top, rgba(233, 135, 236, 0.3), rgba(150, 135, 236, 0.5), rgba(217, 217, 217, 0.2))',
                }}
            >
                {renderContent()}
            </div>
        </div>
    );
}
