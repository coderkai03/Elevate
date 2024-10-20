"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Sidebar from '@/components/SidebarDemo';
import Dashboard from '@/components/Dashboard';

export default function MainLayout() {
    const [activeLink, setActiveLink] = useState('Dashboard');
    const router = useRouter(); 

    const handleLogOut = () => {
        setActiveLink('LogOut');
        router.push('/'); 
    };

    const renderContent = () => {
        switch (activeLink) {
            case 'Dashboard':
                return <Dashboard />;
            case 'LogOut':
                return null;
            default:
                return <Dashboard />;
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
