"use client";

import { useState } from 'react';
import Sidebar from '@/components/Sidebar';
import Dashboard from '@/components/Dashboard';
import Profiles from '@/components/Profiles';
import TaskManager from '@/components/TaskManager';
import NewCase from '@/components/NewCase';
// import Settings from '@/components/Settings';
// import LogOut from '@/components/LogOut';

export default function MainLayout() {
    const [activeLink, setActiveLink] = useState('Dashboard');

    const renderContent = () => {
        switch (activeLink) {
        case 'Dashboard':
            return <Dashboard />;
        case 'Profiles':
            return <Profiles />;
        case 'Task Manager':
            return <TaskManager />;
        case 'New Case':
            return <NewCase />;
        // case 'Settings':
        //     return <Settings />;
        // case 'Log Out':
        //     return <LogOut />;
        default:
            return <Dashboard />;
        }
    };

    return (
        <div className="flex">
        {/* Sidebar */}
        <Sidebar activeLink={activeLink} setActiveLink={setActiveLink} />

        {/* Main Content Area */}
        <div className="flex-1 p-6"
            style={{
                background:
                'linear-gradient(to top, rgba( 233, 135, 236, 0.3), rgba(150, 135, 236, 0.5), rgba(217, 217, 217, 0.2))',
            }}
        >
            {renderContent()}
        </div>
        </div>
    );
}
